# Repository Guidelines

## Project Structure & Module Organization
The interface lives in `src/`. `main.js` bootstraps the single-page flow, `style.css` holds global styles, and `assets/` collects menu imagery (SVG and JPEG). Design references are in `context/` for quick alignment on tone and layout. Vite serves static assets from `public/`, while bundling outputs to `dist/`; never edit `dist/` manually—regenerate via the build pipeline.

## Build, Test, and Development Commands
Run `npm install` once to fetch dev dependencies (Vite only). Use `npm run dev` for a hot-reloading server at http://localhost:5173; the command respects `public/` and watches `src/`. Execute `npm run build` to produce an optimized bundle in `dist/`. When validating production output locally, use `npm run preview`, which serves the latest build using Vite’s preview server.

## Coding Style & Naming Conventions
Write ES modules with default exports where practical; prefer named functions for reusable components. Follow the existing two-space indentation and keep imports grouped by asset type (styles, SVG, photos). Strings should use single quotes, and omit trailing semicolons to match the current standard. Asset filenames stay lowercase with hyphens (e.g., `breakfast-photo.jpeg`). Keep DOM IDs and classes kebab-cased (`tab-button`, `tab-content`). Place shared styles in `src/style.css`; add new component-specific styles near the bottom with clear comments.

## Testing Guidelines
No automated test suite exists yet. For UI changes, smoke-test the key flows: initial load, tab switching, and image rendering in `npm run dev`. When adding tests, prefer Vitest or Playwright; place unit specs alongside the modules under `src/`, naming them `*.test.js`. Document any new testing scripts in `package.json`.

## Commit & Pull Request Guidelines
Use concise, imperative commit messages (`Add tab toggling logic`, `Refine hero layout`). Reference issue IDs when applicable (`Add tab toggling logic #12`). For pull requests, include a short problem statement, describe the solution, attach relevant screenshots or GIFs from the preview build, and list manual test steps executed. Request review from a teammate familiar with the affected area and ensure the branch rebases cleanly before merging.


## Visual Development

### Design Principles
- Comprehensive design checklist in `./context/design-principles.md`
- Brand style guide in `./context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Verify design compliance** - Compare against `/context/design-principles.md` and `/context/style-guide.md`
4. **Validate feature implementation** - Ensure the change fulfills the user's specific request
5. **Check acceptance criteria** - Review any provided context files or requirements
6. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing