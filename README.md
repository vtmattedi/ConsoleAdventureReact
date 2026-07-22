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

Preview the production bundle:

```sh
npm run preview
```

## Source Ownership

`src/ConsoleAdventure` and `src/RTSim` are git submodules pinned by the root repository. `npm run build` does not fetch moving submodule branches.

See [docs/source-ownership.md](docs/source-ownership.md) for the deterministic source strategy that later Docker/Stackport work must follow.
