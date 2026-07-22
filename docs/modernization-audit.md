# Modernization Audit

Project: Terminal Engine / Terminal Applications  
Audit date: 2026-07-22  
Workspace: `D:\Console\ConsoleAdventureReact`

## Purpose

This audit records the current repository shape before behavior-changing modernization work begins. Later tasks should use it as the baseline for route compatibility, terminal app behavior, source ownership, asset handling, build risks, and deployment assumptions.

No app behavior was changed for this task.

## Current Repository Snapshot

The root project was migrated from Create React App to Vite in task 4:

- Root package name was renamed to `terminal-applications` in task 3.
- Runtime script is `npm run dev`, backed by `vite`.
- `npm start` is kept as an alias for `vite`.
- Production script is `npm run build`, backed by `vite build`.
- Production preview script is `npm run preview`, backed by `vite preview`.
- `test`, `lint`, and `typecheck` are placeholders until dependency hygiene.
- At audit time, root `prebuild` ran `git submodule update --recursive --remote`. Task 2 removed that floating build hook and added `npm run sync:submodules` for explicit pinned submodule initialization.
- The lockfile is `package-lock.json`.

The repository currently contains two terminal app source trees as git submodules:

- `src/ConsoleAdventure`
  - URL: `https://github.com/vtmattedi/ConsoleAdventure`
  - Checked out at `f7e977f` during this audit.
  - `package.json` declares `"type": "module"` and version `0.2.2`.
- `src/RTSim`
  - URL: `https://github.com/vtmattedi/rtsim.git`
  - Checked out at `3e5c571` during this audit.
  - `package.json` declares `"type": "module"` and version `0.2.2`.

Root git status at the start of the audit showed `src/MattediWorks/` as untracked. Task 4 brought those files into the Vite app state, and task 5 added the runtime dependencies needed for the loading asset component to compile when imported.

Task 2 source ownership decision is recorded in `docs/source-ownership.md`: keep the submodules as developer provenance, do not update them during `npm run build`, and require the later Docker build to fetch exact public commits for Stackport-style non-recursive checkouts.

## Current Routes

Routes are defined in `src/index.jsx` with `createBrowserRouter`.

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `src/home.jsx` | Home/catalog page with buttons for Console Adventure and RTSim. |
| `/console-adventure` | `src/game.jsx` | Canonical Console Adventure route. |
| `/game` | redirect | Legacy alias that redirects to `/console-adventure`. |
| `/rtsim` | `src/rtsim.jsx` | RTSim route. |
| `*` | `src/Components/AppShell/NotFound.jsx` | Simple not-found page with home navigation. |

The current modernization route map is:

- `/`: Terminal Applications home/catalog.
- `/console-adventure`: canonical Console Adventure page.
- `/game`: legacy alias or redirect to `/console-adventure`.
- `/rtsim`: RTSim page.
- `*`: not-found page that returns users to `/`.

## Current App Shell

`src/index.jsx` renders:

- `React.StrictMode`
- `RouterProvider`

The router renders `App` as the root layout route.

Task 6 replaced the old pass-through `src/App.jsx` branches with a single shell:

- It imports Bootstrap CSS and Bootstrap Icons globally.
- It wraps routes in `<div className="bgDiv">`.
- It renders `src/Components/AppShell/AppShell.jsx`, which owns shared brand, primary route navigation, back control, disabled theme/language placeholders, asset preloading, and the route outlet.
- Terminal-specific responsive behavior remains in terminal pages.

This is the main path for future branding, theme, i18n, and loading integration.

## Current Pages And Shared Components

### Home

`src/home.jsx` currently:

- Displays `Terminal Applications` as the page title.
- Uses the shared app shell for global navigation and keeps a local page title in the catalog content.
- Navigates to `/console-adventure` for Console Adventure.
- Navigates to `/rtsim` for the scheduler simulator.
- Uses inline styles and Bootstrap icon classes.
- Uses `src/Frontphoto.png` for mobile visual/profile treatment.
- Uses a local `resize` listener.
- Contains visible copy typo/risk: `developped`.

### Console Adventure Page

`src/game.jsx` currently:

- Imports `Info`, `ConsoleAdventure`, and floating nav `H`.
- Imports `use` from React even though it is unused/invalid for this project.
- Tracks width with a local `resize` listener.
- Shows `Info` when width is `<= 1040`.
- Shows the terminal wrapper when width is `> 1040`.
- Shows a text-like GitHub label, but it is not an actual link.
- Uses `/console-adventure` as the canonical route while `/game` redirects to it.

### RTSim Page

`src/rtsim.jsx` currently:

- Renders title `RTSim`.
- Renders the RTSim terminal wrapper unconditionally.
- Shows floating nav `H`.
- Shows a text-like GitHub label, but it is not an actual link.
- Has no top-level narrow-width fallback equivalent to Console Adventure.

### Header

`src/Components/Header/Header.jsx` currently:

- Uses `react-icons/fa` for GitHub and LinkedIn icons.
- Uses the shared asset registry for `Frontphoto.png`.
- Tracks width with a local `resize` listener.
- Uses hover state to reveal a personal/profile card.
- Uses fixed positioning for title layout in CSS.

### Info

`src/Components/Info/Info.jsx` currently:

- Provides the Console Adventure narrow-width fallback.
- Uses the shared asset registry for five Console Adventure screenshots.
- Links to `https://www.github.com/vtmattedi/consoleadventure`.
- Contains old Console Adventure-focused publication copy.

### App Shell Navigation

`src/Components/AppShell/AppShell.jsx` and `src/Components/AppShell/AppShell.css` currently:

- Provide the shared brand/home control, route navigation, back control, and disabled theme/language placeholders.
- Navigate to `/`, `/console-adventure`, and `/rtsim`.
- Keep `/game` as a redirect-only legacy alias.
- Use Bootstrap icon class names already loaded by the app shell.

## Terminal Wrappers

### Console Adventure Wrapper

`src/Components/ConsoleAdVentureWeb/ConsoleAdventureWeb.jsx` currently:

- Uses `react-xtermjs`, `@xterm/xterm`, and `@xterm/addon-fit`.
- Creates `new FitAddon()` on every React render.
- Uses `setupOnce` to run setup only once after xterm instance creation.
- Overrides `ConsoleAdventure/Game/Base/ConsoleHelp.BasicConsole` methods:
  - `getWidth`
  - `write`
  - `clear_screen`
- Creates `new Game()`.
- Sets `GameStates.setSlowRunning(20)`.
- Mutates `DefaultColors` and reloads `GameColors`.
- Handles Ctrl+B as Dev Mode toggle.
- Normalizes space to `space`; other keys use `key.domEvent.key.toLowerCase()`.
- Overrides `game.current.exitTheGame` with a goodbye screen and `Press F5 key to restart.`
- Assigns `window.onresize` globally.
- Does not dispose the xterm `onKey` subscription on unmount.
- Does not restore or remove the global `window.onresize` assignment on unmount.

The wrapper depends on singleton game/console state, so route changes and React StrictMode need careful lifecycle handling in later tasks.

### RTSim Wrapper

`src/Components/RTSimWeb/rtsim.jsx` currently:

- Uses `react-xtermjs`, `@xterm/xterm`, and `@xterm/addon-fit`.
- Creates `new FitAddon()` on every React render.
- Overrides `RTSim/Simulator/Engine/ConsoleHelp.BasicConsole` methods:
  - `getWidth`
  - `getHeight`
  - `write`
  - `clear_screen`
- Creates `new Simulator()`.
- Calls `sim.current.setupExit(...)` to reset simulator state.
- Normalizes escape, enter, space, uppercase/shift, Ctrl+C, Ctrl+D, arrows, and shifted arrows.
- Logs every normalized input and modifier object with `console.log(input, modifiers)`.
- Assigns `window.onresize` globally.
- Does not dispose the xterm `onKey` subscription on unmount.
- Does not restore or remove the global `window.onresize` assignment on unmount.

The exit reset currently mutates engine internals directly and should be reviewed against the actual `ConsoleEngine` properties before hardening.

## Terminal Engine Findings

RTSim contains the current engine implementation under `src/RTSim/Simulator/Engine/`.

Key engine files:

- `ConsoleHelp.js`
  - ANSI control sequences, color helpers, text formatting, centering, sprite merging, cursor control, width/height access, and console write/clear abstractions.
  - `BasicConsole` is a singleton designed to be ported by overriding methods for non-Node terminals such as xterm.js.
- `Engine.js`
  - `ConsoleEngine` singleton.
  - Maintains scenes, scene history, camera position, target FPS render interval, debug state, resize lock, and message box overlay.
  - Draws the current scene into the terminal using the console helper.
- `Scenes.js`
  - Base `Scene` class with objects, lifecycle hooks, input handling, finished/navigation state, and default drawing.
- `SceneObject.js`
  - `SceneObject` position/value abstraction plus basic square object helper.
- `messageBox.js`
  - Singleton message box handler with options, selection, open/close animation, and overlay text composition.
- `Symbols.js`
  - Arrow/delta/enter symbols with an ASCII-safe switch, but the current file displays mojibake characters in this environment.
- `Assets/Assets.js` and `Assets/Fonts.js`
  - ASCII/ANSI logo assets, custom small figlet data, and text rendering helpers.

Important boundary: the current site should not claim both terminal apps use the same RTSim `ConsoleEngine`. RTSim does. Console Adventure uses its own `src/ConsoleAdventure/Game/Base/ConsoleHelp.js` and `GameStates` model. Both apps share a similar porting contract through a singleton `BasicConsole`, but they are not yet one shared engine.

## Assets And Styling

Current tracked/public assets:

- Root `index.html`, public favicons, `manifest.json`, `site.webmanifest`, `robots.txt`, `logo192.png`, `logo512.png`, `logo-no-abackground.png`.
- Root `Assets/` contains React, xterm, Vercel, responsive, and width-warning assets used by old docs/copy.
- `src/Frontphoto.png` and `src/Components/Header/Frontphoto.png` support the current personal/header UI.
- Console Adventure image assets live in the `src/ConsoleAdventure` submodule.
- RTSim readme images live in the `src/RTSim` submodule.
- MattediWorks assets exist under `src/MattediWorks/`.
- `src/assets/terminalAssets.js` is the shared browser asset registry for current/future route assets: home/header front photos, Console Adventure screenshots and logo art, RTSim readme screenshots, MattediWorks logos/photo/fonts, and public favicon/manifest URLs.

Current styling:

- `src/index.css` owns most global page styles.
- Terminal wrappers have duplicated `Terminal.css` files.
- `Header`, `Info`, and `H` have separate CSS/module files.
- The current palette is mostly dark gray/blue with gradient background.
- There are many inline style blocks in page components.
- Cards/buttons currently use rounded 10px styling.

## MattediWorks Local Assets

The `src/MattediWorks/` folder currently includes:

- `assets/fonts/Sansation_*.ttf`
- `assets/images/logo.svg`
- `assets/images/logoWithName.svg`
- `assets/images/logo_white.png`
- `Components/ThemeSelector.tsx`
- `Components/LanguageSelector.tsx`
- `MWLoading/`
- `VM.jpg`

Integration risks:

- `ThemeSelector.tsx` imports `lucide-react` and `../hooks/useTheme`; `lucide-react` is installed, but the theme hook is still a future task.
- `LanguageSelector.tsx` imports `../translation/i18n`; that module is missing.
- `MWLoading.tsx` imports `gsap`, `@gsap/react`, `lucide-react`, and `logoWithName.svg?raw`; task 5 installed those packages and added `src/vite-env.d.ts` so Vite raw/static asset imports have project-level type support.
- These assets should still be treated as future integration inputs until the app shell/theme/i18n tasks wire them into visible UI.

## Dependency And Script Inventory

Current root dependencies:

- React: `react`, `react-dom`
- Routing: `react-router-dom`
- Terminal: `@xterm/xterm`, `@xterm/addon-fit`, `@xterm/addon-attach`, `@xterm/addon-webgl`, `react-xtermjs`
- Styling/icons: `bootstrap`, `bootstrap-icons`, `react-icons`
- Animation: `framer-motion`
- Vite: `vite`, `@vitejs/plugin-react`
- Test packages still present for later cleanup: `@testing-library/*`
- Vercel: `@vercel/analytics`, `@vercel/speed-insights`
- MattediWorks loading/icons: `lucide-react`, `gsap`, `@gsap/react`

Current scripts after task 4:

- `sync:submodules`: explicitly initializes pinned submodules for local development.
- `dev`: starts the Vite dev server.
- `start`: aliases the Vite dev server.
- `build`: builds with Vite.
- `preview`: previews the Vite production bundle.
- `test`: placeholder until a test runner is configured.
- `lint`: placeholder until a lint runner is configured.
- `typecheck`: placeholder until a typecheck runner is configured.

There is no real lint, typecheck, or test runner yet.

## Hosting And Publication Assumptions

Task 3 updated the root project identity baseline:

- Root README now presents `Terminal Applications`.
- Root README states that the repo publishes to `https://terminal.mattediworks.com/`.
- Root `package.json` and `package-lock.json` use package name `terminal-applications`.
- Root `index.html` title, description, theme color, and canonical URL target `Terminal Applications`.
- `public/manifest.json` and `public/site.webmanifest` use `Terminal Applications` / `Terminal Apps`.
- Source submodule readmes may still contain their own historical web links until those upstream projects are updated.
- README no longer presents Vercel as the host; Vercel Analytics/Speed Insight packages and imports still exist in app code for a later metadata/analytics cleanup task.

New WOI direction:

- Public site/product name should be `Terminal Applications`.
- WOI project and underlying engine narrative remain `Terminal Engine`.
- Production domain should be `terminal.mattediworks.com`.
- Deployment target later is Stackport.

Stackport risk:

- Stackport will not initialize/install git submodules when it pulls the repository.
- Task 2 removed the root build hook that fetched submodule remote branches during `npm run build`.
- A Stackport build context can still lack initialized submodule contents, so the later Docker task must fetch exact public commits in its build stage or revise the deterministic source strategy.

## Known Modernization Risks

- The app now builds with Vite; later tasks still need dependency hygiene and real lint/typecheck/test commands.
- Root `index.html` is now the Vite entry point; `public/index.html` was removed.
- The old root `prebuild` could change submodule code unexpectedly during production builds; task 2 removed it, and future tasks should not reintroduce floating source fetches.
- Submodule source may be missing in non-recursive clones and Stackport checkouts.
- Task 6 removed the unreachable/dead `src/App.jsx` branches and unused shell imports.
- Task 5 removed the invalid unused `{ use }` import from `src/game.jsx`.
- Task 5 added `src/assets/terminalAssets.js` to centralize browser image/font/SVG paths and keep Vite resolution explicit.
- Vite migration replaced runtime `require(...)` image usage in active React components; remaining `require(...)` calls are in legacy/source files not imported by the site.
- Both terminal wrappers assign `window.onresize` globally.
- Both terminal wrappers add xterm key handlers without disposing them on unmount.
- `new FitAddon()` is created during render in both terminal wrappers.
- RTSim wrapper logs every input to the browser console.
- Terminal apps rely on singleton console/game/engine state, so remounts can leak state if not reset carefully.
- `/game` is now a legacy redirect to `/console-adventure`.
- `/console-adventure` is the canonical Console Adventure route.
- A `*` not-found route now exists under the app shell.
- App tests are the default CRA placeholder and do not represent current UI.
- MattediWorks theme/language/loading files are present. Loading dependencies are installed; theme/language provider modules are still scheduled for later tasks.
- `src/RTSim/Simulator/Engine/Symbols.js` displays mojibake in this environment, so text encoding should be checked before release.
- Source submodule readmes still contain their own historical web links; root metadata has been moved to Terminal Applications at `terminal.mattediworks.com`.

## Proposed Migration Order Notes

Task order should stay sequential:

1. Keep this audit as the baseline.
2. Resolve source ownership before Docker/Stackport work.
3. Update product identity before broad UI changes.
4. Keep the Vite migration focused on build/runtime compatibility without redesigning routes/pages.
5. Fix imports/assets after Vite is in place.
6. Build the app shell and canonical route map.
7. Clean dependencies and developer scripts.
8. Add theme and i18n infrastructure.
9. Integrate MattediWorks branding and visual system.
10. Clarify engine content before the home page claims are rewritten.
11. Harden terminal wrappers after the shared terminal page shell exists.
12. Finish metadata, docs, Docker/Stackport handoff, and release QA.

## Must-Still-Work Checklist

Every later task should preserve or intentionally replace the following behavior:

- `/` renders a usable home/catalog.
- `/console-adventure` reaches Console Adventure.
- `/game` still reaches Console Adventure through the legacy redirect.
- `/rtsim` renders RTSim.
- Console Adventure starts in xterm, renders the main menu, accepts keyboard input, supports arrow/WASD-style navigation, accepts space/enter, and keeps Ctrl+B Dev Mode behavior.
- Console Adventure narrow-width fallback appears below the supported width threshold until a better responsive treatment replaces it.
- Console Adventure exit/goodbye path remains understandable.
- RTSim starts in xterm, renders simulator UI, accepts arrows, shifted arrows, escape, enter, space, Ctrl+C, and Ctrl+D/current debug behavior.
- RTSim can resize without becoming unreadable.
- Terminal wrapper unmount/remount does not accumulate key handlers, resize handlers, render intervals, or stale singleton state.
- Console Adventure screenshots/assets still render in fallback/content areas.
- RTSim readme screenshots/assets remain available for future content model usage.
- MattediWorks logo/font/loading assets are integrated only when their dependencies and providers exist.
- Root install/build scripts are deterministic and do not pull floating source during production builds.
- Stackport-style non-recursive checkouts either contain required source or fetch exact pinned source during Docker build.
- Public metadata names Terminal Applications at `terminal.mattediworks.com`.
