# Deployment and cutover draft

All AWS commands in this document are for review and later execution after action-time approval. Nothing has been provisioned. Account 764595992126 is the only approved destination; use `us-east-1` for this minimal draft, including the ACM certificate.

## Prepared architecture

The generated CloudFormation template creates one private S3 bucket, a CloudFront origin access control, one distribution, one viewer request function and one cache policy. The bucket blocks public access, uses SSE-S3 encryption and versioning, expires noncurrent versions after 30 days, and is retained if the stack is removed. Its policy grants CloudFront read access only for this distribution and denies non-TLS access. It is an S3 REST origin, not an S3 website endpoint. This follows [AWS's OAC guidance](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).

The default template has no custom aliases and uses the CloudFront certificate. This provides an HTTPS CloudFront preview without changing DNS. Public visitors can reach that preview hostname once provisioned; only the S3 origin is private. Approve preview publication before uploading site files.

The function redirects `www.timothymunroroberts.com` to the HTTPS apex, preserving paths and query values. Directory requests map to their own `index.html`. Extensionless directory paths gain a trailing slash. Files, including Next's navigation payloads, retain their paths. A missing object maps from an S3 403 or 404 to `/404.html` with HTTP **404**. There is no homepage or SPA 200 fallback. Because private S3 often returns 403 for missing objects without ListBucket permission, an OAC configuration error can also appear as 404; test the real homepage and assets after every deployment.

HTML uses revalidation, other mutable files use a five-minute cache, and hashed `/_next/static/` assets use one year with `immutable`. Upload assets first and HTML last, then invalidate `/*`. The draft intentionally retains old assets for browsers that loaded a previous version. Review obsolete routes and current object storage periodically; approved cleanup is separate. Uploads are not atomic, so preview every approved release and retain its artifact.

## Before any AWS write

1. Restore the existing AWS session through the normal account connection. The available audit connector is read-only and cannot execute deployment. Confirm `sts:GetCallerIdentity` returns **764595992126**.
2. Complete the account inventory: existing buckets/distributions/certificates for this domain, available CloudFront plan and free-tier usage, region restrictions, billing access and any current OIDC provider. Reuse suitable approved resources only after comparing their configuration. Do not assume the account is empty or free-plan eligible.
3. Review the exact rendered templates, charges, permissions and resource names. The preview template does not enforce the account ID by itself, so the operator must check identity before creating even a change set. The deployment draft checks identity separately.
4. Obtain approval to create the preview resources and serve the imported public content. A later certificate request, DNS validation record, persistent deployment role or OIDC trust each needs action-time approval. No IAM, OIDC or DNS resource is included in the templates.

## Preview procedure after approval

Render and validate locally:

```bash
node scripts/render-infra.mjs
cfn-lint --non-zero-exit-code error build/site.cloudformation.json infra/aws/certificate.template.json
```

With an approved provisioning session, check identity and prepare a change set. Do not execute it until the resources and estimate have been approved:

```bash
aws sts get-caller-identity
aws cloudformation create-change-set \
  --region us-east-1 --stack-name tmr-site \
  --change-set-name approved-preview --change-set-type CREATE \
  --template-body file://build/site.cloudformation.json
aws cloudformation describe-change-set \
  --region us-east-1 --stack-name tmr-site --change-set-name approved-preview
```

The draft deployment workflow is [infra/aws/deploy.yml.disabled](../../infra/aws/deploy.yml.disabled). It is outside the workflow directory and also has a false job condition. Before separate activation approval, restrict the GitHub environment to the reviewed `main` branch, require a reviewer, pin third-party actions to reviewed commit SHAs, and scope any future OIDC trust to `repo:PlatformzHQ/TimothyMunroRoberts:environment:timothymunroroberts-production` with audience `sts.amazonaws.com`. Do not create that trust or role during preparation. The template and upload role have no need for EC2, ECS, Lambda, a database or broad administrator access.

Build the exact reviewed commit and run both export checks. After approved upload, test the CloudFront hostname for all 12 content routes, deep links without and with trailing slashes, refreshes, local images, JS/CSS/font files, Next client navigation, sitemap, robots, canonical and structured metadata. Test a random missing page, missing story and missing asset; all must remain 404. Inspect desktop and mobile layouts, navigation overlays, keyboard focus, theme, WebGL fallback and video open/close. Intercept Formsubmit requests in any browser test; never submit a real lead.

After the preview passes, request a separate ACM certificate stack in `us-east-1` using [certificate.template.json](../../infra/aws/certificate.template.json). It covers both apex and www. This template does not create validation DNS records; its creation can remain pending until the approved records are added to the current DNS zone. Keep validation records for renewal. CloudFront requires an ACM certificate in [US East (N. Virginia)](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html).

Once the certificate is issued and approved, update the distribution with `EnableCustomDomain=true` and its ARN. Test both domain names against CloudFront before DNS cutover using an approved client that directs the HTTPS connection to the CloudFront hostname while preserving the original hostname for TLS and HTTP. For example, `curl --connect-to timothymunroroberts.com:443:APPROVED.cloudfront.net:443 https://timothymunroroberts.com/`. Repeat with www and a deep link. This redirects only the test client's connection and does not change DNS.

## DNS inventory and cutover gate

The records supplied in the migration brief are a partial baseline, not a complete zone export:

| Name | Type | Current value | TTL |
| --- | --- | --- | --- |
| Apex | NS | ns53.domaincontrol.com, ns54.domaincontrol.com | Not inventoried |
| Apex | A | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 | 600 |
| www | CNAME | azaworld.github.io | 3600 |

Obtain a complete GoDaddy zone export and inventory A, AAAA, CNAME, MX, TXT, SPF, DKIM, DMARC, CAA, SRV, subdomain delegations, verification records, DNSSEC/DS and TTLs before requesting DNS changes. Public DNS queries alone cannot prove that inventory is complete. Check certificate issuance against any CAA restrictions. Preserve mail and unrelated services.

A conventional apex CNAME is invalid. The proposed destination is Route 53 with apex A/AAAA Alias records targeting CloudFront, plus www A/AAAA Aliases to the same distribution so its redirect handles www. CloudFront's hosted zone ID is `Z2FDTNDATAQYW2`. Registration can stay at GoDaddy. No Route 53 zone or records are created by this branch.

After inventory and authorization, create a Route 53 zone with the full copied record set, preserving the existing Pages targets at first. Review the copied records against the export and query the new authoritative servers directly. Follow the [AWS DNS migration procedure](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html), including DNSSEC handling and reduced delegation TTLs where supported. Wait the previous TTLs before relying on the new values.

Only after AWS preview acceptance and explicit user cutover confirmation should the GoDaddy nameservers change to the approved Route 53 delegation. Verify delegation and mail records, then perform the separately confirmed website Alias switch. Keeping the original Pages targets during nameserver migration reduces the number of simultaneous changes. Do not remove or replace old DNSSEC DS records without a reviewed DNSSEC transition plan.

## Rollback

Keep the source repository, GitHub Pages settings, custom domain, CNAME file and deployed Pages version intact. Record the pre-cutover zone export and the tested AWS build artifact. For an AWS content failure, redeploy the last known good artifact and invalidate CloudFront. For a hosting failure after DNS cutover, restore the four GitHub Pages apex A records and `www CNAME azaworld.github.io` in the authoritative zone, removing conflicting website AAAA Alias records. Allow for cached TTLs. If delegation itself is the problem, restore GoDaddy's prior nameservers under the reviewed DNSSEC plan. Never delete the working Pages site as part of this migration. There is no Vercel cancellation step.
