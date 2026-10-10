"""Check the real Next export, without contacting any external service."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
APEX = "https://timothymunroroberts.com"
ROUTES = json.loads(subprocess.check_output(["node", "scripts/site-routes.mjs"], cwd=ROOT))


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.tags = []
        self.json_ld = []
        self.in_json = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_json = True

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_json = False

    def handle_data(self, data):
        if self.in_json:
            self.json_ld.append(json.loads(data))

    def meta(self, key):
        return [a.get("content") for t, a in self.tags if t == "meta" and (a.get("name") == key or a.get("property") == key)]


def local_file(url, route):
    parsed = urlsplit(urljoin(APEX + route, url))
    if parsed.scheme not in ("http", "https") or parsed.netloc != urlsplit(APEX).netloc:
        return None
    # A bare origin is the root document, just like an explicit trailing slash.
    url_path = parsed.path or "/"
    path = OUT / unquote(url_path).lstrip("/")
    return path / "index.html" if url_path.endswith("/") else path


assert OUT.is_dir(), "No out/ export exists. Run a successful npm run build first."
for name in ["index.html", "404.html", "robots.txt", "sitemap.xml", "og.png", "portrait.jpg", "llms.txt", "CNAME"]:
    assert (OUT / name).is_file(), f"Missing {name}"

asset_checks = 0
for route in ROUTES:
    path = local_file(route, "/")
    assert path.is_file(), f"Missing exported route {route}"
    html = path.read_text()
    page = Page(html)
    assert re.search(r"<title>[^<]+</title>", html), f"Missing title: {route}"
    assert page.meta("description") and page.meta("description")[0], f"Missing description: {route}"
    canonical = [a.get("href") for t, a in page.tags if t == "link" and a.get("rel") == "canonical"]
    accepted = [[APEX], [APEX + "/"]] if route == "/" else [[APEX + route]]
    assert canonical in accepted, f"Wrong canonical: {route} {canonical}"
    assert page.meta("og:url")[0].rstrip("/") == (APEX + route).rstrip("/"), route
    assert page.meta("og:image") == [APEX + "/og.png"], route
    assert page.meta("twitter:card") == ["summary_large_image"], route
    assert page.json_ld, f"Missing structured data: {route}"
    if route.startswith("/story/"):
        assert any(item.get("@type") == "Article" for group in page.json_ld for item in (group if isinstance(group, list) else [group])), route
    for tag, attrs in page.tags:
        urls = [attrs.get("src")]
        if tag in ("a", "link"):
            urls.append(attrs.get("href"))
        if "srcset" in attrs:
            urls += [item.strip().split()[0] for item in attrs["srcset"].split(",")]
        for url in filter(None, urls):
            target = local_file(url, route)
            if target is not None:
                assert target.is_file(), f"Broken local reference: {route} -> {url}"
                asset_checks += 1

# Verify font and other asset references in every emitted stylesheet.
for css in OUT.rglob("*.css"):
    # Match a whole quoted URL, so url(...) inside an inline SVG data URI
    # is not mistaken for a separate file reference.
    for match in re.finditer(r'''url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)'"]+))\s*\)''', css.read_text()):
        url = next(value for value in match.groups() if value is not None)
        target = local_file(url, "/" + str(css.relative_to(OUT)))
        if target is not None:
            assert target.is_file(), f"Broken CSS asset: {css} -> {url}"
            asset_checks += 1

sitemap = ET.parse(OUT / "sitemap.xml")
locations = {element.text for element in sitemap.findall(".//{*}loc")}
assert locations == {APEX + route for route in ROUTES}, f"Sitemap mismatch: {locations}"
robots = (OUT / "robots.txt").read_text()
assert "Allow: /" in robots and f"Sitemap: {APEX}/sitemap.xml" in robots
assert "Disallow: /\n" not in robots
assert "noindex" in (OUT / "404.html").read_text(), "404 must not be indexed"
assert (OUT / "CNAME").read_text().strip() == "timothymunroroberts.com"
report = {"routes": ROUTES, "route_count": len(ROUTES), "local_references_checked": asset_checks,
          "export_files": sum(1 for path in OUT.rglob("*") if path.is_file()),
          "export_bytes": sum(path.stat().st_size for path in OUT.rglob("*") if path.is_file()),
          "result": "passed"}
print(json.dumps(report, indent=2))
