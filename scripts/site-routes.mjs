import { missions } from '../app/content.ts';

export const routes = ['/', ...missions.filter(m => !['early', 'jandg'].includes(m.id)).map(m => `/story/${m.id}/`)];
if (process.argv[1]?.endsWith('/site-routes.mjs')) console.log(JSON.stringify(routes));
