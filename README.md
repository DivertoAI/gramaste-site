# Gramaste website

Marketing site for Gramaste (Next.js 15). This repository is the published copy of the `website/` folder in the main Gramaste project.

- Develop: `npm install && npm run dev`
- Static build for GitHub Pages: runs automatically on every push to `main` (see `.github/workflows/pages.yml`).
- The waitlist form needs a server. On GitHub Pages it shows "Waitlist opens soon" until `NEXT_PUBLIC_WAITLIST_URL` points at an endpoint.
