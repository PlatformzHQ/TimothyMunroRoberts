import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const template = JSON.parse(readFileSync(new URL('../infra/aws/site.template.json', import.meta.url)));
template.Resources.ViewerRequest.Properties.FunctionCode = readFileSync(new URL('../infra/aws/viewer-request.js', import.meta.url), 'utf8');
mkdirSync('build', { recursive: true });
writeFileSync('build/site.cloudformation.json', JSON.stringify(template, null, 2) + '\n');
console.log('Rendered build/site.cloudformation.json. No AWS calls were made.');
