# Terminal Engine

Terminal Engine is the project narrative for the terminal-runtime work behind Terminal Applications. It is not yet one extracted package used by every app in this repository.

The current codebase has two related but separate terminal runtimes:

- RTSim contains the concrete `ConsoleEngine` implementation under `src/RTSim/Simulator/Engine/`.
- Console Adventure uses its own `GameStates` / `GameState` runtime and its own `src/ConsoleAdventure/Game/Base/ConsoleHelp.js`.

Both apps share the same porting idea: application code writes ANSI/text output through a singleton console helper, and the browser wrapper replaces the Node console functions with xterm.js functions.

## Current Boundary

RTSim is the app currently built on the `ConsoleEngine` implementation:

- `src/RTSim/Simulator/Simulator.js` imports `ConsoleEngine` from `src/RTSim/Simulator/Engine/Engine.js`.
- `Simulator` creates `new ConsoleEngine()`, sets a minimum terminal size with `setMinSize(60, 21)`, targets 60 FPS with `targetFPS(60)`, registers scenes, and delegates input through `Engine.handleInput(input, modifiers)`.
- RTSim scenes under `src/RTSim/Simulator/Scenes/` import the engine `BasicConsole` helper and render frames through the engine scene contract.

Console Adventure is separate:

- `src/Components/ConsoleAdVentureWeb/ConsoleAdventureWeb.jsx` imports `BasicConsole` from `src/ConsoleAdventure/Game/Base/ConsoleHelp.js`, not from RTSim.
- `src/ConsoleAdventure/Game/Game.js` owns `GameStates`, input handling, menu state, battle state, and render/rerender throttling.
- `src/ConsoleAdventure/Game/GameState.js` defines the state object shape: `onCreate`, `render`, `changeState`, `onSelect`, and `rerender`.

Public copy should therefore say that Terminal Engine is the shared engineering effort and porting contract behind the catalog. It should not say that both Console Adventure and RTSim are already powered by the same `ConsoleEngine` class.

## RTSim Engine Inventory

`src/RTSim/Simulator/Engine/ConsoleHelp.js`

Provides the singleton `BasicConsole`, ANSI control helpers, default color constants, text decorations, centered text helpers, sprite merging, safe substring handling for ANSI-colored text, cursor movement, title setting, screen clearing, line clearing, figlet rendering, and width/height measurement. In Node it writes to `process.stdout`; in the browser, the wrapper overrides methods against xterm.js.

`src/RTSim/Simulator/Engine/Engine.js`

Provides `ConsoleEngine`, a singleton scene renderer with scene registration, scene history, scene navigation, camera offset, minimum terminal-size checks, debug overlay support, message-box compositing, and a target-FPS render interval. It draws the current scene into a text frame, crops it to the terminal viewport, overlays message boxes when needed, and writes the final frame through `BasicConsole`.

`src/RTSim/Simulator/Engine/Scenes.js`

Provides the base `Scene` class. A scene owns ordered `SceneObject` instances, exposes lifecycle hooks (`onEnter`, `onExit`), handles input, can mark itself finished with a navigation target, and draws its objects into a frame.

`src/RTSim/Simulator/Engine/SceneObject.js`

Provides positioned drawable objects with `x`, `y`, and `z` coordinates plus a `getValue` function returning a text sprite. It also includes a basic ASCII square helper.

`src/RTSim/Simulator/Engine/messageBox.js`

Provides the singleton `MsgBoxHandler`. It raises modal text boxes over the current frame, handles left/right/select input, supports option callbacks, and includes open/close animation state used by the engine during draw composition.

`src/RTSim/Simulator/Engine/Symbols.js`

Defines arrow, delta, and enter symbols with an ASCII-safe switch. The Unicode path currently displays mojibake in this environment, so encoding should be checked before release.

`src/RTSim/Simulator/Engine/Assets/Assets.js`

Contains console ASCII/ANSI logo and sprite helpers, including MattediWorks and Console Adventure logo text plus animated/painted variants.

`src/RTSim/Simulator/Engine/Assets/Fonts.js` and `small.flf`

Contain the custom small figlet data and text-rendering helpers consumed by `ConsoleHelp.getFigLet`.

## Browser Port Contract

The browser wrappers adapt the Node-oriented terminal helpers to xterm.js. A future shared port layer should make these requirements explicit instead of relying on ad hoc reassignment.

Required output methods:

- `BasicConsole.write(text)` must write raw ANSI/text output to xterm.
- `BasicConsole.clear_screen()` must clear the xterm buffer/screen in the way the app expects.
- `BasicConsole.getWidth()` must return the current terminal column count.
- `BasicConsole.getHeight()` is required by RTSim and any engine scene using vertical layout.
- `BasicConsole.show_cursor(false)` is used by both apps to hide the terminal cursor during rendered UI.

Terminal setup:

- Create one xterm instance per mounted wrapper.
- Load `FitAddon` before measuring columns/rows.
- Set xterm options for `convertEol`, font size, cursor style, cursor blink, scrollback, and readable foreground/background colors.
- Fit once after setup and again after viewport resize.

Input normalization:

- Convert the browser/xterm key event into app-level strings such as `enter`, `space`, `esc`, `arrowup`, `arrowdown`, `arrowleft`, and `arrowright`.
- Preserve modifier state where the app needs it. RTSim passes `{ ctrl, shift, alt }` to engine scenes.
- RTSim currently handles shifted arrows, Ctrl+C for exit, and Ctrl+D/debug/current behavior.
- Console Adventure currently keeps Ctrl+B for Dev Mode and sends lowercase `key.domEvent.key` values to `Game.handleInput`.

Rendering:

- RTSim uses `ConsoleEngine.targetFPS()` and an internal interval to redraw scenes.
- Console Adventure renders on input through `GameStates.render()` / `GameStates.rerender()` with slow-running throttling.
- A future shared layer should make render ownership explicit so remounting does not leave old intervals or singleton state active.

Resize behavior:

- The wrapper must call `FitAddon.fit()` and then tell the app runtime to redraw or resize.
- RTSim calls `Engine.resize()`, which enforces the configured minimum terminal size and can lock rendering behind a warning.
- Console Adventure calls `GameStates.rerender()` after fitting.
- Both current wrappers assign `window.onresize` globally; later port-hardening tasks should replace this with scoped listeners and cleanup.

Color and theme:

- Terminal app colors are emitted as ANSI sequences and interpreted by xterm.
- Page light/dark theme controls the surrounding frame, not the internal game palettes yet.
- Any future xterm theme sync must preserve app readability and game-specific palettes.

Lifecycle and cleanup:

- `BasicConsole`, `ConsoleEngine`, `GameStates`, and `MsgBoxHandler` are singleton-oriented.
- Current wrappers set up key listeners and resize handlers but do not yet dispose them on unmount.
- Later hardening tasks should make initialization, disposal, and singleton reset behavior deterministic.

## Home Page Copy Guidance

Good copy:

- "Terminal Engine is the runtime and browser-porting effort behind Terminal Applications."
- "RTSim currently contains the scene engine; Console Adventure uses a separate game-state runtime with the same console/xterm porting contract."
- "The shared direction is a reliable bridge between ANSI terminal applications and browser-hosted xterm surfaces."

Avoid:

- "Both apps are built on the same RTSim ConsoleEngine."
- "Terminal Engine is already an extracted package."
- "Console Adventure has been migrated to the RTSim scene engine."

## Route Boundary

Terminal Engine has no user-facing route in the current site. It should be promoted on the home/catalog page as the core project and used by future content-model work, but `/console-adventure` and `/rtsim` remain the only app routes.
