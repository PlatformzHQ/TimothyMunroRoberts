import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const code = readFileSync(new URL('./viewer-request.js', import.meta.url), 'utf8');
const handle = runInNewContext(code + '\nhandler;');
const request = (uri, host = 'timothymunroroberts.com', querystring = {}) =>
  handle({ request: { uri, method: 'GET', headers: { host: { value: host } }, querystring } });

test('root and deep directory routes use their own index', () => {
  assert.equal(request('/').uri, '/index.html');
  assert.equal(request('/story/savvis/').uri, '/story/savvis/index.html');
});
test('slash redirects preserve encoded and repeated query values', () => {
  const result = request('/story/savvis', undefined, { ref: { value: 'a%20b', multiValue: [{ value: 'a%20b' }, { value: 'c%2Bd' }] } });
  assert.equal(result.statusCode, 301);
  assert.equal(result.headers.location.value, '/story/savvis/?ref=a%20b&ref=c%2Bd');
});
test('www redirects to a fixed HTTPS apex without losing path or query', () => {
  const result = request('/story/intira/', 'WWW.TIMOTHYMUNROROBERTS.COM', { q: { value: '%2Ftest' } });
  assert.equal(result.statusCode, 301);
  assert.equal(result.headers.location.value, 'https://timothymunroroberts.com/story/intira/?q=%2Ftest');
});
test('the preview hostname stays usable', () => {
  assert.equal(request('/story/fur4/', 'example.cloudfront.net').uri, '/story/fur4/index.html');
});
test('assets, metadata and Next navigation payloads are not rewritten', () => {
  for (const uri of ['/robots.txt', '/sitemap.xml', '/og.png', '/CNAME', '/_next/static/chunks/app.js', '/story/fur4/index.txt', '/story/fur4/__next._full.txt']) {
    assert.equal(request(uri).uri, uri);
  }
});
test('missing paths never fall back to the home page', () => {
  assert.equal(request('/story/does-not-exist/').uri, '/story/does-not-exist/index.html');
  assert.equal(request('/missing.js').uri, '/missing.js');
});
test('a double leading slash cannot become an external redirect', () => {
  assert.equal(request('//other.example/path').headers.location.value, '/other.example/path/');
});
test('distribution errors are genuine 404 responses and S3 is private', () => {
  const template = JSON.parse(readFileSync(new URL('./site.template.json', import.meta.url)));
  const resources = template.Resources;
  for (const error of resources.Distribution.Properties.DistributionConfig.CustomErrorResponses) {
    assert.equal(error.ResponseCode, 404);
    assert.equal(error.ResponsePagePath, '/404.html');
  }
  assert.ok(Object.values(resources.SiteBucket.Properties.PublicAccessBlockConfiguration).every(Boolean));
  assert.equal(resources.OriginAccess.Properties.OriginAccessControlConfig.SigningBehavior, 'always');
  assert.equal(resources.BucketPolicy.Properties.PolicyDocument.Statement[0].Action, 's3:GetObject');
  assert.ok(resources.BucketPolicy.Properties.PolicyDocument.Statement[0].Condition.StringEquals['AWS:SourceArn']);
  assert.ok(!Object.values(resources).some(resource => /IAM::|Route53::/.test(resource.Type)));
  assert.equal(template.Parameters.EnableCustomDomain.Default, 'false');
});
