// ============================================================================
// CONTENT — everything editable on the site lives in this file.
// Anything marked {{REPLACE}} is a placeholder: drop in the real value.
// ============================================================================

export const profile = {
  name: "Timothy Munro Roberts",
  shortName: "Timothy Roberts",
  roles: [
    "I build digital infrastructure",
    "I architect enterprise platforms",
    "I design AI operating systems",
    "I scale commerce globally",
    "I automate the entire business",
  ],
  identity:
    "Technology Founder · Enterprise Architect · Digital Commerce Executive · AI Platform Designer",
  pitch:
    "Entrepreneurial CTO/COO and platform architect with 25+ years building and scaling high-availability, multi-tenant commerce and media platforms. Co-founder of SAVVIS (NASDAQ: SVVS, later acquired by CenturyLink for ~$3.4B), and took Phantom Entertainment, StationDigital, and HashingSpace public. Today I'm CEO of Platformz and COO/CTO of FUR4 — inventor and principal designer of a modular, multi-tenant commerce platform.",
  email: "tim@platformz.us",
  emailAlt: "troberts@fur4.com",
  emailAdvisory: "timothy@ceosavvy.com",
  phone: "+1 (636) 735-1657",
  linkedin: "https://www.linkedin.com/in/platformz",
  platformz: "https://platformz.us",
  fur4: "https://fur4.com",
  calendar: "", // optional booking link (e.g. https://cal.com/yourname)
  location: "St. Louis, MO · USA",
};

export const heroStats = [
  { value: 25, suffix: "+", label: "Years building & scaling platforms" },
  { value: 4, suffix: "", label: "Companies taken public" },
  { value: 3, suffix: ".4B", label: "SAVVIS → CenturyLink acquisition (~$)" },
  { value: 99, suffix: ".99%", label: "Uptime targets, active-active failover" },
];

// Full cumulative tally — rendered as the stat grid in Career Analytics.
export const careerTotals = [
  { value: 25, suffix: "+", label: "Years building & scaling platforms" },
  { value: 4, suffix: "", label: "Companies taken public" },
  { value: 6, suffix: "+", label: "Companies founded & led" },
  { value: 3, suffix: "", label: "C-level disciplines — CEO · CTO · COO" },
  { value: 500, suffix: "+", label: "Marketplace/retail connectors (Rithum)" },
  { value: 99, suffix: ".99%", label: "Uptime targets" },
];

// Executive capability stats for the profile card (0–100)
export const characterStats = [
  { name: "Enterprise Architecture", value: 98, color: "var(--cyan)" },
  { name: "Technology Vision", value: 99, color: "var(--amber)" },
  { name: "Digital Commerce", value: 95, color: "var(--violet)" },
  { name: "AI & Automation", value: 96, color: "var(--magenta)" },
];

export const originStory = [
  `In 1984, at age 14, I started out on Commodore, Apple, and DOS machines — drawn to video
   games, telecommunications, programming, and bulletin board systems. While other kids
   played games, I was online over 300bps modems, living through the evolution from BBSs and
   ARPANET into what we now call the Internet.`,
  `That early fascination became a 25+ year run building and scaling platforms: I co-founded
   SAVVIS (the first high-QoS national backbone, later acquired by CenturyLink for ~$3.4B), and
   took Phantom Entertainment, StationDigital, and HashingSpace public. Today I'm CEO of Platformz
   and COO/CTO of FUR4 — inventor and principal designer of a multi-tenant commerce platform.
   Here's the journey:`,
];

// ----------------------------------------------------------------------------
// THE JOURNEY — career told as a sequence of technology eras.
// Click a card to expand its details.
// ----------------------------------------------------------------------------
export type JourneyStep = {
  lv: number;
  year: string;
  icon: string;
  title: string;
  where: string;
  note: string;
  details: string[];
  parallel?: boolean;
};

export const journey: JourneyStep[] = [
  {
    lv: 1,
    year: "1984",
    icon: "🖥️",
    title: "The Early Years",
    where: "Commodore · Apple · DOS · BBS",
    note: "Age 14, online over 300bps modems — from BBSs to ARPANET.",
    details: [
      "Started at 14 on Commodore, Apple, and DOS machines",
      "Drawn to video games, telecom, programming, and bulletin board systems",
      "Lived through the evolution from BBSs and ARPANET into the modern Internet",
    ],
  },
  {
    lv: 2,
    year: "1994",
    icon: "🌐",
    title: "Co-founder & CTO — SAVVIS",
    where: "Diamond.net / SAVVIS",
    note: "The first high-QoS national Internet backbone (NASDAQ: SVVS).",
    details: [
      "Designed the first high-QoS national backbone — OC3 ATM across 22 Tier-1 cities",
      "Originated QoS guarantees, metered billing, and PNAPs; landed Apple as anchor client",
      "Gateway VC funding; NASDAQ IPO; later acquired by CenturyLink for ~$3.4B",
    ],
  },
  {
    lv: 3,
    year: "1997",
    icon: "🏢",
    title: "Founder & CEO — Intira",
    where: "Intira Corporation",
    note: "The first company ever to sell cloud computing as a service.",
    details: [
      "First ever to sell cloud computing as a service ('Netsourcing')",
      "Raised $30M; built 3 data centers (Missouri, New York, California)",
      "Intira → Data Return → Terremark (TMRK) → Verizon for ~$1.6B",
    ],
  },
  {
    lv: 4,
    year: "2002",
    icon: "🎮",
    title: "Founder, CEO & CTO — Phantom",
    where: "Infinium Labs / Phantom",
    note: "PC-based game platform, public via reverse merger (2004).",
    details: [
      "Took the company public via reverse merger",
      "Recruited Kevin Bachus (Xbox founding team) as President/COO",
      "Built on-demand application streaming; the Lapboard is still sold today",
    ],
  },
  {
    lv: 5,
    year: "2007",
    icon: "🕹️",
    title: "CEO & CTO — GameStreamer",
    where: "GameStreamer, Inc.",
    note: "B2B game distribution at 99.999% uptime. Acquired.",
    details: [
      "First automated, real-time game-publishing system with a white-label SDK",
      "2,200+ games from 220 developers; stores localized into 22 languages",
      "Acquired by Media Speed Tech, LLC",
    ],
  },
  {
    lv: 6,
    year: "2010",
    icon: "🛒",
    title: "Founder, Chairman & CEO — Savtira",
    where: "Savtira Corporation",
    note: "Enterprise cloud commerce for physical & digital goods.",
    details: [
      "Pioneered a cloud commerce eco-system on virtualized IBM WebSphere Commerce",
      "5 patents as inventor — application streaming, encoding, digital-goods auto-publishing",
      "6 data centers, 28 wholesale partners, 160 employees & contractors",
    ],
  },
  {
    lv: 7,
    year: "2013",
    icon: "🎬",
    title: "Founder & CEO — StationDigital",
    where: "StationDigital Corporation",
    note: "Ad-supported DMCA radio & video with 22M+ tracks. Public.",
    parallel: true,
    details: [
      "Pioneered an ad-supported, DMCA-compliant digital radio station (22M+ tracks)",
      "Took the company public via reverse merger",
      "Built the content-ingestion and ad-ops stack",
    ],
  },
  {
    lv: 8,
    year: "2013",
    icon: "🪙",
    title: "Founder & CEO — HashingSpace",
    where: "HashingSpace Corporation",
    note: "Bitcoin mining, hosting & pools. Public via reverse merger.",
    parallel: true,
    details: [
      "Built Bitcoin mining, hosting, wallet, exchange, and mining pools",
      "Took the company public via reverse triangular merger",
      "A deep, early bet on Bitcoin & blockchain infrastructure",
    ],
  },
  {
    lv: 9,
    year: "2022",
    icon: "👑",
    title: "Chief Executive Officer — Platformz",
    where: "Platformz.us",
    note: "Multi-tenant commerce platform (100% owned by FUR4).",
    parallel: true,
    details: [
      "Designed the macro topology: React/Next, Magento 2, Strapi, GraphQL, AWS, Cloudflare",
      "Tenantized portals: Customer, Dealer, Referral, Promo, Branding, Owner",
      "Inventor & principal designer; patent filings prepared",
    ],
  },
  {
    lv: 10,
    year: "2024",
    icon: "⚙️",
    title: "COO & CTO — FUR4",
    where: "FUR4.com",
    note: "Premium pet-grooming brand by the original inventor of the Furminator.",
    parallel: true,
    details: [
      "Shipped a decoupled React + Magento + Strapi (GraphQL) commerce stack",
      "Built Referral, Dealer/Wholesale, and Owner portals; Avalara + QuickBooks finance",
      "Led industrial design (CAD→DFM), QA (Intertek/PROQC), and global 3PL (ShipBob)",
    ],
  },
];

// ----------------------------------------------------------------------------
// EXPERTISE — nodes light up & expand on click. Branches: lead / build / found
// ----------------------------------------------------------------------------
export type SkillNode = {
  id: string;
  name: string;
  branch: "Leadership" | "Architecture" | "Innovation";
  level: number; // 1–5 proficiency
  example: string; // real example shown when the node is opened
};

export const skillTree: SkillNode[] = [
  {
    id: "headless-commerce",
    name: "Magento 2 · React/Next · GraphQL",
    branch: "Architecture",
    level: 5,
    example:
      "Decoupled commerce stacks — Magento 2 (headless/GraphQL) with React/Next.js and Strapi CMS — where Magento is the truth for catalog, orders, and inventory.",
  },
  {
    id: "multi-tenant",
    name: "Multi-tenant Platform Architecture",
    branch: "Architecture",
    level: 5,
    example:
      "Tenantized portals (Customer/Dealer/Referral/Promo/Branding/Owner), component isolation, and API micro-gateways — many brands on one paid infrastructure.",
  },
  {
    id: "cloud-devops",
    name: "Cloud, DevOps & SRE",
    branch: "Architecture",
    level: 5,
    example:
      "AWS (S3/CloudFront/MediaConvert/Secrets Manager), Cloudflare, GCP; CI/CD via Bitbucket/Jira; infrastructure-as-code and active-active failover at 99.99% uptime targets.",
  },
  {
    id: "backbone-hosting",
    name: "Internet Backbone & Hosting",
    branch: "Architecture",
    level: 5,
    example:
      "From SAVVIS, Intira, and Terremark: high-QoS national backbones, CDN, and managed hosting with #1 network-performance rankings (Keynote/Boardwatch).",
  },
  {
    id: "security-qa",
    name: "Security, QA & Observability",
    branch: "Architecture",
    level: 4,
    example:
      "Twilio 2FA/OTP, SendGrid/Mandrill, SonarQube, Tenable vulnerability scans, Playwright e2e, New Relic APM, Hotjar & Userbrain UX testing.",
  },
  {
    id: "omnichannel",
    name: "Omni-channel Commerce",
    branch: "Innovation",
    level: 5,
    example:
      "Rithum/ChannelAdvisor (500+ connectors), SPS Commerce EDI (Chewy + major retailers), M2E Pro (Amazon/Walmart/eBay), DSCO order streams, AfterShip.",
  },
  {
    id: "tax-finance",
    name: "Tax & Finance Automation",
    branch: "Innovation",
    level: 5,
    example:
      "Avalara AvaTax SST as the truth for tax (US SST + global), QuickBooks COA & custom mappings, Stripe/PayPal/Plaid payouts, 1099 automation, KYC, W-8/W-9.",
  },
  {
    id: "platform-ip",
    name: "Commerce Platform IP",
    branch: "Innovation",
    level: 5,
    example:
      "Inventor and principal designer of a modular multi-tenant commerce platform — authored patent claims covering tenant isolation, portal orchestration, and micro-gateway API routing.",
  },
  {
    id: "ai-engineering",
    name: "AI-assisted Engineering",
    branch: "Innovation",
    level: 4,
    example:
      "AI-assisted code reviews and automation woven into the SDLC, with weekly code audits and feature-flagged releases.",
  },
  {
    id: "supply-chain-mfg",
    name: "Supply Chain & Manufacturing",
    branch: "Innovation",
    level: 4,
    example:
      "Industrial design (CAD→DFM/DFX), materials (polymer blends, carbon-fiber, silicone), QA (Intertek/PROQC), bonded warehousing, and multi-region 3PL (ShipBob).",
  },
  {
    id: "going-public",
    name: "Taking Companies Public",
    branch: "Leadership",
    level: 5,
    example:
      "Took SAVVIS to a NASDAQ IPO, and Phantom Entertainment, StationDigital, and HashingSpace public via reverse mergers.",
  },
  {
    id: "fundraising-ma",
    name: "Fundraising & M&A",
    branch: "Leadership",
    level: 5,
    example:
      "Raised institutional capital and led roll-ups and acquisitions — SAVVIS was later acquired by CenturyLink for ~$3.4B; Intira's lineage (Terremark) sold to Verizon for ~$1.6B.",
  },
  {
    id: "global-teams",
    name: "Building Global Engineering Teams",
    branch: "Leadership",
    level: 5,
    example:
      "Recruited and lead a ~50-person blended team (~80% engineering) across time zones, with rigorous PR/code-review cadence and weekly QA sprints.",
  },
  {
    id: "b2b-gtm",
    name: "B2B Sales & GTM",
    branch: "Leadership",
    level: 4,
    example:
      "Enterprise B2B sales, distributor onboarding, MAP/brand governance, territory exclusives, referral/agency programs, and international localization.",
  },
  {
    id: "exec-leadership",
    name: "Executive Leadership",
    branch: "Leadership",
    level: 5,
    example:
      "Serving as CEO, COO, CTO, and Chairman across companies — owning architecture, product, operations, finance, and go-to-market.",
  },
];

// ----------------------------------------------------------------------------
// EXPERIENCE — career as chapters. Mandate, the hard problem, outcomes.
// ----------------------------------------------------------------------------
export type Mission = {
  id: string;
  codename: string;
  role: string;
  org: string;
  short: string; // compact label for the career timeline chart
  period: string;
  start: number; // fractional year for the timeline chart
  end: number | null; // null = present
  status: "ACTIVE" | "COMPLETE";
  brief: string;
  objectives: string[];
  bossFight: string; // the hardest problem
  loot: string[]; // outcomes
  tech?: string[]; // stack / tooling
};

export const missions: Mission[] = [
  {
    id: "platformz",
    codename: "Platformz",
    role: "Chief Executive Officer",
    org: "Platformz.us — multi-tenant commerce platform (100% owned by FUR4)",
    short: "Platformz",
    period: "2022 — Present",
    start: 2022.0,
    end: null,
    status: "ACTIVE",
    brief:
      "A multi-tenant, enterprise-class commerce platform and agency powering consumer brands (pet, sports, and more). Inventor and principal designer of the underlying architecture, with patent filings prepared.",
    objectives: [
      "Designed the macro topology: React/Next, Magento 2, Strapi, GraphQL APIs, AWS, CloudFront/MediaConvert, Cloudflare",
      "Built tenantized portals (Customer, Dealer, Referral, Promo, Branding, Owner) with API micro-gateways",
      "Governance via Confluence system maps (Infra & Software Layers 0–7) and HubSpot CRM as the GTM source of truth",
      "Engineering ops: Jira/Bitbucket CI/CD, feature-flagged releases, AI-assisted code reviews, weekly audits",
    ],
    bossFight:
      "Designing one architecture that drops new brands and sites into the same paid multi-tenant infrastructure — component-isolated, secure, and ready for roll-ups and acquisitions.",
    loot: [
      "Modular multi-tenant platform powering FUR4, Rockerz, and other verticals",
      "Patent filings: tenant isolation, portal orchestration, micro-gateway API routing",
      "An agency + platform that compounds equity across brands",
    ],
    tech: ["React/Next", "Magento 2", "Strapi", "GraphQL", "AWS", "Cloudflare", "HubSpot"],
  },
  {
    id: "fur4",
    codename: "FUR4",
    role: "Chief Operating Officer & Chief Technology Officer",
    org: "FUR4.com — premium pet-grooming (Furminator inventor)",
    short: "FUR4",
    period: "2024 — Present",
    start: 2024.0,
    end: null,
    status: "ACTIVE",
    brief:
      "Premium pet-grooming brand led by the original inventor of the Furminator. I own nearly every operational and technical layer — from the decoupled commerce stack to global manufacturing, finance, and channels.",
    objectives: [
      "Shipped a decoupled React + Magento + Strapi (GraphQL) stack with Twilio 2FA, social login, and i18nPro/Crowdin",
      "Built Referral, Dealer/Wholesale, and HubSpot Owner portals; KYC, W-8/W-9, 1099 automation, Plaid/Stripe/PayPal payouts",
      "Established Avalara AvaTax SST as tax truth and a custom QuickBooks COA for finance integrity",
      "Led industrial design (CAD→DFM), QA (Intertek/PROQC), and multi-region 3PL (ShipBob US/EU/UK/CA/AU)",
    ],
    bossFight:
      "Standing up a global, multi-channel commerce-and-manufacturing operation — tax, finance, supply chain, and 500+ retail/marketplace connectors — as one coordinated, automated system.",
    loot: [
      "~5× BOM cost reduction from prototype while hitting material/ergonomic goals",
      "~35k units on hand, +90k ready, scalable to 500k–1M units/month",
      "Chewy onboarding closed; Amazon/Walmart/eBay live via M2E Pro",
    ],
    tech: ["Magento", "React", "Avalara", "QuickBooks", "SPS Commerce", "ShipBob", "M2E Pro"],
  },
  {
    id: "ceosavvy",
    codename: "CEOSavvy, LLC",
    role: "Managing Director",
    org: "CEOSavvy — advisory & consulting · St. Louis",
    short: "CEOSavvy",
    period: "2008 — Present",
    start: 2008.0,
    end: null,
    status: "ACTIVE",
    brief:
      "An advisory and consulting practice for startups and early/growth-stage companies — board roles, strategy, finance, and go-to-market for founders moving from idea to fundable business.",
    objectives: [
      "Board and advisory-board roles",
      "Team building and corporate structuring",
      "Strategic and financial planning",
      "Go-to-market planning and executive guidance",
    ],
    bossFight:
      "Helping founders cross the hardest gap — from the intangible idea stage to a substantial, fundable, operational business.",
    loot: [
      "Trusted advisor to startups and growth-stage companies",
      "Board and advisory engagements across multiple industries",
    ],
    tech: ["Strategy", "Fundraising", "Go-to-Market", "Corporate Structuring"],
  },
  {
    id: "hashingspace",
    codename: "HashingSpace Corporation",
    role: "Founder, Chairman, CEO & CTO",
    org: "HashingSpace — Bitcoin mining & hosting · public",
    short: "HashingSpace",
    period: "2013 — 2015",
    start: 2013.5,
    end: 2015.0,
    status: "COMPLETE",
    brief:
      "A Bitcoin mining, hosting, and data-center company — plus wallet, exchange, cloud-hashing, Stratum/P2P pools, and a pool scanner. An early, deep bet on Bitcoin and blockchain infrastructure.",
    objectives: [
      "Built Bitcoin mining servers, hosting, and data-center capacity",
      "Shipped wallet, exchange, cloud-hashing, Stratum/P2P pools, and a pool scanner",
      "iOS / Android / Web / HTML5 application development",
      "Led offshore/inshore development teams with release & repository control",
    ],
    bossFight:
      "Standing up credible, full-stack Bitcoin infrastructure — mining to wallet to pools — in the earliest, most volatile days of the industry.",
    loot: [
      "Full-stack Bitcoin/blockchain product suite",
      "Mining, hosting, and data-center infrastructure",
    ],
    tech: ["Bitcoin", "Blockchain", "Mining", "Pools", "HTML5", "Data Centers"],
  },
  {
    id: "stationdigital",
    codename: "StationDigital Corporation",
    role: "Founder, Chairman, CEO & CTO",
    org: "StationDigital — digital radio & video · public",
    short: "StationDigital",
    period: "2013 — 2015",
    start: 2013.0,
    end: 2015.0,
    status: "COMPLETE",
    brief:
      "Designed and pioneered an ad-supported, DMCA-compliant digital playlist radio station and video system — with a catalog of 22M+ tracks — taken public via reverse merger.",
    objectives: [
      "Pioneered an ad-supported DMCA digital radio station with 22M+ tracks",
      "iOS / Android / Web / HTML5 application development",
      "User-design architecture, bug testing, release & repository control",
      "Managed offshore/inshore development teams",
    ],
    bossFight:
      "Licensing and streaming a 22-million-track catalog under DMCA — free to the consumer, paid for by ads — at scale.",
    loot: [
      "Public company (reverse merger)",
      "22M+ track ad-supported radio and video platform",
    ],
    tech: ["Digital Radio", "DMCA", "Streaming", "Ad-Supported", "HTML5"],
  },
  {
    id: "savtira",
    codename: "Savtira Corporation",
    role: "Founder, Chairman & CEO",
    org: "Savtira — Tampa, FL · cloud commerce",
    short: "Savtira",
    period: "2010 — 2013",
    start: 2010.0,
    end: 2013.0,
    status: "COMPLETE",
    brief:
      "Designed and pioneered an enterprise-class cloud commerce eco-system for physical and digital goods — a cross-merchandised 'superstore' with a download manager, cloud locker, and application streaming, on a virtualized IBM WebSphere Commerce SaaS.",
    objectives: [
      "Customized IBM WebSphere Commerce + Coremetrics for physical & digital, with download manager, cloud locker, and app streaming",
      "Virtualized WebSphere Commerce as SaaS on blade servers; built HTML5 ubiquitous players/readers and an IPTV system",
      "Integrated RightNow (Oracle) and SAP for global accounting; custom APIs",
      "Deployed 6 load-balanced, multi-homed data centers with failover",
    ],
    bossFight:
      "Building a true end-to-end cloud commerce platform for both physical and digital goods — years before 'cloud commerce' was even a category.",
    loot: [
      "5 patents as inventor — application streaming, encoding, digital-goods auto-publishing",
      "$10M+ capital/credit, plus equity and debt financing",
      "6 data centers, 28 wholesale partners, 160 employees & contractors",
    ],
    tech: ["IBM WebSphere", "Coremetrics", "SAP", "Cloud Commerce", "App Streaming", "HTML5"],
  },
  {
    id: "gamestreamer",
    codename: "GameStreamer, Inc.",
    role: "Chief Executive Officer & CTO",
    org: "GameStreamer — Sarasota, FL · B2B game distribution",
    short: "GameStreamer",
    period: "2007 — 2010",
    start: 2007.0,
    end: 2010.0,
    status: "COMPLETE",
    brief:
      "Took a B2B video-game distribution company from idea to fully operational — building the first automated game-publishing system and a white-label storefront SDK. Sold to Media Speed Tech, LLC.",
    objectives: [
      "Built the first automated, real-time publishing system with protection, distribution, and auditing",
      "Engineered 99.999% uptime with kernel-level multi-data-center replication and GEO-IP DNS",
      "Shipped the first video-game distribution SDK for white-label partner stores",
      "Localized stores into 22 languages; download-manager client with streaming, DRM & auto-patching",
    ],
    bossFight:
      "Automating end-to-end game publishing and white-label distribution at a 99.999%-uptime bar that enterprise partners would trust.",
    loot: [
      "Met 500+ Fortune companies; 2,200+ games from 220 developers",
      "First B2B white-label licensing discounts in the category",
      "Acquired by Media Speed Tech, LLC",
    ],
    tech: ["B2B", "Game Distribution", "SDK", "Streaming", "DRM", "GEO-IP DNS"],
  },
  {
    id: "phantom",
    codename: "Infinum Labs / Phantom Entertainment",
    role: "Founder, CEO & CTO",
    org: "Phantom — game console · public (2004)",
    short: "Phantom",
    period: "2002 — 2006",
    start: 2002.0,
    end: 2006.0,
    status: "COMPLETE",
    brief:
      "A PC-based living-room game platform concept, taken public via reverse merger — pioneering on-demand game delivery a decade before streaming was viable.",
    objectives: [
      "Took the company public via reverse merger",
      "Recruited Kevin Bachus (Xbox founding team) as President/COO for platform & content strategy",
      "Secured publisher and developer ecosystem interest",
      "Shipped the Lapboard gaming peripheral — still sold at phantom.net",
    ],
    bossFight:
      "Selling games on demand over the Internet years before bandwidth and the market were ready.",
    loot: [
      "Public company via reverse merger",
      "Xbox-caliber leadership and a publisher/dev ecosystem",
      "The Lapboard — still sold today at phantom.net",
    ],
    tech: ["Game Platform", "On-demand Delivery", "Consumer Hardware"],
  },
  {
    id: "phoenix",
    codename: "Phoenix Networks",
    role: "Director & Investor",
    org: "Phoenix Networks — DSL",
    short: "Phoenix",
    period: "1999 — 2002",
    start: 1999.0,
    end: 2002.0,
    status: "COMPLETE",
    brief:
      "Invested in and served as a director of Phoenix Networks — a consumer and business DSL provider that grew into one of the top DSL providers in the world.",
    objectives: [
      "Backed and guided a high-growth DSL provider as a director",
      "Helped scale consumer and business high-speed Internet",
    ],
    bossFight:
      "Scaling DSL during the broadband land-grab, competing against far larger national carriers.",
    loot: [
      "Became one of the top DSL providers worldwide",
      "Business lines sold to MegaPath; residential lines to EarthLink (2002)",
    ],
    tech: ["DSL", "Broadband", "ISP"],
  },
  {
    id: "intira",
    codename: "Intira Corporation",
    role: "Founder & Chief Executive Officer",
    org: "Intira — St. Louis · New York · California",
    short: "Intira",
    period: "1997 — 2002",
    start: 1997.0,
    end: 2002.0,
    status: "COMPLETE",
    brief:
      "Founded Intira to add data centers onto the SAVVIS network design — and built the first company ever to sell cloud computing as a service ('Netsourcing'), running customers' infrastructure end to end.",
    objectives: [
      "First ever to sell cloud computing as a service (Netsourcing)",
      "Raised CAPCO seed funding led by Stifel Nicolaus",
      "Closed $30M financing from Ascend and Cascade Communications",
      "Built 3 data centers (Missouri, New York, California); $1.7M/month revenue",
    ],
    bossFight:
      "Funding and building three data centers and an entirely new 'cloud-as-a-service' business model — one of the most capital-intensive bets in early hosting.",
    loot: [
      "The original cloud-computing-as-a-service company",
      "Intira → Data Return → Terremark (NASDAQ: TMRK) → Verizon for ~$1.6B",
      "Design, topology, and GTM strategy stayed intact for 15+ years",
    ],
    tech: ["Data Centers", "Cloud as a Service", "Netsourcing", "Enterprise Infrastructure"],
  },
  {
    id: "savvis",
    codename: "Diamond.net / SAVVIS Communications",
    role: "Co-founder & Chief Technology Officer",
    org: "SAVVIS — St. Louis · NASDAQ: SVVS",
    short: "SAVVIS",
    period: "1994 — 1997",
    start: 1994.0,
    end: 1997.0,
    status: "COMPLETE",
    brief:
      "Co-founded Diamond.net (aka SAVVIS) and, as CTO, designed the first high-quality national Internet backbone — originating the concepts of QoS guarantees, metered billing, and PNAPs with the world's first OC3 ATM Layer-2 backbone linking 22 Tier-1 cities.",
    objectives: [
      "Designed the first high-QoS national backbone — OC3 ATM fiber across 22 Tier-1 cities",
      "Originated QoS guarantees, metered billing, and PNAPs",
      "Closed a 5-year, $10M+ contract with Apple Computer as the anchor client",
      "Attracted Gateway Venture Partners ($2.2M) to fully fund the company",
    ],
    bossFight:
      "Inventing carrier-grade quality-of-service for the public Internet — and proving it well enough to land Apple, before anyone had a metric to measure it.",
    loot: [
      "Apple anchor contract; full funding from Gateway Venture Partners",
      "Sold to Bridge Information Systems, then a traditional NASDAQ IPO (SVVS)",
      "Later acquired by CenturyLink for ~$3.4B; #1 Keynote/Boardwatch rankings",
    ],
    tech: ["OC3 ATM Backbone", "QoS", "PNAPs", "Metered Billing", "Networking"],
  },
  {
    id: "jandg",
    codename: "J&G Computer Solutions",
    role: "Sales Engineer",
    org: "J&G — St. Louis · networking",
    short: "J&G",
    period: "1993",
    start: 1993.0,
    end: 1994.0,
    status: "COMPLETE",
    brief:
      "Sold, installed, and maintained Novell and Windows 95 systems — LANs, routers, and cross-platform Apple/Novell/Windows networking, back when making those talk to each other was genuinely hard.",
    objectives: [
      "Added Windows 95 support, service, and sales to a 100% Novell shop",
      "Installed LANs and configured routers and cross-platform networks",
    ],
    bossFight:
      "Cross-platform Apple/Novell/Windows networking in an era when it was a dark art.",
    loot: [
      "Closed a large cross-networking contract with a major VC firm",
      "Cut his teeth on enterprise networking — the runway to SAVVIS",
    ],
    tech: ["Novell", "Windows 95", "LAN", "Routers"],
  },
  {
    id: "early",
    codename: "The Early Years",
    role: "Builder & Explorer",
    org: "Commodore · Apple · DOS · BBS",
    short: "Early Years",
    period: "1984 — 1993",
    start: 1984.0,
    end: 1993.0,
    status: "COMPLETE",
    brief:
      "Started at age 14 in 1984 on Commodore, Apple, and DOS machines — drawn to video games, telecommunications, programming, and bulletin board systems. Spent nights online over 300bps modems through the evolution from BBSs and ARPANET to the modern Internet.",
    objectives: [
      "Explored programming, telecom, and data communications as a teenager",
      "Ran online over 300bps modems throughout the BBS era",
      "Took part in the evolution from BBS/ARPANET to the Internet",
    ],
    bossFight:
      "Being on the leading edge before there was an industry — learning the network from the inside as it was being invented.",
    loot: [
      "A lifelong drive to build leading-edge technology companies",
      "Foundational fluency in networks and data communications",
    ],
    tech: ["Commodore", "Apple", "DOS", "300bps Modems", "BBS", "ARPANET"],
  },
];

// ----------------------------------------------------------------------------
// OPERATING DASHBOARD — the "how I think about the business" snapshot
// ----------------------------------------------------------------------------
export const dashboard = {
  counters: [
    { label: "Years in technology, since 1984", value: 40, suffix: "+" },
    { label: "Companies founded & led", value: 6, suffix: "" },
    { label: "High-paying jobs created", value: 4000, suffix: "+" },
    { label: "Patents as inventor", value: 5, suffix: "" },
  ],
  radials: [
    { label: "Reliability mindset", value: 99 },
    { label: "Automation coverage", value: 96 },
    { label: "Global scalability", value: 94 },
  ],
  weeklyFlow: [3, 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 20], // platform capability over time
  blockerBars: [
    { label: "Sales", value: 8 },
    { label: "Ops", value: 9 },
    { label: "Finance", value: 6 },
    { label: "Supply", value: 7 },
    { label: "Support", value: 5 },
  ],
};

// ----------------------------------------------------------------------------
// CAREER ANALYTICS — graphs that make the journey legible at a glance.
// ----------------------------------------------------------------------------
export const careerAnalytics = {
  // Trajectory across the real milestones (level 1–11).
  growth: [
    { year: "1984", level: 1, label: "Early systems" },
    { year: "1994", level: 5, label: "SAVVIS — co-founder/CTO" },
    { year: "1997", level: 6, label: "Intira — founder/CEO" },
    { year: "2004", level: 8, label: "Phantom — public" },
    { year: "2010", level: 9, label: "Savtira — cloud commerce" },
    { year: "Today", level: 11, label: "Platformz · FUR4" },
  ],
  // Where the experience concentrates (relative weight, 0–100).
  domains: [
    { name: "Platform & Software Architecture", value: 100, color: "var(--cyan)" },
    { name: "Commerce & Omni-channel", value: 94, color: "var(--violet)" },
    { name: "Cloud, DevOps & Infrastructure", value: 92, color: "var(--magenta)" },
    { name: "Executive Leadership & GTM", value: 95, color: "#34d399" },
    { name: "Supply Chain & Manufacturing", value: 82, color: "var(--amber)" },
  ],
  // Industries built across — breadth over the career.
  industries: [
    { name: "Internet Infrastructure", icon: "🌐" },
    { name: "Data Centers", icon: "🏢" },
    { name: "Managed Hosting", icon: "🖧" },
    { name: "Enterprise Software", icon: "🧩" },
    { name: "Digital Media / OTT", icon: "🎬" },
    { name: "Gaming Technology", icon: "🎮" },
    { name: "Cloud Services", icon: "☁️" },
    { name: "Cryptocurrency Infrastructure", icon: "🪙" },
    { name: "Digital Commerce", icon: "🛒" },
    { name: "Manufacturing", icon: "🏭" },
  ],
};

// ----------------------------------------------------------------------------
// TREE NAV — labels float on the interactive 3D tree; click scrolls to section.
// ----------------------------------------------------------------------------
export const treeNodes = [
  { label: "Profile", href: "#about", teaser: "The story so far + executive profile" },
  { label: "Expertise", href: "#skills", teaser: "Architecture, innovation & leadership" },
  { label: "Experience", href: "#missions", teaser: "Savvis, Intira, Phantom & more" },
  { label: "Companies", href: "#ventures", teaser: "Six companies across three decades" },
  { label: "Heritage", href: "#heritage", teaser: "A St. Louis family of builders" },
  { label: "Philosophy", href: "#philosophy", teaser: "Why most enterprise software fails" },
  { label: "Platformz", href: "#platformz", teaser: "The multi-tenant commerce platform" },
  { label: "FUR4", href: "#fur4", teaser: "Digital transformation in production" },
  { label: "IP & Awards", href: "#innovation", teaser: "Patents, trademarks & recognition" },
  { label: "Praise", href: "#recommendations", teaser: "What colleagues & partners say" },
  { label: "FAQ", href: "#faq", teaser: "Questions & answers about Tim" },
  { label: "Contact", href: "#contact", teaser: "Start a conversation" },
];

// ----------------------------------------------------------------------------
// COMPANIES & VENTURES
// ----------------------------------------------------------------------------
export const ventures = [
  {
    name: "Platformz",
    tagline: "CEO & CTO · the AI-powered enterprise operating system.",
    description:
      "A single intelligent operating layer that orchestrates every business process automatically — eliminating repetitive work and giving organizations complete operational visibility. Chief Executive Officer & Chief Technology Officer.",
    theme: "violet" as const,
    link: "https://platformz.us",
  },
  {
    name: "FUR4",
    tagline: "COO & CTO · operations, commerce & manufacturing as one system.",
    description:
      "Technology and operations across global manufacturing, digital commerce, supply-chain automation, and international expansion — and the live production environment for Platformz. Chief Operating Officer & Chief Technology Officer.",
    theme: "amber" as const,
    link: "", // {{REPLACE}} with FUR4 site
  },
  {
    name: "SAVVIS Communications",
    tagline: "Co-founder & CTO · 1994 · NASDAQ: SVVS.",
    description:
      "Co-founded Diamond.net / SAVVIS and designed the first high-QoS national backbone — originating QoS guarantees, metered billing, and PNAPs (OC3 ATM across 22 Tier-1 cities). Apple anchor contract; Gateway VC funding; NASDAQ IPO; later acquired by CenturyLink for ~$3.4B.",
    theme: "cyan" as const,
    link: "",
  },
  {
    name: "Intira Corporation",
    tagline: "Founder & CEO · 1997 · → Terremark → Verizon ($1.6B).",
    description:
      "The first company ever to sell cloud computing as a service ('Netsourcing'). Three data centers, $30M raised. Lineage: Intira → Data Return → Terremark (NASDAQ: TMRK) → Verizon for ~$1.6B.",
    theme: "magenta" as const,
    link: "",
  },
  {
    name: "Savtira Corporation",
    tagline: "Founder, Chairman & CEO · 2010 · cloud commerce.",
    description:
      "An enterprise-class cloud commerce eco-system for physical and digital goods on virtualized IBM WebSphere Commerce. 5 inventor patents, 6 data centers, 160 employees, 28 wholesale partners.",
    theme: "emerald" as const,
    link: "",
  },
  {
    name: "StationDigital",
    tagline: "Founder & CEO · 2013 · public via reverse merger.",
    description:
      "An ad-supported, DMCA-compliant digital radio and video platform with 22M+ tracks, taken public via reverse merger.",
    theme: "cyan" as const,
    link: "",
  },
  {
    name: "HashingSpace",
    tagline: "Founder & CEO · 2013 · public via reverse merger.",
    description:
      "Bitcoin mining, hosting, and data centers — plus wallet, exchange, cloud-hashing, and mining pools. A deep, early bet on Bitcoin and blockchain infrastructure.",
    theme: "amber" as const,
    link: "",
  },
  {
    name: "GameStreamer",
    tagline: "CEO & CTO · 2007 · acquired (Media Speed Tech).",
    description:
      "B2B video-game distribution — the first automated publishing system and white-label storefront SDK, at 99.999% uptime. 2,200+ games from 220 developers; localized into 22 languages.",
    theme: "violet" as const,
    link: "",
  },
  {
    name: "Phantom Entertainment",
    tagline: "Founder, CEO & CTO · 2002 · public via reverse merger.",
    description:
      "Infinum Labs / Phantom — a PC-based living-room game console with application streaming, public via reverse merger. Recruited Kevin Bachus (Xbox founding team). The Lapboard is still sold today.",
    theme: "magenta" as const,
    link: "https://www.phantom.net",
  },
  {
    name: "CEOSavvy, LLC",
    tagline: "Managing Director · 2008–present · advisory.",
    description:
      "Advisory and consulting for startups and growth-stage companies — board roles, strategy, finance, and go-to-market, taking founders from idea to fundable business.",
    theme: "emerald" as const,
    link: "",
  },
];

// ----------------------------------------------------------------------------
// PLATFORMS & FOCUS — notable areas of work across the career.
// ----------------------------------------------------------------------------
export const projects = [
  {
    name: "Platformz — Enterprise Operating System",
    org: "Platformz",
    period: "Present",
    blurb:
      "An AI-powered operating layer that automates product, manufacturing, sales, finance, support, logistics, compliance, and reporting — the whole company on one platform.",
    tags: ["Enterprise OS", "AI", "Architecture"],
    link: "https://platformz.us",
  },
  {
    name: "FUR4 — Commerce & Manufacturing",
    org: "FUR4",
    period: "Present",
    blurb:
      "Global manufacturing, digital commerce, and supply-chain automation run as a single connected operation, built for international expansion.",
    tags: ["Manufacturing", "Commerce", "Supply Chain"],
    link: "",
  },
  {
    name: "Intelligent Operating Layer",
    org: "AI Platform Design",
    period: "2020s",
    blurb:
      "The conviction that enterprise software is becoming one intelligent layer that runs every process automatically — not a collection of disconnected apps.",
    tags: ["AI", "Automation", "Vision"],
    link: "",
  },
  {
    name: "Digital Commerce Platforms",
    org: "Commerce era",
    period: "2010s",
    blurb:
      "DTC, B2B, dealer, and marketplace commerce unified with inventory, fulfillment, and finance across every channel.",
    tags: ["Digital Commerce", "Omnichannel"],
    link: "",
  },
  {
    name: "Enterprise Hosting & Data Centers",
    org: "Infrastructure era",
    period: "1990s — 2000s",
    blurb:
      "Managed hosting and data-center infrastructure delivering enterprise reliability, network redundancy, secure infrastructure, and operational automation for large-scale deployments.",
    tags: ["Data Centers", "Hosting", "Reliability"],
    link: "",
  },
  {
    name: "Internet Infrastructure",
    org: "Commercial Internet era",
    period: "1990s",
    blurb:
      "High-performance enterprise networking built during the rise of the commercial Internet — the foundation under every platform since.",
    tags: ["Networking", "Infrastructure", "Scalability"],
    link: "",
  },
];

// ----------------------------------------------------------------------------
// PHILOSOPHY — the enterprise-software thesis + leadership principles.
// ----------------------------------------------------------------------------
export const philosophy = {
  problemHeadline: "Most enterprise software fails because every department buys a different system.",
  problemDepartments: [
    "Marketing buys one platform.",
    "Finance buys another.",
    "Operations buys another.",
    "Customer service buys another.",
  ],
  problemResult:
    "Soon the business owns dozens of disconnected applications — requiring expensive integrations, duplicate data entry, inconsistent reporting, and endless manual processes.",
  belief:
    "Timothy believes this approach is fundamentally broken. Every business should operate through a unified architecture — not a pile of disconnected tools.",
  unified: [
    { icon: "🗄️", title: "Common data model", text: "One shared model of the business, so every application speaks the same language." },
    { icon: "🔐", title: "Common security framework", text: "One security and permissions layer across every function, not dozens of silos." },
    { icon: "⚡", title: "Common automation engine", text: "One engine that automates work across the whole organization." },
  ],
  // Leadership principles — every business process should be…
  principles: [
    { word: "Measurable", icon: "📊" },
    { word: "Automated", icon: "⚙️" },
    { word: "Auditable", icon: "🔎" },
    { word: "Scalable", icon: "📈" },
    { word: "Secure", icon: "🛡️" },
  ],
  truths: [
    "Every department works from a single source of truth.",
    "Every employee has access to real-time operational intelligence.",
    "Every executive can read the health of the business from a single dashboard.",
  ],
  forward: {
    lines: [
      "Cloud computing connected businesses.",
      "Artificial intelligence will orchestrate them.",
    ],
    objective:
      "The long-term objective: establish Platformz as the intelligent operating layer powering organizations across industries — automating end-to-end operations while clients keep full ownership of their data, infrastructure, and competitive advantages.",
    industries: [
      "Manufacturing",
      "Retail",
      "Healthcare",
      "Logistics",
      "Financial Services",
      "Hospitality",
    ],
  },
};

// ----------------------------------------------------------------------------
// PLATFORMZ — the company, its modules, and the AI vision.
// ----------------------------------------------------------------------------
export const platformz = {
  intro:
    "Platformz is a multi-tenant, enterprise-class commerce platform and agency — 100% owned by FUR4 — powering consumer brands across pet, sports, and other verticals (FUR4 flagship, plus Rockerz and more). One extensible architecture drops new brands and sites into the same paid infrastructure, supporting acquisitions and roll-ups while dramatically reducing implementation time.",
  link: "https://platformz.us",
  modules: [
    "Customer Portals",
    "Dealer Portals",
    "Wholesale Portals",
    "Employee Portals",
    "Vendor Portals",
    "CRM",
    "ERP",
    "Inventory Management",
    "Warehouse Management",
    "Product Information Management",
    "Manufacturing",
    "Supply Chain",
    "Finance",
    "Human Resources",
    "Marketing",
    "Artificial Intelligence",
    "Analytics",
    "Compliance",
    "Executive Dashboards",
  ],
  aiHeadline: "AI as the operational intelligence layer — not a replacement for people.",
  aiIntro:
    "Artificial intelligence is the next major transformation in enterprise software. Rather than replacing employees, Platformz uses AI as the operational intelligence layer sitting above every business system — so organizations benefit from AI without ripping out what already works.",
  aiCapabilities: [
    "Understand business context",
    "Generate executive insights",
    "Predict operational risks",
    "Automate repetitive workflows",
    "Analyze financial performance",
    "Forecast inventory demand",
    "Monitor compliance",
    "Recommend operational improvements",
  ],
  // Digital Commerce Operating System — the control-tower vision.
  dcosHeadline: "Digital Commerce Operating Systems",
  dcosIntro:
    "Timothy's primary focus today is designing what he calls Digital Commerce Operating Systems — integrating dozens of specialized technologies into a single intelligent control tower. Instead of replacing existing software, Platformz orchestrates it.",
  dcos: [
    "Product Development",
    "Manufacturing",
    "Vendor Management",
    "Compliance",
    "Product Information",
    "Digital Assets",
    "Inventory",
    "Warehousing",
    "Orders",
    "Shipping",
    "Customer Service",
    "Finance",
    "Marketing",
    "Marketplace Integrations",
    "AI Automation",
    "Executive Reporting",
  ],
};

// ----------------------------------------------------------------------------
// FUR4 — the digital-transformation case study.
// ----------------------------------------------------------------------------
export const fur4 = {
  intro:
    "FUR4 is a premium pet-grooming brand led by the original inventor of the Furminator — Safer, Gentler, More Effective de-shedding tools. As COO & CTO, Timothy owns nearly every operational and technical layer, from the decoupled commerce stack to global manufacturing, finance, and channels.",
  responsibilities: [
    "Decoupled React + Magento + Strapi (GraphQL) commerce stack",
    "Referral Partner Portal (KYC, W-8/W-9, 1099, Plaid/Stripe/PayPal)",
    "Dealer / Wholesale Portal (tax-exempt onboarding, co-op funds)",
    "HubSpot Owner/Admin Portal & brand governance",
    "Avalara AvaTax SST — system of record for tax",
    "QuickBooks COA & custom line-level mappings",
    "Industrial design (CAD→DFM/DFX) & materials",
    "QA via Intertek / PROQC, REACH, GS1 UPC/EAN",
    "Multi-region 3PL with ShipBob (US/EU/UK/CA/AU)",
    "Amazon/Walmart/eBay via M2E Pro; Chewy via SPS Commerce",
    "Rithum/ChannelAdvisor (500+ connectors)",
    "Twilio 2FA, SendGrid/Mandrill, i18nPro + Crowdin",
    "New Relic, Hotjar, SonarQube, Tenable, Playwright",
    "~50-person blended team (~80% engineering)",
  ],
  // Hard metrics from operations.
  metrics: [
    { value: "~5×", label: "BOM cost reduction vs. prototype" },
    { value: "~35k", label: "Units on hand, +90k ready" },
    { value: "500k–1M", label: "Units/month capacity at scale" },
    { value: "4 SKUs", label: "Dog & Cat, Long & Short · MAP $49.95" },
  ],
  productionHeadline: "More than a consumer-products company — the production environment for Platformz.",
  productionNote:
    "FUR4 is the primary production environment for Platformz — continuously validating new technology in the real world before it's commercialized for additional enterprise customers. Magento is the truth for catalog, orders, and inventory; HubSpot is the truth for sales, marketing, and support.",
};

// ----------------------------------------------------------------------------
// HERITAGE — the Roberts family of St. Louis.
// ----------------------------------------------------------------------------
export const heritage = {
  intro:
    "Timothy Munro Roberts was born in St. Louis in 1970, into a prominent family rooted in the city since the early 1800s — a lineage of lawyers, marketers, and entrepreneurs who each, in their own field, built something lasting.",
  members: [
    {
      icon: "⚖️",
      name: "Munro Roberts Sr.",
      relation: "Great-grandfather",
      title: "Nationally known labor lawyer",
      note:
        "A labor-union organizer turned lawyer who became Director of Labor Relations and aide-de-camp to publisher Joseph Pulitzer at the St. Louis Post-Dispatch. He founded the typographers' union.",
    },
    {
      icon: "🏛️",
      name: "Munro Roberts Jr.",
      relation: "Grandfather",
      title: "Prominent St. Louis attorney · 1947–1992",
      note:
        "After serving in WWII, he founded the firm now known as Roberts, Perryman & Bonkamp. He represented or sat on the boards of Laclede Gas, Southwestern Bell, the St. Louis Globe-Democrat, Samuel I. Newhouse, and the ABC Television Network.",
    },
    {
      icon: "🏁",
      name: "William “Monty” Munro Roberts III",
      relation: "Father",
      title: "Marketing innovator — Ford · Anheuser-Busch · Y&R",
      note:
        "A Ford Foundation Scholar at Yale and Washington University graduate. As Ford's Director of Marketing he helped create the Shelby and Mercury divisions and ran Ford Racing; designed Busch Gardens attractions (Tampa's 'Dark Continent' and the Loch Ness Monster coaster); helped launch Busch beer; and originated NASCAR's Busch Series, the Busch Clash, and the 17-year 'Head for the Mountains' campaign. He later led the Walt Disney account at Y&R before becoming an ordained Episcopalian minister.",
      href: "https://montyroberts.life",
      linkLabel: "Explore the full archive at montyroberts.life",
    },
    {
      icon: "💡",
      name: "Lora Roberts",
      relation: "Mother",
      title: "Serial entrepreneur",
      note:
        "An acclaimed businesswoman who has started and owned a business brokerage, franchise auto-brake stores, and a chemical-distribution company — and today owns MedHire, a neuroscience recruitment firm.",
      href: "https://loraleeroberts.com",
      linkLabel: "Visit her archive at loraleeroberts.com",
    },
  ],
  // Personal note shown under the family cards.
  personal:
    "St. Louis-based and a proud father of four. His startups have created over 4,000 high-paying jobs. After Hurricane Katrina he managed operations for a Red Cross disaster center in Atlanta, helping 400+ victims alongside 20+ agencies. Off the clock: offshore fishing (3rd place, 2015 Billfish Memorial Day Shootout), ice hockey, golf, tennis, and strategy games.",
};

// ----------------------------------------------------------------------------
// IP, PATENTS & RECOGNITION
// ----------------------------------------------------------------------------
export const ip = {
  intro:
    "Inventor on 5 patents from Savtira's cloud-commerce platform — application streaming, encoding, and digital-goods auto-publishing — with additional filings prepared for the Platformz multi-tenant architecture.",
  patents: [
    {
      icon: "🎞️",
      title: "Application Streaming",
      text: "Streaming applications and games on demand from the cloud to the device — the core of the Phantom and Savtira platforms.",
      status: "Patent · inventor (Savtira)",
    },
    {
      icon: "🧬",
      title: "Encoding",
      text: "Encoding methods for delivering digital goods efficiently and securely across networks.",
      status: "Patent · inventor (Savtira)",
    },
    {
      icon: "📦",
      title: "Digital-Goods Auto-Publishing",
      text: "Automated, real-time publishing, protection, and distribution of digital goods with auditing controls.",
      status: "Patent · inventor (Savtira)",
    },
    {
      icon: "🧱",
      title: "Tenant Isolation",
      text: "Running multiple brands isolated, secure, and independent on one shared multi-tenant platform.",
      status: "Filing prepared (Platformz)",
    },
    {
      icon: "🧭",
      title: "Portal Orchestration",
      text: "Orchestrating Customer, Dealer, Referral, Promo, Branding, and Owner portals from one architecture.",
      status: "Filing prepared (Platformz)",
    },
    {
      icon: "🛰️",
      title: "Micro-gateway API Routing",
      text: "API micro-gateways that route and govern traffic across tenantized services.",
      status: "Filing prepared (Platformz)",
    },
  ],
  trademarks:
    "Managed US/EU trademark filings and brand protection for FUR4 and Platformz, with brand-guideline enforcement workflows. (Patent details available under NDA.)",
  awards: [
    "St. Louis Business Journal — 30 Under 30",
    "St. Louis Business Journal — 40 Under 40",
    "St. Louis Top 100 of the Millennium",
    "#1 network performance — Keynote Systems & Boardwatch",
  ],
  education: [
    "Missouri Valley College (1989)",
    "Missouri State University (1990)",
  ],
};

// ----------------------------------------------------------------------------
// BEYOND TECHNOLOGY — horizontal expertise across the business.
// ----------------------------------------------------------------------------
export const expertiseAreas = [
  {
    icon: "♟️",
    title: "Strategy",
    items: [
      "De novo company start-up",
      "Organizational structuring",
      "Strategic positioning & R&D",
      "Business & operating plans",
      "Competitive analysis",
      "Strategic partnerships",
    ],
  },
  {
    icon: "💰",
    title: "Finance",
    items: [
      "Private placement, PIPE & crowd funding",
      "VC / IPO / reverse mergers",
      "Financial forecasting & cash flow",
      "Tax & GAAP accounting",
      "Public filings, audits & SOX",
      "Valuations & risk disclosures",
    ],
  },
  {
    icon: "⚖️",
    title: "Legal",
    items: [
      "Trademarks, patents & licensing",
      "Securities, liens & debt/equity contracts",
      "SEC & FINRA rules",
      "Corporate structuring",
      "M&A, turn-arounds & bankruptcy",
      "Takeover / raiding protection",
    ],
  },
  {
    icon: "📣",
    title: "Marketing & Advertising",
    items: [
      "Corporate identity & branding",
      "PR / IR",
      "SEO / SEM, online & mobile ads",
      "Social, viral & app marketing",
      "Analytics & lead generation",
      "A/V production & graphic design",
    ],
  },
  {
    icon: "🛠️",
    title: "Development",
    items: [
      "Software, app & plug-in development",
      "Data center design (Tier 0–4)",
      "SaaS / PaaS / IaaS solutions",
      "Industrial design & prototyping",
      "UI/UX, wireframes & usability",
      "Ecommerce, payments & APIs",
    ],
  },
  {
    icon: "⚙️",
    title: "Operations",
    items: [
      "Data center construction & management",
      "Contract manufacturing",
      "Network / IT management & support",
      "Licensing & content acquisition",
      "Vendor assessment & negotiation",
      "Security & technical audits",
    ],
  },
];

// ----------------------------------------------------------------------------
// RECOMMENDATIONS — real quotes from colleagues & partners.
// ----------------------------------------------------------------------------
export const recommendations = [
  {
    quote:
      "I recommend Tim on his ability to see and set the vision of the company. Tim was instrumental in creating the managed hosting model and providing services above that of just bandwidth.",
    author: "Samuel W. (Sam) Wood",
    role: "VP of Marketing, Apple Computer",
  },
  {
    quote:
      "Having worked with Tim on possible partnerships when I was with UUNET, I was very impressed with his business savvy and understanding of how to structure a deal. As a visionary, he continues to show that he can think two steps ahead of the competition.",
    author: "Eric Ayala",
    role: "VP of Sales, UUNET",
  },
  {
    quote:
      "Tim is a consummate entrepreneur with visionary ideas and the energy and experience to make them happen… he has the ability to bring together complex projects by sweating the details to ensure that success is the only outcome. A great guy whose handshake is his word.",
    author: "Michael Aiton",
    role: "Carrier Sales Manager (Canada), Ascend Communications",
  },
  {
    quote:
      "Tim is a great guy, and is very passionate about every challenge he takes on. He is a man of vision, and in working with him I was impressed on his depth of knowledge on so many technologies.",
    author: "Tony Colafrancesco",
    role: "Director of Gaming & Entertainment, AIM Network (AOL)",
  },
  {
    quote:
      "Tim Roberts has a deep understanding of the product and market for any venture he works on. He can quickly assess a situation and resolve problems as they come up, using natural strong leadership ability. The definition of entrepreneur fits Tim completely.",
    author: "Susan Flowers",
    role: "Energizer Batteries",
  },
  {
    quote:
      "Over the past five years, I have known Tim Roberts to be a true visionary, excellent manager and motivator… He has an acute sense of the next big thing and knows how to build an organization, business model and market presence.",
    author: "Richard Krueger",
    role: "Senior Vice President, Boonty Games",
  },
  {
    quote:
      "Developed an innovative idea at Savvis to improve overall connectivity of the Internet… we developed a measurement metric that essentially proved his concept correct and seminal at the time.",
    author: "Jack Rickard",
    role: "Publisher, Boardwatch Magazine",
  },
  {
    quote:
      "Tim is a pioneer at establishing IT-based startups and turning them into profit-making multimillion-dollar value propositions. Worth anyone's time that has the need of going from the intangible idea stage to the substantial investment opportunity!",
    author: "William Fairbanks",
    role: "Owner, Tildy, LLC",
  },
  {
    quote:
      "Tim's incredible business vision and drive is contagious to those who have had the opportunity to work directly with him.",
    author: "Jason Loyet",
    role: "Founder & COO, GlobalStreams",
  },
];

// ----------------------------------------------------------------------------
// REFERENCES & MEDIA — independently verifiable third-party sources.
// ----------------------------------------------------------------------------
export const references = [
  {
    icon: "📚",
    name: "SAVVIS — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Savvis",
    note: "Company history; NASDAQ (SVVS) and the CenturyLink acquisition.",
  },
  {
    icon: "📚",
    name: "Terremark — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Terremark",
    note: "Intira's lineage; later acquired by Verizon for ~$1.6B.",
  },
  {
    icon: "🎮",
    name: "Phantom (game console) — Wikipedia",
    url: "https://en.wikipedia.org/wiki/Phantom_(game_console)",
    note: "Infinium Labs / Phantom Entertainment and the Lapboard.",
  },
  {
    icon: "📄",
    name: "HashingSpace — SEC EDGAR",
    url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=hashingspace&type=&dateb=&owner=include&count=40",
    note: "Public-company filings (reverse triangular merger).",
  },
  {
    icon: "📄",
    name: "StationDigital — SEC EDGAR",
    url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&company=stationdigital&type=&dateb=&owner=include&count=40",
    note: "Public-company filings (reverse merger).",
  },
  {
    icon: "🪐",
    name: "Platformz",
    url: "https://platformz.us",
    note: "Current company — Chief Executive Officer.",
  },
  {
    icon: "⚙️",
    name: "FUR4",
    url: "https://fur4.com",
    note: "Current company — Chief Operating Officer & CTO.",
  },
  {
    icon: "🕹️",
    name: "Phantom — phantom.net",
    url: "https://www.phantom.net",
    note: "The Lapboard gaming peripheral, still sold today.",
  },
];

// ----------------------------------------------------------------------------
// FAQ — plain-language answers (also emitted as FAQPage structured data so
// search engines and AI assistants answer questions about Tim correctly).
// ----------------------------------------------------------------------------
export const faqs = [
  {
    q: "Who is Timothy Munro Roberts?",
    a: "Timothy Munro Roberts (Tim Roberts) is a technology founder, enterprise architect, and platform designer with 25+ years building and scaling commerce and infrastructure platforms. He is currently CEO of Platformz and COO & CTO of FUR4, and was born in St. Louis, Missouri in 1970.",
  },
  {
    q: "Did Tim Roberts found SAVVIS?",
    a: "Yes. In 1994 he co-founded Diamond.net (aka SAVVIS Communications) and served as CTO, designing the first high-quality-of-service national Internet backbone. SAVVIS went public (NASDAQ: SVVS) and was later acquired by CenturyLink (now Lumen) for approximately $3.4B.",
  },
  {
    q: "What companies has Tim Roberts founded or led?",
    a: "SAVVIS (co-founder & CTO), Intira (founder & CEO), Phoenix Networks (director & investor), Phantom Entertainment (founder, CEO & CTO), GameStreamer (CEO & CTO), Savtira (founder, chairman & CEO), StationDigital (founder & CEO), HashingSpace (founder & CEO), CEOSavvy (managing director), and today Platformz (CEO) and FUR4 (COO & CTO).",
  },
  {
    q: "What is Tim Roberts known for in cloud computing?",
    a: "He founded Intira in 1997 — the first company ever to sell cloud computing as a service ('Netsourcing'). Intira's lineage continued through Data Return and Terremark (NASDAQ: TMRK), which Verizon acquired for approximately $1.6B.",
  },
  {
    q: "How many companies has Tim Roberts taken public?",
    a: "Four: SAVVIS (NASDAQ IPO), and Phantom Entertainment, StationDigital, and HashingSpace via reverse mergers.",
  },
  {
    q: "How many patents does Tim Roberts hold?",
    a: "He is an inventor on 5 patents from Savtira's cloud-commerce platform (application streaming, encoding, and digital-goods auto-publishing), with additional filings prepared for the Platformz multi-tenant architecture.",
  },
  {
    q: "What is Platformz?",
    a: "Platformz is a multi-tenant, enterprise-class commerce platform and agency (100% owned by FUR4) that powers consumer brands. It's built on React/Next, Magento 2, Strapi, GraphQL, AWS, and Cloudflare, with tenantized portals for customers, dealers, referrals, and more.",
  },
  {
    q: "Where is Tim Roberts based?",
    a: "St. Louis, Missouri, USA.",
  },
];
