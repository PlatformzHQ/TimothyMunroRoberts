# Validation record

Validated October 10, 2026 with Node 24.19.0 and npm 11.9.0. The complete build and local export checks now pass. This branch prepares the migration; it does not deploy the site.

| Check | Result |
| --- | --- |
| Latest source revision | Git remote HEAD/master still resolve to `d97c981c6e504caff7feb2a761c473db088372c9` |
| Latest successful source deployment | GitHub Pages run [30637909329](https://github.com/azaworld/timothy-roberts-portfolio/actions/runs/30637909329), same SHA |
| Source and destination history | Both import parents remain ancestors; all source and destination history is retained |
| Application/assets/package lock | No differences from source SHA in `app/`, `public/`, `package.json`, `package-lock.json` or `next.config.ts` |
| Destination README | Unchanged from destination `main` at `da78ca15267766a4c822b59463624e9597a4a9e8` |
| `npm ci --cache /tmp/tmr-npm-cache` | Passed; 423 packages installed from the lockfile |
| ESLint and TypeScript | Passed, including the build's TypeScript check and a separate `tsc --noEmit` |
| Edge routing and infrastructure assertions | Eight tests passed |
| CloudFormation schema checks | cfn-lint 1.57.2: zero errors, one documented conditional-certificate warning |
| Workflow review | Both workflow files parse as YAML; validation has only `contents: read`; AWS deployment remains outside `.github/workflows` with a false job condition |
| Full `npm run build` | Passed with the original Inter and Space Grotesk setup; 17 generated static entries |
| Export verification | Passed for 12 content routes, 329 local references, 160 files and 4,013,778 bytes |
| Local HTTP simulation | 188 checks passed, including direct stories, redirects, every exported file and missing paths |
| Verification script syntax and whitespace | Passed Python compilation, Node syntax checks and `git diff --check` |
| Live website comparison | Not performed; the site's domains were denied in the previous environment and were not part of this three-host access approval |
| Desktop/mobile rendered checks and screenshots | Not performed; the Browser skill's required execution tool is unavailable; see the capability gap below |
| AWS preview, OAC, TLS and deployed 404/redirect behavior | Not deployed or tested against AWS; reauthentication and separate approval are required |
| Form submission | No real or test lead sent; Formsubmit.co and YouTube privacy-embed source remains unchanged |

The [aggregate validation log](evidence/revalidation.log) records the complete local check sequence. [Export inspection](evidence/export-inspection.json) records route metadata and emitted asset counts. Earlier evidence files retain the preceding task's results, including its blocked build; they do not describe the current build result.

## Approved access and build

The fresh task used the user-approved saved environment version `cecfgver_6aca4f02dafc81a38290411a100103e3`, adding only `fonts.googleapis.com`, `fonts.gstatic.com` and `api.github.com`. A clean dependency installation and normal Next.js build succeeded, including font downloads. The generated export contains ten local WOFF2 files. `gh pr list` succeeded through the GitHub API and returned no duplicate PR for this branch before publication. No credentials, persistent access settings or network policy were changed by this task.

The initial `npm ci` attempt could not write its default cache at `/home/agent/.npm`. Retrying with `--cache /tmp/tmr-npm-cache` succeeded using the same lockfile and registry. Node emits a harmless module-type warning when the check scripts import `app/content.ts`; the application package was left unchanged.

## Export and routing evidence

The build emitted the homepage and these 11 story pages:

```text
/story/platformz/
/story/fur4/
/story/ceosavvy/
/story/hashingspace/
/story/stationdigital/
/story/savtira/
/story/gamestreamer/
/story/phantom/
/story/phoenix/
/story/intira/
/story/savvis/
```

`scripts/verify-export.py` checks the actual HTML for titles, descriptions, apex canonicals, Open Graph/Twitter metadata, JSON-LD, local links and assets. It checks stylesheet font references, all 12 sitemap entries, robots, the preserved CNAME and a noindex 404 page. The first complete export exposed two checker defects: a bare apex URL was not treated as `/`, and an SVG data URI containing its own `url(...)` was treated as a missing CSS asset. Both parsing errors are fixed without changing site content.

`scripts/verify-http.mjs` applies the proposed CloudFront function and S3 error mapping to a loopback server. Each content route must return its exact exported HTML. All 160 emitted files, including Next navigation payloads, fonts, images, CSS and JavaScript, must return their exact bytes. It checks trailing-slash redirects, a www redirect preserving encoded/repeated query values, and missing page/story/asset responses with the 404 document and status 404. The www test now uses Node's HTTP client because Node 24 fetch did not forward the supplied Host header. The previous test accidentally exercised the loopback host instead of www.

These are local HTTP checks. They do not prove real CloudFront execution, OAC access, S3 response headers, HTTPS behavior or browser hydration. Those remain preview acceptance tests.

## Infrastructure review

The private S3/OAC origin, directory rewrites, fixed www-to-apex target, retained bucket, account-scoped certificate parameter, and 403/404-to-404 responses remain as prepared. There is no homepage/SPA 200 fallback, DNS resource or IAM resource in the templates. The inactive uploader retains old assets, uploads HTML last and invalidates CloudFront; it has no object-delete permission. No recoverable template schema error was found.

The remaining W1030 warning concerns `AcmCertificateArn` permitting an empty default for preview mode. The certificate is referenced only when `EnableCustomDomain=true`; a CloudFormation rule rejects that setting with an empty certificate. Nonempty ARNs are restricted to account 764595992126 and `us-east-1`. No broad lint suppression was added. Before custom aliases are enabled, the certificate must be issued and cover both names.

## Rendered QA capability gap

The installed Browser skill at `/opt/codex/cua_node/lib/node_modules/@oai/cua/dist/lib/js/oai_js_browser/dist/skill/SKILL.md` requires browser control through `mcp__node_repl__js` and states: “Only the Node REPL `js` tool (`mcp__node_repl__js`) can be used to control the browser.” The current tool catalog exposes neither that execution tool nor a tool-discovery helper that could load it. Chromium and standalone Playwright are installed, but launching them separately would not follow this browser interface requirement.

Browser setup could not proceed through the supported tool. No browser page was rendered, no screenshot was captured, and no responsive, interaction or visual-equivalence claim is made. A follow-up environment must expose the Browser skill's execution tool. Then inspect desktop/mobile layouts, theme, menus/overlays, keyboard focus, WebGL/fallback, client navigation and YouTube open/close, while intercepting Formsubmit requests so no lead is sent. The live domains need separate approved access if comparison against GitHub Pages is required.

## Delivery and remaining gates

Review this preparation branch through a draft pull request against `main`, using [the PR body](draft-pr.md). The active PR workflow only validates and stores a review artifact. It cannot deploy to AWS or GitHub Pages. Check the PR's run result before merging; local results do not imply a successful hosted run.

Restore the existing AWS connection and verify account 764595992126 before read-only inventory. Review plan eligibility and a concrete way to respect the USD 250 site-only ceiling. Obtain separate approval for preview provisioning/publication, any persistent deployment access, certificate/DNS validation and eventual deployment. Complete rendered QA and AWS preview acceptance. Export the full GoDaddy DNS zone before proposing changes, and obtain explicit confirmation immediately before cutover. Keep GitHub Pages and its current DNS intact for rollback. See [the deployment procedure](deployment.md) and [cost/access scope](costs-and-access.md).
