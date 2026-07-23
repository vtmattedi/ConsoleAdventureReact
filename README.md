# Terminal Applications

This repository publishes **Terminal Applications** at [terminal.mattediworks.com](https://terminal.mattediworks.com/).

Terminal Applications is a MattediWorks web catalog for console applications ported to the browser with React and xterm.js. The current public apps are:

- **Console Adventure**: a terminal fantasy RPG.
- **RTSim**: a discrete-time preemptive scheduler simulator.

The underlying terminal/runtime work is tracked as the **Terminal Engine** project. See [docs/terminal-engine.md](docs/terminal-engine.md) for the current engine boundary and browser/xterm port contract.

## Current Routes

- `/`: app catalog.
- `/console-adventure`: canonical Console Adventure route.
- `/game`: legacy alias that redirects to `/console-adventure`.
- `/rtsim`: RTSim route.

## Local Development

Install dependencies and initialize the pinned terminal app sources:

```sh
npm install
npm run sync:submodules
```

Run the Vite dev server:

```sh
npm run dev
```

Build the production bundle:

```sh
npm run build
```

Run the quality gates used during modernization:

```sh
npm run lint
npm run typecheck
npm test
```

Preview the production bundle:

```sh
npm run preview
```

## Source Ownership

`src/ConsoleAdventure` and `src/RTSim` are git submodules pinned by the root repository. `npm run build` does not fetch moving submodule branches.

See [docs/source-ownership.md](docs/source-ownership.md) for the deterministic source strategy that later Docker/Stackport work must follow.

## Dependency Baseline

The root app keeps runtime dependencies focused on React, React Router, xterm.js with the Fit addon, `react-xtermjs`, Bootstrap Icons, and the MattediWorks loading/icon stack (`lucide-react`, `gsap`, `@gsap/react`). React is on the current stable major. `@xterm/xterm` intentionally stays on the `5.5.x` line because `react-xtermjs` currently peers on `@xterm/xterm ^5.5.0`.

Lint covers the root Vite app and local MattediWorks integration files while ignoring the `src/ConsoleAdventure` and `src/RTSim` submodule sources. It currently exits successfully with two warnings for known `FitAddon` lifecycle cleanup in the terminal wrappers, which is scheduled for the terminal hardening tasks. TypeScript checking currently covers the active MattediWorks loading, theme, and i18n TypeScript entries.

## Theme System

The app supports `light`, `dark`, and `system` theme preferences through the MattediWorks `ThemeSelector`. The selected preference is stored in `localStorage` under `terminal-applications-theme`. On load, `index.html` applies `data-theme`, `data-theme-preference`, and a `light`/`dark` class to `document.documentElement` before the React bundle runs, which keeps first paint readable and lets CSS plus `MWLoading` react to theme changes.

Terminal emulator foreground/background palettes remain controlled inside the terminal wrappers for now, while the surrounding page and terminal frame use shared CSS variables.

## I18n Baseline

The app supports `en` and `pt-BR` locales through the MattediWorks `LanguageSelector`. The selected locale is stored in `localStorage` under `terminal-applications-locale`; when no saved preference exists, the app chooses `pt-BR` for Portuguese browser languages and `en` otherwise.

`index.html` applies `document.documentElement.lang` before the React bundle runs, and the React `I18nProvider` keeps that value synchronized after language changes. Translation data lives in `src/MattediWorks/translation/i18n.ts` as a typed `Record<Locale, Translation>` so missing locale fields are caught by TypeScript. Current shell, home/catalog, terminal page, loading, source-link, and not-found copy reads from the translation provider while project names remain unchanged.

## Project Content Model

Reusable project metadata lives in `src/content/projects.js`. It defines Terminal Engine, Console Adventure, and RTSim ids, route paths, source links, screenshots, tags, and localization keys. Home/catalog content, terminal page titles/source links, the Console Adventure fallback panel, and asset preloading read from this model instead of duplicating project details in page components.

Terminal Engine is modeled as a promoted home item with no route or source link. Console Adventure and RTSim are modeled as routed terminal applications with GitHub source links and screenshot assets. RTSim's content includes the supported scheduler algorithms: EDF, FCFS, HRRN, Priority, Round Robin, and SJF.

## Branding Assets

MattediWorks branding is served from local repository assets. `src/index.css` defines `@font-face` rules for the Sansation font files under `src/MattediWorks/assets/fonts/` and exposes shared font tokens used by the shell, home page, legacy header, and loading overlay.

The shell uses the MattediWorks mark, the home catalog includes the MattediWorks wordmark, and browser/manifest icons point to `/mattediworks-icon.svg`. The initial app boot uses `MWLoading` briefly on first render, with reduced-motion users receiving a static logo treatment instead of the SVG drawing animation. Old personal photo branding is no longer imported by the active shell/home asset graph.

## Visual System

The active app uses shared CSS variables for neutral light/dark surfaces, MattediWorks orange, and a secondary cyan accent. Common page headings, home action controls, terminal page layout, source links, narrow-width fallback panels, and terminal frames are class-driven rather than inline-styled.

Terminal frames use bounded width/height constraints and 8px radii so the xterm surfaces remain predictable across desktop and narrow viewports. The home and terminal pages intentionally stay modest until the later content-model and home-page revamp tasks.

## Terminal Engine Boundary

`docs/terminal-engine.md` documents the current source truth: RTSim contains the concrete `ConsoleEngine` implementation, while Console Adventure still uses its own `GameStates`/`GameState` runtime. Both apps share the same console/xterm porting contract for output, sizing, input, color handling, rendering, and resize behavior.

The home page presents Terminal Engine as the core project without adding a separate engine route. The project content model reuses that boundary instead of claiming both apps already share one extracted engine package.
