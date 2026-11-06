# Model tools (Tripo → game)

These scripts turn raw Tripo exports (30–70 MB, 4K textures) into the small GLBs the game loads. The `tripo-model-intake` skill drives them; you can also run them by hand.

One-off setup: `cd tools/models && npm install`. `render.mjs` also needs Playwright and Chromium, so it runs in Claude's cloud workspace. GitHub Pages never sees this folder, because the deploy step deletes `tools/`.

| Script | What it does |
|---|---|
| `scan.mjs` | Lists every Tripo export under `images/` and `chars/` as NEW, CHANGED, done or ignored, using `manifest.json`. `--record` marks a source as baked and `--ignore` skips it from then on. |
| `bake.mjs` | Cleans, simplifies and normalises a model, and shrinks its textures. `--kind char` also splits it into the six rig parts. |
| `split.mjs` | The character splitter, used by `bake.mjs`. Cuts are auto-detected; override them with `--neck`, `--hip` and `--armx` (metres on the 3.03 m model). |
| `render.mjs` | Makes preview PNGs, a colour-coded parts check (`--parts`) and the menu cards `_p`, `_x` and `_c` `.webp` (`--cards`). |

## Kinds and where they go

| Kind | Default tris / texture / height | Output | Loader in index.html |
|---|---|---|---|
| `char` | 20k / 1024 px / 3.03 m, split into torso, head, armL, armR, legL and legR | `chars/<id>.glb` plus `chars/<id>_p/_x/_c.webp` | `loadPartsGLB`, `MODEL_IDS`, `CHARS` |
| `tree` | 8k / 512 px / 1 m (scaled in-game) | `models/trees/<id>.glb` | `loadTree`, `TREE_IDS` |
| `car` | 20k / 512 px / real size (scaled by length in-game) | `models/cars/<kind>.glb` | `loadVehicle`, `VEH_CFG` |
| `prop` | 8k / 512 px / 1 m | `images/Landscape/baked/<set>/<id>.glb` or `models/<id>.glb` | the loader for that map's props |

Characters face +z, with armL and legL on −x. The head pivot is fixed at y = 2.01 by the rig in `buildCharacter`.

## Checks before committing

- The `--parts` render shows clean cuts: the head is amber, the arms red and green, the legs purple and teal, and the torso blue with no bits of arm or head in it.
- Each output file is under about 1 MB.
- `node tools/check.js` passes. The pre-commit hook runs it too.
