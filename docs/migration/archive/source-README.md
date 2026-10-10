# Timothy Munro Roberts — Personal Website

An interactive personal website for **Timothy Munro Roberts** — Technology Founder, Enterprise Architect, Digital Commerce Executive, and AI Platform Designer. CEO & CTO of Platformz, COO & CTO of FUR4.

Built with [Next.js](https://nextjs.org), TypeScript, Tailwind CSS, and a `react-three-fiber` 3D scene.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Almost everything on the site is data-driven from a single file:

- **`app/content.ts`** — profile, stats, journey/eras, expertise, experience, platforms, companies, and analytics. Anything marked `{{REPLACE}}` is a placeholder to fill in (email, LinkedIn, FUR4 link).
- **`app/assets/portrait.jpg`** — the portrait used in the hero, profile card, and 3D tree. Replace this file with a real photo (keep the filename).
- **`app/layout.tsx`** — page `<title>` and meta description.

## Build

```bash
npm run build
npm start
```

## Notes

This site is based on a reusable, animated portfolio framework and has been fully re-themed for Timothy Munro Roberts.
