# AXHub Design System — Reference

> Korean enterprise app hub for Jocoding AX Partners. v2 (2026-05).
> This file is a self-contained reference for AI coding assistants and frontend developers.
> Every visible token name maps to a CSS custom property defined in `foundation.css`.

---

## 1. Principles

- **Semantic intent, not visual abundance.** A small token set; hover / soft / focus variants derive from it.
- **One primary color.** `#2D64FA` blue. Hover and soft are paired automatically.
- **Light and dark are 1:1 peers.** Every semantic token has both. `[data-theme="dark"]` on `<html>` flips the system.
- **Phosphor Fill is the default icon style.** Regular only for de-emphasis.
- **Pill for interactives, 12px for containers.** Modals/sheets are the only 16px.
- **Borders separate information surfaces.** Shadows are reserved for floating elements (menus, modals, sheets).
- **Korean-first content.** Polite-formal (-요/-세요), no emoji, no exclamation marks (except greeting hero).

---

## 2. Tokens

### 2.1 Primary

| Token | Light | Dark |
|---|---|---|
| `--primary` | `#2D64FA` (base) | `#4B7BFF` (dark) |
| `--primary-hover` | `#5985FB` (bright) | `#2D64FA` (base) |
| `--primary-soft` | `#EAF0FE` | `rgba(75,123,255,0.40)` |
| `--primary-soft-hover` | `#D6E2FD` | `rgba(75,123,255,0.55)` |
| `--primary-fg` | `#FFFFFF` | `#FFFFFF` |

Internal raw values: `--primary-base #2D64FA`, `--primary-bright #5985FB`, `--primary-dark #4B7BFF`.
**Rule:** consume only `--primary` / `--primary-hover` / `--primary-soft` / `--primary-soft-hover`. The base ↔ bright ↔ dark mapping handles modes automatically.

### 2.2 Neutral base

| Token | Value |
|---|---|
| `--white` | `#FFFFFF` |
| `--black` | `#000000` |
| `--divider` | `rgba(82,82,91,0.08)` light / `rgba(255,255,255,0.08)` dark |

### 2.3 Gray scale

`gray-50 #F6F7F9` → `gray-100 #EFF1F4` → `200 #E4E5E8` → `300 #D1D3D8` → `400 #9CA0AB` → `500 #6D717E` → `600 #4F535D` → `700 #3C3F47` → `800 #25272D` → `900 #16171B`.

Prefer semantic tokens (`--bg-*`, `--fg-*`, `--border-*`) over raw gray references.

### 2.4 Background surfaces

| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg-surface` | `#F6F7F9` | `#0E1014` | page canvas |
| `--bg-content` | `#FFFFFF` | `#25272D` | cards, modals, primary surface |
| `--bg-muted` | `#EFF1F4` | `#16171B` | search, code blocks |
| `--bg-emphasis` | `#E4E5E8` | `#3C3F47` | hover, secondary button |
| `--bg-inverse` | `#16171B` | `#FAFAFA` | tooltip, inverse chip |

### 2.5 Foreground (text · icon)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--fg-default` | `#16171B` | `#FAFAFA` | body, titles |
| `--fg-secondary` | `#3C3F47` | `#D1D3D8` | secondary heading, outline button |
| `--fg-muted` | `#6D717E` | `#9CA0AB` | helper, caption |
| `--fg-subtle` | `#9CA0AB` | `#6D717E` | placeholder, inactive tab label |
| `--fg-disabled` | `#D1D3D8` | `#4F535D` | disabled |
| `--fg-on-primary` | `#FFFFFF` | `#FFFFFF` | text/icon on `--primary` |

### 2.6 Border

| Token | Light | Dark |
|---|---|---|
| `--border-default` | `#E4E5E8` | `rgba(255,255,255,0.10)` |
| `--border-strong` | `#D1D3D8` | `rgba(255,255,255,0.16)` |
| `--border-divider` | `--divider` | `rgba(255,255,255,0.08)` |

### 2.7 Status

| Token | Solid | Soft fill |
|---|---|---|
| `--success` | `#27C961` | `--success-soft #E5FAEE` |
| `--warning` | `#F6C205` | `--warning-soft #FFFBE1` |
| `--danger` | `#EF1026` | `--danger-soft #FEE8EA` |
| `--danger-strong` | `#C90F22` | (text on danger-soft badge) |
| `--info` | `#1571F3` | `--info-soft #E7F1FE` |

Dark mode soft variants become low-opacity tints of the same hue.

### 2.8 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `8px` | chips, key chips, code blocks |
| `--radius-md` | `12px` | cards, tables, panels, inputs, icon buttons, tooltips, body container |
| `--radius-lg` | `16px` | modal, sheet (only) |
| `--radius-pill` | `9999px` | buttons, search, avatars, pill badges |

### 2.9 Shadows

| Token | Use |
|---|---|
| `--shadow-xs` | subtle lift (rarely) |
| `--shadow-sm` | popover, tooltip |
| `--shadow-md` | dropdown menu |
| `--shadow-lg` | dialog, sheet |
| `--shadow-xl` | drawer, large dialog |
| `--shadow-overlay` | modal scrim |

**Rule:** information surfaces (cards, tables) default to **no shadow** — separate with borders.

### 2.10 Layout

| Token | Value | Role |
|---|---|---|
| `--sidebar-width` | `200px` | fixed left sidebar |
| `--header-height` | `60px` | top header |
| `--header-pad-x` | `20px` | header horizontal padding |
| `--content-max` | `1280px` | body max width (incl. 40px padding) |
| `--body-pad` | `40px` | body padding |
| `--body-pad-bottom` | `120px` | body bottom padding |
| `--body-radius` | `12px` | body container radius |
| `--section-gap` | `60px` | vertical gap between body sections |

### 2.11 Breakpoints

| Range | Container padding | Sidebar |
|---|---|---|
| Mobile · 375–767 | `20px` | off-canvas |
| Tablet · 768–1279 | `32px` | collapsible |
| Desktop · ≥1280 | `40px` | fixed 200 |

### 2.12 Spacing (4px grid)

`--space-1 4` · `--space-2 8` · `--space-3 12` · `--space-4 16` · `--space-5 20` · `--space-6 24` · `--space-8 32` · `--space-10 40` · `--space-12 48` · `--space-15 60`.

### 2.13 Motion

| Token | Value |
|---|---|
| `--duration-fast` | `150ms` |
| `--duration-base` | `200ms` |
| `--duration-slow` | `300ms` |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### 2.14 Typography

**Pretendard** only, 9 weights (100–900), local OTF files in `/fonts/`. Negative letter-spacing default (`-0.12` ~ `-0.22px`).

| Class | Spec |
|---|---|
| `.t-page-title` | 22/700, line 1.3, ls -.22 |
| `.t-section-title` | 20/600, line 1.3, ls -.20 |
| `.t-card-title` | 18/600, line 1.4, ls -.18 |
| `.t-body` / `.t-body-strong` | 16/400 \| 600, line 1.5, ls -.16 |
| `.t-small` | 14/400, line 1.5, ls -.14 |
| `.t-button` | 14/600, line 1.5, ls -.14 |
| `.t-caption` | 12/400, line 1.4, ls -.12 |

---

## 3. Iconography

- **Library:** Phosphor Icons (`@phosphor-icons/web@2.1.1`).
- **Default weight:** Fill (`ph-fill ph-house`).
- **Regular** (`ph ph-house`) only for de-emphasis or specific outlined contexts.
- **Default size:** 24px. Sidebar menu icons 18px. Header action icons 20px in a 36px square.
- **Color:** uses `currentColor` — set via parent `color`.
- **Custom icons** allowed only when no Phosphor equivalent exists; match Phosphor's stroke weight when commissioning.

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">
<i class="ph-fill ph-house"></i>
```

---

## 4. Components

### 4.1 Buttons

All pill-shaped (`border-radius: 9999px`). Variant chooses intent; size chooses weight.

**Variants:**
| Variant | Light bg | Light fg | Use |
|---|---|---|---|
| `primary` | `#2D64FA` | white | main action — one per flow |
| `soft` | `#EAF0FE` | `#2D64FA` | secondary emphasized action |
| `secondary` | `#EFF1F4` | `#3C3F47` | cancel, close, low emphasis |
| `ghost` | transparent + `#E4E5E8` border | `#3C3F47` | inline within cards |
| `danger` | `#EF1026` | white | destructive, irreversible |
| `link` | transparent | `#1571F3` | inline text navigation |

Hover (light): primary → `#5985FB`, soft → `#D6E2FD`, secondary → `#E4E5E8`, ghost → `#F6F7F9`, danger → `#FF4759`.

**Sizes:**
| Size | Height | Padding-x | Font |
|---|---|---|---|
| `sm` | 32 | 20 | 12.5 |
| `md` (default) | 36 | 20 | 14 |
| `lg` | 48 | 24 | 16 |

**Dark mode swap:** primary uses `#4B7BFF` and hovers to `#2D64FA`. Soft becomes a `rgba(75,123,255,0.40)` fill (hover `0.55`) — visible blue tint on dark surfaces, same intensity used by selected cards and primary count badges. Secondary 다크 배경은 `#3C3F47` (gray-700) → 호버 `#4F535D`.

### 4.2 Badges

Count pill 단일 컴포넌트. 모양: radius 9999 (pill), padding 2/8, 높이 hug, font 11/700.

| Variant | Light bg / text | Dark bg / text | Use |
|---|---|---|---|
| default (danger) | `#EF1026` / `#FFFFFF` | `#FF4759` / `#FFFFFF` | 알림 등 강조가 필요한 카운트 |
| primary (선택) | `#EAF0FE` / `#2D64FA` | `rgba(75,123,255,0.40)` / `#4B7BFF` | 활성 탭 · 선택 상태의 카운트 (primary-soft fill) |
| muted | `#E4E5E8` / `#3C3F47` | `#3C3F47` / `#D1D3D8` | 비활성 · 보조 카운트 |

### 4.3 Status badges

Soft pill with icon + label. radius 9999, padding 4/10, font 12/700.

| Status | Soft bg (light) | Text (light) |
|---|---|---|
| success | `#E5FAEE` | `#178F44` |
| warning | `#FFFBE1` | `#F6C205` |
| info | `#E7F1FE` | `#1571F3` |
| danger | `#FEE8EA` | `#C90F22` (= `--danger-strong`) |
| muted | `#EFF1F4` | `#6D717E` |

In dark mode soft becomes an alpha tint and text uses the lighter sibling (e.g. `#3DDB78` for success).

### 4.4 Inputs

- **Text input:** `min-height: 44px`, padding `0 18px`, radius `9999px`, border `1px var(--border-default)`. Focus → border `var(--primary)`. Placeholder `var(--fg-subtle)`.
- **Search:** same pill with a subtle filled bg — `#EFF1F4` light / `#25272D` dark (gray-800은 다크 페이지 위에서 인풋이 뚜렷하게 식별되도록 한 선택). On focus → bg `var(--bg-content)` (light) + primary border (라이트), 다크는 배경 유지 + primary border만.
- **Required label:** asterisk colored `var(--danger)`.

### 4.5 Tabs

Underline tabs with count pill.

- Each tab: padding 8/12, gap 8 between label and count, no border-radius, font 14/400.
- **Inactive:** color `#25272D` (gray-800). No border. Hover → `#16171B`.
- **Active:** color `#16171B`, font-weight 700, `border-bottom: 2px solid var(--primary)`.
- **Count pill** inside tab: padding 2/8, hug height, radius pill. Inactive bg `#EFF1F4` + text `#25272D`. Active bg `var(--primary)` + white.

### 4.6 Cards

- bg `var(--bg-surface)` (`#F6F7F9` light) — **no border**, radius `12px`.
- Hover → light `#EFF1F4` (gray-100, 톤 키마 이지 진해짐), dark `#2D2F35` (gray-800 위에 이지 밝아 키, lift 느낌). 양쪽 모두 미묘한 변화.
- Selected → bg `var(--primary-soft)` (no border change).
- **Wide variant** — 48px thumb + body(name + desc) + counters + action button on one row. **`min-width: 480px`** to keep the row from breaking on narrow viewports.
- **Vertical variant** — 64px thumb stacked with category/name at top, 2-line description below, counters + button in a footer row. **`min-width: 280px` · `max-width: 480px`**.
- Counters: custom yellow thumb-up SVG + `ph-fill ph-user`, never chat-circle for user count.

### 4.7 Table

- **Outer wrapper:** radius 12, padding 4 (all sides). Light bg `--bg-muted` (`#EFF1F4`) / **Dark bg `#25272D` (gray-800) — outer is the lighter "tray".**
- **Header:** no bg fill, no border, text `--fg-subtle` (`#9CA0AB`), font 13/600. Sortable indicator: `ph-fill ph-caret-down`.
- **Body container:** radius 12. Light bg `--bg-content` (white) / **Dark bg `#16171B` (gray-900) — body sits deeper than the outer.**
- **Row:** padding `12px 16px` (no padding on container).
- **Separators:** 1px line, **full row width** (no inset). Light `#EFF1F4` / Dark `rgba(255,255,255,0.08)` (subtle).

### 4.8 Modal

- Width content-dependent (e.g. 320–540), radius `16px` (lg), padding 22–24, background `var(--bg-content)`.
- **Layout:** modal is a vertical stack with **`gap: 32px`** between `header` and `actions`. The `header` is its own stack containing `title + description` with **`gap: 12px`**.
- Shadow: `var(--shadow-lg)`. **No border** in dark mode — shadow alone separates.
- Title 19–20/700, body 13.5/400 in `var(--fg-muted)`.
- Actions right-aligned: secondary (cancel) then primary (confirm). Only one primary action.
- Backdrop: `rgba(0,0,0,0.20)` light / `0.50` dark.

---

## 5. Layout reference

```
┌──────────────┬─────────────────────────────────────────────────────┐
│              │  Header  60px · padding-x 20                          │
│   Sidebar    │  ───────────────────────────────────────────────── │
│   200px      │                                                       │
│   bg-surface │  Body  · max 1280 · padding 40/40/120                 │
│              │  bg-content                                           │
│              │                                                       │
│              │  ─ section gap 60 ─                                 │
│              │                                                       │
└──────────────┴─────────────────────────────────────────────────────┘
```

- Sidebar top 60px: logo block (bg-surface). Below: nav rail.
- Header: breadcrumb on left; right side has light/dark toggle, notification, profile (36×36 pill, `--primary` bg).
- Profile circle text: 12/700.

---

## 6. Voice & content

- Polite-formal Korean. Friendly, not casual.
- Address user by name + 님 ("박민영 님").
- Buttons: verb in `-기` (gerund) form for primary actions ("내가 앱 만들기"). Imperative `-요` for steps.
- No emoji. No `★ • ▪` Unicode glyphs — use SVG / Phosphor.
- Numbers stay digits ("2026년 5월 15일 목요일").

---

## 7. Quickstart

```html
<!doctype html>
<html lang="ko" data-theme="light">
<head>
  <link rel="stylesheet" href="foundation.css">
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">
</head>
<body>
  <button style="
    background: var(--primary);
    color: var(--fg-on-primary);
    border: 0;
    border-radius: var(--radius-pill);
    padding: 10px 20px;
    font: 600 14px/1 var(--font-sans);
    letter-spacing: -0.14px;
    cursor: pointer;
  ">
    <i class="ph-fill ph-plus"></i> 새 프로젝트
  </button>
</body>
</html>
```

To switch to dark mode: set `data-theme="dark"` on `<html>` (or any ancestor). All tokens flip automatically.

---

_AXHub Design System v2.0 · 2026-05_
