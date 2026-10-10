# Validation record

Validated October 10, 2026 in the scoped repository workspace with Node 24.19.0 and npm 11.9.0. This is a preparation branch, not a production deployment.

| Check | Result |
| --- | --- |
| Latest source revision | Git remote HEAD/master and GitHub branch API both confirmed `d97c981c6e504caff7feb2a761c473db088372c9` |
| Latest successful source deployment | GitHub Actions run `30637909329`, Pages, same SHA |
| Source and destination history | Both parents present in import merge; all 15 source and three destination commits retained |
| Application/assets/package lock | No differences from the source SHA in `app/`, `public/`, `package.json`, `package-lock.json` or `next.config.ts` |
| Destination README | Byte-for-byte unchanged from destination `main` |
| `npm ci` | Passed, 423 packages installed from the lockfile |
| `npm run lint` | Passed |
| TypeScript | Passed after `npx next typegen`, then `npx tsc --noEmit` |
| Edge routing and infrastructure assertions | Eight tests passed; [test output](evidence/routing-tests.log) |
| CloudFormation schema checks | cfn-lint 1.57.2, zero errors, one conditional certificate warning; [output](evidence/cloudformation-lint.log) |
| Verification script syntax | Python compilation and Node syntax checks passed |
| Full `npm run build` | Blocked by network denial fetching Google Fonts; [build output](evidence/local-build.log) |
| Complete `out/` export and local HTTP simulation | Not run successfully; require a complete build |
| Live website HTTP comparison | Blocked by the environment proxy at `timothymunroroberts.com` |
| Desktop/mobile visual checks and screenshots | Not performed; the supported browser skill's required `node_repl js` tool is not exposed in this session |
| AWS preview, OAC, TLS, real 404 and www redirect | Not deployed or tested against AWS; approval and AWS access required |
| Form submission | No test lead sent; source behavior preserved |

The CloudFormation warning is W1030: `AcmCertificateArn` permits an empty default for the preview configuration. The certificate is referenced only when `EnableCustomDomain=true`; a CloudFormation rule rejects that setting with an empty certificate. The parameter pattern restricts nonempty ARNs to account 764595992126 and `us-east-1`. This is documented rather than hidden by a broad lint suppression. A deployed certificate still must be issued and cover both names.

## Network blockers

The build cannot reach these Google Fonts CSS URLs:

```text
https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap
```

A direct HTTPS probe to `fonts.googleapis.com` returned `HTTP/1.1 403 Forbidden`, `server: envoy`, and `CONNECT tunnel failed, response 403`. Re-running the build unchanged requires approved HTTPS egress to `fonts.googleapis.com` and the resulting font asset host `fonts.gstatic.com`, or a build runner already authorized for those hosts. No network expansion has been requested or made. A separately reviewed change to vendor the exact licensed font files would be another option; this branch preserves the original font setup.

The live site probe at `https://timothymunroroberts.com/` returned the same proxy denial. Its www request did not run after that failure. Live route comparison requires approved access to `timothymunroroberts.com` and `www.timothymunroroberts.com`.

The browser skill was inspected, and the available tools were searched for its required browser execution surface. No `node_repl js` tool or tool-discovery helper was exposed. Chromium being installed is not evidence of completed visual QA. No screenshots or responsive-quality claim is included.

## Export checks prepared for the next successful build

The content defines 12 indexable routes:

```text
/
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

`scripts/verify-export.py` reads the actual exported HTML and checks every content route, local links and assets, stylesheet font references, titles, descriptions, apex canonicals, Open Graph/Twitter metadata, JSON-LD, the complete sitemap, robots and a noindex 404. It fails if `out/` is missing. `scripts/verify-http.mjs` runs a loopback simulation using the same edge function and error mapping, then checks direct story loads, slash redirects, www redirect, metadata/assets and missing-path statuses. Neither script substitutes a fixture for the real export. Their successful execution and real AWS preview checks remain required before cutover.

The build-only GitHub Actions workflow runs these checks on a pull request and can preserve the static export for review. Its permissions are read-only for repository content, with no Pages or AWS deployment access. It has not been reported as successful without a completed run.

## GitHub delivery

The branch `migration/aws-static-site` was pushed successfully through the existing Git connection. No force push or main-branch update was used. `gh pr create --draft` was attempted with the prepared title and body, but the environment rejected the request: `Post "https://api.github.com/graphql": Forbidden`. An earlier repository API request was also denied at `api.github.com`. The available GitHub connector exposes read operations only, so no alternate write tool was available. No credential or network-policy change was attempted.

The [prepared PR text](draft-pr.md) is ready to use when an authorized PR creation path is available. [Open the branch comparison](https://github.com/PlatformzHQ/TimothyMunroRoberts/compare/main...migration/aws-static-site) and select a draft pull request. A draft PR has not been created, and the PR-only validation workflow has not run.

## Remaining gates

Restore the existing AWS session and verify account identity and plan eligibility. Obtain action-time approval for provisioning, any persistent access, DNS validation and eventual deployment. Export the full GoDaddy zone and review it before proposing Route 53 changes. Complete full-build, HTTP, responsive visual and AWS preview verification. Obtain explicit user confirmation immediately before DNS cutover. Keep GitHub Pages available for rollback.
