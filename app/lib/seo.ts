// ============================================================================
// SEO / structured data — the canonical machine-readable identity for search
// engines and AI crawlers. Keep this factually accurate; it feeds Google's
// Knowledge Panel and LLM training/answers.
// ============================================================================

export const SITE_URL = "https://timothymunroroberts.com";

export const PERSON_NAME = "Timothy Munro Roberts";

export const SAME_AS = [
  "https://www.linkedin.com/in/platformz",
  "https://github.com/azaworld",
  "https://platformz.us",
  "https://fur4.com",
  "https://www.phantom.net",
  "https://builtbeforecloud.com",
  "https://builtbeforecloud.com/about-tim",
];

// One-paragraph canonical bio (used for meta description + schema description).
export const BIO_SHORT =
  "Timothy Munro Roberts is a technology founder, enterprise architect, and platform designer with 25+ years building and scaling high-availability commerce and infrastructure platforms. He co-founded SAVVIS Communications (NASDAQ: SVVS; later acquired by CenturyLink for ~$3.4B), founded Intira (the first company to sell cloud computing as a service; lineage acquired by Verizon for ~$1.6B via Terremark), and took Phantom Entertainment, StationDigital, and HashingSpace public. Today he is CEO of Platformz and COO/CTO of FUR4.";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PERSON_NAME,
  alternateName: ["Tim Roberts", "Timothy Roberts", "Tim Munro Roberts"],
  url: SITE_URL,
  image: `${SITE_URL}/portrait.jpg`,
  description: BIO_SHORT,
  jobTitle: "Chief Executive Officer & Chief Technology Officer",
  email: "mailto:tim@platformz.us",
  telephone: "+1-636-735-1657",
  worksFor: [
    { "@type": "Organization", name: "Platformz", url: "https://platformz.us" },
    { "@type": "Organization", name: "FUR4", url: "https://fur4.com" },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Missouri Valley College" },
    { "@type": "CollegeOrUniversity", name: "Missouri State University" },
  ],
  birthPlace: { "@type": "Place", name: "St. Louis, Missouri, USA" },
  homeLocation: { "@type": "Place", name: "St. Louis, Missouri, USA" },
  knowsAbout: [
    "Enterprise software architecture",
    "Cloud computing",
    "Internet infrastructure",
    "Data centers & managed hosting",
    "Digital commerce",
    "Omnichannel retail",
    "Bitcoin & blockchain",
    "AI platforms",
    "Multi-tenant SaaS",
    "Magento",
  ],
  award: [
    "St. Louis Business Journal 30 Under 30",
    "St. Louis Business Journal 40 Under 40",
    "St. Louis Top 100 of the Millennium",
  ],
  sameAs: SAME_AS,
  subjectOf: {
    "@type": "WebSite",
    name: "Built Before the Cloud",
    url: "https://builtbeforecloud.com",
    description:
      "The firsthand, research-supported story of Timothy Munro Roberts (Tim Roberts)—from Whackoland BBS to Savvis, Intira's NetSourcing and Platformz.",
  },
};

export const organizationsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://platformz.us/#org",
    name: "Platformz",
    url: "https://platformz.us",
    description:
      "A multi-tenant, enterprise-class commerce platform and agency powering consumer brands across pet, sports, and other verticals.",
    founder: { "@id": `${SITE_URL}/#person` },
    sameAs: ["https://builtbeforecloud.com/platformz"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://fur4.com/#org",
    name: "FUR4",
    url: "https://fur4.com",
    description:
      "A premium pet-grooming brand led by the original inventor of the Furminator, and the production environment for Platformz.",
  },
];

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${PERSON_NAME} — Official Site`,
  about: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
};
