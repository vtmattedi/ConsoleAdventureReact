# Terminal Applications

This repository publishes **Terminal Applications** at [terminal.mattediworks.com](https://terminal.mattediworks.com/).

Terminal Applications is a MattediWorks web catalog for console applications ported to the browser with React and xterm.js. The current public apps are:

- **Console Adventure**: a terminal fantasy RPG.
- **RTSim**: a discrete-time preemptive scheduler simulator.

The underlying terminal/runtime work is tracked as the **Terminal Engine** project.

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

Lint covers the root Vite app and local MattediWorks integration files while ignoring the `src/ConsoleAdventure` and `src/RTSim` submodule sources. It currently exits successfully with two warnings for known `FitAddon` lifecycle cleanup in the terminal wrappers, which is scheduled for the terminal hardening tasks. TypeScript checking currently covers the active MattediWorks loading TypeScript entry; future theme and i18n tasks will expand it after their missing provider modules are added.
