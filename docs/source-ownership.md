# Source Ownership Strategy

Project: Terminal Engine / Terminal Applications  
Decision date: 2026-07-22
Last updated: 2026-07-23

## Decision

Keep `src/ConsoleAdventure` and `src/RTSim` as git submodules for developer source provenance, pinned by the root repository gitlinks. Do not vendor the source during this task.

For production deployment, do not depend on Stackport initializing submodules and do not depend on the host checkout's `.git` directory being present in the Docker build context. The later Docker task must provide the exact source revisions listed below before running the frontend build, either by fetching reachable commits in the Docker build stage or by choosing another deterministic documented strategy.

The root `prebuild` script that ran `git submodule update --recursive --remote` has been removed. `npm run build` must not move terminal app source code by following remote branches.

## Current Source Ownership

Both terminal app folders are real git submodules. The root tree records them as `160000` gitlinks:

| Path | Repository | Pinned commit | Notes |
| --- | --- | --- | --- |
| `src/ConsoleAdventure` | `https://github.com/vtmattedi/ConsoleAdventure` | `ea33111dea4fd0fd0d8a139280c8ebcd96350df6` | Local task 16 submodule commit. Not advertised by `origin` during verification on 2026-07-23. |
| `src/RTSim` | `https://github.com/vtmattedi/rtsim.git` | `eb5f1901c792074ecf0b44f0e6f3099d97c6ff5d` | Local task 17 submodule commit. Not advertised by `origin` during verification on 2026-07-23. |

The submodule URLs are declared in `.gitmodules`.

## Local Developer Workflow

For a normal local checkout, initialize the pinned submodules explicitly:

```powershell
npm run sync:submodules
```

This runs:

```powershell
git submodule update --init --recursive
```

That command checks out the exact commits pinned by the root repository. It does not move to remote branch tips.

To intentionally update a terminal app source:

1. Enter the submodule folder.
2. Fetch/check out the desired commit or branch.
3. Run the app/build checks relevant to the change.
4. Commit the updated gitlink in the root repository.
5. Update this document if the pinned commit changes.

Do not use `git submodule update --remote` in root build scripts. Remote branch advancement must be a deliberate source update, not a side effect of `npm run build`.

## Stackport And Docker Workflow

Stackport will not initialize git submodules when it pulls the repository. A Stackport-style non-recursive checkout may contain empty submodule directories or no usable submodule contents.

The Docker task should fetch the pinned public source into `src/ConsoleAdventure` and `src/RTSim` during the build stage, before `npm install` / `npm run build` needs imports from those folders. The Docker build should install only the minimal Git tooling needed for this source fetch.

Suggested build-stage commands:

```sh
git clone --no-checkout --filter=blob:none https://github.com/vtmattedi/ConsoleAdventure src/ConsoleAdventure
git -C src/ConsoleAdventure fetch --depth=1 origin ea33111dea4fd0fd0d8a139280c8ebcd96350df6
git -C src/ConsoleAdventure checkout --detach ea33111dea4fd0fd0d8a139280c8ebcd96350df6

git clone --no-checkout --filter=blob:none https://github.com/vtmattedi/rtsim.git src/RTSim
git -C src/RTSim fetch --depth=1 origin eb5f1901c792074ecf0b44f0e6f3099d97c6ff5d
git -C src/RTSim checkout --detach eb5f1901c792074ecf0b44f0e6f3099d97c6ff5d
```

These commands are the intended shape once the pinned commits are reachable from their remotes. As of 2026-07-23, the current pins are local task commits and `git ls-remote origin <sha>` returned no match for both repositories. Docker/Stackport deployment is blocked until task 20 resolves this with one deterministic path:

- Push the pinned commits to their public upstream repositories.
- Vendor the needed source into this repository with attribution.
- Publish the terminal app source as package/workspace dependencies.
- Change the root pins and app imports to reachable public commits that contain the required lifecycle fixes.

The Docker task may choose equivalent commands or a different documented strategy, but the important constraints are:

- Fetch exact commits, not floating branch names.
- Do not run `git submodule update --remote`.
- Do not assume the host checkout was cloned with `--recursive`.
- Do not assume `.git` is available in the Docker build context.
- Do not require runtime secrets for source retrieval.

## Credentials And Network Requirements

The selected source repositories are public GitHub repositories, but the current root pins are not yet reachable from those remotes.

Verification on 2026-07-23:

- `git -C src/ConsoleAdventure ls-remote origin ea33111dea4fd0fd0d8a139280c8ebcd96350df6` returned no match.
- `git -C src/RTSim ls-remote origin eb5f1901c792074ecf0b44f0e6f3099d97c6ff5d` returned no match.

No GitHub credential is required if the current commits are pushed to the public upstream repositories. Docker builds will need outbound HTTPS access to GitHub and Git installed in the build stage if the build-stage fetch strategy remains selected.

If either repository becomes private or a pinned commit stops being fetchable by SHA, deployment is blocked until one of these happens:

- A safe Stackport/Docker credential path is defined.
- The needed source is vendored into this repository with attribution.
- The terminal app is published as a package/workspace dependency available during `npm install`.
- The pin is moved to a reachable public commit/tag and committed in the root repository.

## Build Behavior

Root build behavior after this decision:

- `npm run build` builds whatever source is already present in `src/ConsoleAdventure` and `src/RTSim`.
- `npm run build` does not fetch remote branches.
- `npm run sync:submodules` is the explicit developer command for local source initialization.
- Production Docker must populate the submodule paths with the pinned commits before invoking the frontend build.

## Follow-Up Responsibilities

Task 20, Docker Stackport Prep, must implement this source strategy in the Dockerfile or update this document if a different deterministic strategy is chosen before Docker work begins.

Task 21, Stackport Handoff, must state that Stackport does not initialize submodules and must document how the final Docker build obtains these exact sources.
