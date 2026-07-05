# Suresh balla — Portfolio

A modern, light, professional portfolio website built with Next.js 15. The interface focuses on clear positioning, selected work, measurable experience, and a refined minimal visual system.

## Tech Stack

- **Framework:** Next.js 15 / React 19 / TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui, Framer Motion
- **State:** Zustand
- **Fonts:** Playfair Display, DM Sans

## Features

- Light modern-minimal interface with professional typography
- Portrait-led hero with proof points and clear calls to action
- Case-study style project cards with screenshots, links, and tech stacks
- Polished experience timeline and grouped technical expertise
- Scroll-triggered animations via Framer Motion
- Fully responsive with mobile navigation
- Data-driven sections — edit JSON files to update content
- Six sections: Hero, About, Skills, Experience, Projects, Contact

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                  # Next.js app router (layout, pages, styles)
components/
  sections/           # Portfolio sections (Hero, About, Skills, etc.)
  layout/             # Navbar
  ui/                 # shadcn/ui components
data/                 # Content config (portfolio, skills, experience, projects)
hooks/                # Custom React hooks
lib/                  # Utilities and Zustand store
public/               # Static assets and favicons
```

## Customization

All portfolio content lives in a single file: `data/portfolio.json`. It contains profile info, section order, skills, experience, and projects.
