import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";
import { storySlugs } from "./lib/stories";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const stories = storySlugs.map((slug) => ({
    url: `${SITE_URL}/story/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...stories,
  ];
}
