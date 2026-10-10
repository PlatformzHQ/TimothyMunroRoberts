// Local HTTP simulation of the edge function and S3 error mapping.
// This does not replace testing the deployed AWS preview.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { runInNewContext } from 'node:vm';
import { routes } from './site-routes.mjs';

const root = resolve('out');
assert.ok(existsSync(resolve(root, '404.html')), 'A complete out/ build is required.');
const handle = runInNewContext(readFileSync('infra/aws/viewer-request.js', 'utf8') + '\nhandler;');
const template = JSON.parse(readFileSync('infra/aws/site.template.json', 'utf8'));
const missing = template.Resources.Distribution.Properties.DistributionConfig.CustomErrorResponses.find(error => error.ErrorCode === 403);
const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const querystring = {};
  for (const key of new Set(url.searchParams.keys())) {
    const values = url.searchParams.getAll(key).map(value => ({ value: encodeURIComponent(value) }));
    querystring[key] = { ...values[0], ...(values.length > 1 ? { multiValue: values } : {}) };
  }
  const routed = handle({ request: { method: req.method, uri: url.pathname, headers: { host: { value: req.headers.host } }, querystring } });
  if (routed.statusCode) {
    res.writeHead(routed.statusCode, Object.fromEntries(Object.entries(routed.headers).map(([key, entry]) => [key, entry.value])));
    res.end();
    return;
  }
  let file = resolve(root, '.' + decodeURIComponent(routed.uri));
  try {
    assert.ok(file.startsWith(root + '/'));
    const data = readFileSync(file);
    res.writeHead(200, { 'content-type': ({ '.html': 'text/html', '.txt': 'text/plain', '.xml': 'application/xml', '.css': 'text/css', '.js': 'text/javascript' })[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    file = resolve(root, '.' + missing.ResponsePagePath);
    res.writeHead(missing.ResponseCode, { 'content-type': 'text/html' });
    res.end(readFileSync(file));
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let checks = 0;
try {
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /text\/html/);
    assert.match(await response.text(), /<title>/);
    checks++;
    if (route !== '/') {
      const redirect = await fetch(base + route.slice(0, -1), { redirect: 'manual' });
      assert.equal(redirect.status, 301);
      assert.equal(redirect.headers.get('location'), route);
      checks++;
    }
  }
  for (const route of ['/does-not-exist/', '/story/does-not-exist/', '/_next/missing.js']) {
    assert.equal((await fetch(base + route)).status, 404, route);
    checks++;
  }
  for (const route of ['/robots.txt', '/sitemap.xml', '/portrait.jpg', '/og.png']) {
    assert.equal((await fetch(base + route)).status, 200, route);
    checks++;
  }
  const www = await fetch(base + '/story/savvis/?source=test', { headers: { host: 'www.timothymunroroberts.com' }, redirect: 'manual' });
  assert.equal(www.status, 301);
  assert.equal(www.headers.get('location'), 'https://timothymunroroberts.com/story/savvis/?source=test');
  checks++;
  console.log(`Passed ${checks} local HTTP checks. AWS preview verification is still required.`);
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
