# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@DESIGN_SYSTEM.md

## Language

한국어로 답해줘. 코드 주석/커밋 메시지도 한국어 중심.

## Commands

```bash
npm run dev      # Next.js dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type check (no script alias)
```

There is no test framework configured. Don't fabricate a test runner — if tests are requested, ask which framework to set up.

**Browser checks:** the user keeps a Chrome instance open against the dev server. Re-use that page instead of launching a new browser session.

## Stack

- Next.js 16 (App Router) + React 19 + Tailwind v4 (`@tailwindcss/postcss`)
- Pretendard Variable font loaded via CDN in [src/app/layout.tsx](src/app/layout.tsx)
- No state library — all state is local React state in the page component

**Heed AGENTS.md:** this Next.js version has breaking changes vs. older docs. Consult `node_modules/next/dist/docs/` for current API before assuming behavior.

## Architecture

### Routing → Page components

`src/app/*/page.tsx` files are thin route wrappers. They check auth via `isAuthed()` from [src/lib/auth.ts](src/lib/auth.ts) (redirects to `/login` on fail) and then render the matching page component from [src/components/version-b/](src/components/version-b/):

| Route | Page component |
|-------|----------------|
| `/` | `HomePageB` |
| `/login` | `LoginPageB` |
| `/discovery` | `DiscoveryPageB` |
| `/make` | `MakePageB` |
| `/admin` | `AdminPageB` (and `AdminConsolePageB` for sub-views) |
| `/platform-admin` | `PlatformAdminPageB` |

When adding new behavior, edit the `*PageB.tsx` component — not the `page.tsx` shim.

### Shared building blocks

- [PageSidebar.tsx](src/components/version-b/PageSidebar.tsx) — 200px left rail used by every authenticated page. Owns the team selector header, nav items (홈/디스커버리/신청 내역/앱 만들기/배포 신청), and bottom 사용자/관리자 토글 (sliding pill).
- [NotificationButton.tsx](src/components/version-b/NotificationButton.tsx) — exposes `variant="sidebar" | "header"` so the same bell + dropdown works in two layouts.
- [AppDetailView.tsx](src/components/version-b/AppDetailView.tsx) / [AppDetailDiscoveryView.tsx](src/components/version-b/AppDetailDiscoveryView.tsx) — the heaviest views in the repo (app detail tabs, modals, guide steps).
- [useDarkMode.ts](src/hooks/useDarkMode.ts) — `localStorage["axhub-dark-mode"]` toggle with `storage` event sync. The hook flips `html.dark-mode`; each page component also mirrors the class on its root container so the CSS cascade in [globals.css](src/app/globals.css) takes over (§11 of DESIGN_SYSTEM.md).

### Page layout pattern

Every authenticated page follows the same shell (post-2026-05-13 redesign on the home page):

```
[PageSidebar 200px] | [Header 60px + scrollable main]
```

The home page header lives inline in `HomePageB.tsx` (breadcrumb left; search / notification / profile-initials right). Other pages still embed an older 68px global nav — when reusing the new structure, copy the home pattern.

### Design tokens

The full design system (color tokens, typography scale, animation curves, dark-mode mapping, modal patterns, sidebar specs, etc.) lives in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). Treat it as the source of truth before introducing new utility classes or hex values — un-mapped raw hex breaks dark mode.

**Page-specific `--page-primary` (light / dark):**

| Page | Light | Dark |
|------|-------|------|
| 홈 (`/`) | `#5B3D7A` | `#6E4A94` |
| 만들기 (`/make`) | `#B86397` | (dark variant via CSS) |
| 둘러보기 (`/discovery`) | `#B88539` | (dark variant via CSS) |
| 관리하기 (`/admin`) | `#4A78B8` | (dark variant via CSS) |

Inject via inline style on the page root container so per-page accent colors propagate to active menu indicators, primary CTAs, etc.

### Figma → code workflow

Designs live at Figma file `zcmpdNiO5jHIcyAXw1QGoe` (AX 브랜딩). When porting a design:

1. Fetch via the Figma MCP server (`get_design_context` + `get_screenshot`).
2. Map Figma values to DESIGN_SYSTEM.md tokens — don't dump raw Tailwind from the MCP output.
3. Preserve `data-node-id` attributes on top-level nodes for future traceability.

### Commits

- Conventional-style Korean messages (`feat: …`, `fix: …`, `style: …`, `refactor: …`).
- Sign-off footer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
- Don't auto-commit unrelated `M`-flagged files left over from earlier sessions — `git add` only what the current task touched.
