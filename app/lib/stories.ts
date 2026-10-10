import { missions, type Mission } from "../content";

// The companies that get their own indexable case-study page. We skip the
// pre-company chapters (early years / first job) — they live on the timeline.
const EXCLUDED = new Set(["early", "jandg"]);

export const storyMissions: Mission[] = missions.filter((m) => !EXCLUDED.has(m.id));

export const storySlugs = storyMissions.map((m) => m.id);

export function getStory(slug: string): Mission | undefined {
  return storyMissions.find((m) => m.id === slug);
}
