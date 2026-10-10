import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, storyMissions, storySlugs } from "../../lib/stories";
import { SITE_URL, PERSON_NAME } from "../../lib/seo";
import JsonLd from "../../components/seo/JsonLd";

export const dynamic = "force-static";

// External site for the companies that have one.
const COMPANY_URL: Record<string, string> = {
  platformz: "https://platformz.us",
  fur4: "https://fur4.com",
  phantom: "https://www.phantom.net",
};

export function generateStaticParams() {
  return storySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = getStory(slug);
  if (!m) return {};
  const title = `${m.codename} — ${m.role} | ${PERSON_NAME}`;
  const url = `${SITE_URL}/story/${slug}/`;
  return {
    title,
    description: m.brief,
    alternates: { canonical: `/story/${slug}/` },
    openGraph: {
      type: "article",
      url,
      title,
      description: m.brief,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: PERSON_NAME }],
    },
    twitter: { card: "summary_large_image", title, description: m.brief, images: ["/og.png"] },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getStory(slug);
  if (!m) notFound();

  const url = `${SITE_URL}/story/${slug}/`;
  const companyUrl = COMPANY_URL[slug];
  const others = storyMissions.filter((s) => s.id !== slug).slice(0, 6);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${m.codename} — ${m.role}`,
    description: m.brief,
    image: `${SITE_URL}/portrait.jpg`,
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PERSON_NAME, url: SITE_URL },
    publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: PERSON_NAME },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: url,
    articleSection: m.org,
    keywords: (m.tech ?? []).join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: PERSON_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Story", item: `${SITE_URL}/#missions` },
      { "@type": "ListItem", position: 3, name: m.codename, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[articleLd, breadcrumbLd]} />
      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <nav className="mb-10 flex items-center justify-between text-sm">
          <Link href="/" className="font-display font-bold tracking-tight">
            <span className="text-aurora">TIMOTHY ROBERTS</span>
            <span className="text-muted">.systems</span>
          </Link>
          <Link href="/#missions" className="text-muted transition-colors hover:text-cyan">
            ← All experience
          </Link>
        </nav>

        <article>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">
            {m.status === "ACTIVE" ? "● current role" : "case study"} · {m.period}
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {m.codename}
          </h1>
          <p className="mt-3 text-lg font-medium text-cyan">{m.role}</p>
          <p className="text-sm text-muted">{m.org}</p>

          <p className="mt-8 text-lg leading-relaxed text-text">{m.brief}</p>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-violet">⊕ The mandate</h2>
            <ul className="mt-4 space-y-2.5">
              {m.objectives.map((o) => (
                <li key={o} className="flex gap-2 leading-relaxed text-muted">
                  <span className="text-cyan" aria-hidden>▸</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-magenta">⚔ The hard problem</h2>
            <p className="mt-4 rounded-xl border border-magenta/20 bg-magenta/5 p-5 leading-relaxed text-muted">
              {m.bossFight}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-amber">◆ Outcomes</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {m.loot.map((l) => (
                <li key={l} className="rounded-full border border-amber/30 bg-amber/10 px-4 py-2 text-sm text-amber">
                  {l}
                </li>
              ))}
            </ul>
          </section>

          {m.tech && m.tech.length > 0 && (
            <section className="mt-10">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">⚙ Focus areas</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {m.tech.map((t) => (
                  <li key={t} className="rounded-md border border-cyan/25 bg-cyan/10 px-2.5 py-1 font-mono text-[11px] text-cyan">
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {companyUrl && (
            <p className="mt-10">
              <a
                href={companyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-xl bg-gradient-to-r from-violet via-magenta to-amber bg-[length:200%_auto] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-right"
              >
                Visit {m.short} ↗
              </a>
            </p>
          )}
        </article>

        {/* Interlinking: more case studies */}
        <aside className="mt-16 border-t border-white/10 pt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-muted">More case studies</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {others.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/story/${s.id}/`}
                  className="block rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <span className="font-semibold">{s.codename}</span>
                  <span className="ml-1 text-muted">· {s.period}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/" className="text-sm text-cyan hover:underline">
              ← Back to the full profile
            </Link>
          </p>
        </aside>
      </main>
    </>
  );
}
