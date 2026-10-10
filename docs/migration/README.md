# Migration preparation

This branch imports Timothy Munro Roberts's existing website into `PlatformzHQ/TimothyMunroRoberts` and prepares static AWS hosting for account **764595992126**. It does not provision AWS resources or change the live website, DNS, domain registration, or GitHub Pages deployment.

The monthly ceiling is **USD 250 for this site alone**. Expected costs are substantially lower, subject to traffic and the account's available pricing options. See [costs and access](costs-and-access.md).

## Source and history

The source is [azaworld/timothy-roberts-portfolio](https://github.com/azaworld/timothy-roberts-portfolio), branch `master`. On October 10, 2026, both Git's remote HEAD and the GitHub branch API resolved to `d97c981c6e504caff7feb2a761c473db088372c9`. The latest successful [GitHub Pages deployment](https://github.com/azaworld/timothy-roberts-portfolio/actions/runs/30637909329) used that same commit. No newer source was found at preparation time. Recheck this before cutover.

Import merge `b624eb30e25050ec7775a72c5c9210391bb3103d` has two parents: destination commit `da78ca15267766a4c822b59463624e9597a4a9e8` and source commit `d97c981c6e504caff7feb2a761c473db088372c9`. All 15 source commits, their authors and coauthor attribution, and the three destination commits remain in the history. The root destination README is unchanged. The [source README](archive/source-README.md) is retained separately. Existing site attribution, including Personal Brand Studio, is retained; this import does not grant a new license.

The original Pages workflow is preserved as [github-pages.yml.disabled](archive/github-pages.yml.disabled). It is outside `.github/workflows` in this repository. The live source repository is unchanged and remains the rollback host. The active validation workflow has only `contents: read` and cannot deploy.

## Local work

Use Node 24 and the committed package lock:

```bash
npm ci
npm run lint
node --test infra/aws/viewer-request.test.mjs
npm run build
npx tsc --noEmit
python3 scripts/verify-export.py
node scripts/verify-http.mjs
node scripts/render-infra.mjs
```

The application exports static files to `out/`. `next start` is not the production server for this export. `npm run dev` is available for development. The Next.js version is 16.2.9, with React 19.2.4, TypeScript, Tailwind 4, Three.js and GSAP. The imported configuration retains `output: "export"`, `trailingSlash: true`, and unoptimized images. No application server, database, environment variables or secrets were found in the reviewed source.

The source includes a browser form that sends name, email and message to Formsubmit.co, a mailto fallback, click-open YouTube privacy embeds, and localStorage for theme and game state. These remain unchanged. No test lead was sent, and this work adds no visitor tracking, storage, logging or form proxy.

`next/font/google` fetches Inter and Space Grotesk during the build, then serves the resulting files from the website. It requires HTTPS access to `fonts.googleapis.com` and the font binaries at `fonts.gstatic.com`. The local build encountered a proxy HTTP 403 for `fonts.googleapis.com`; no network policy was changed and no fallback font or mock build was substituted.

See [validation results](validation.md) for what passed and what remains unverified, and [deployment and cutover](deployment.md) for the approval gates.
