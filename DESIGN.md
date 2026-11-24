# imok 1v1 – Design memory

**Read this before any design change.** It is the single record of what Pete has decided the game should look and play like, so new chats don't drift from it or bring back things he's removed.

- **Part 1 – Current design rules**: the decisions in force today, by area. Where a later decision replaced an earlier one, only the latest is kept.
- **Part 2 – Never add back**: things that were removed on purpose.
- **Part 3 – Daily log**: what changed in the design each day, newest first, built from the commit history.

How to use it:
1. Before designing or changing anything, read Parts 1 and 2 for the area you're touching.
2. If a request contradicts a rule here, follow the new request (Pete's latest word wins), then update the rule here in the same push so it doesn't drift back.
3. README.md describes how things work in detail; this file records *what was decided and why it must stay that way*. If they disagree, ask Pete.

Updating: a scheduled task adds the day's entry to Part 3 (and adjusts Parts 1–2) at the end of each day, from that day's commits. Chats that make a design decision can also update it in the same commit. Pushing only this file does not redeploy the game.

Last updated: 2026-11-24

---

## Part 1 – Current design rules

### General look and feel
- What you can see is what stops a shot: no invisible blockers. Stairs walk as solid blocks, but bullets, throws and sight only meet the visible treads.
- Premium, realistic, not cartoony or toy-like. No confetti, no over-the-top sparks, no coloured particle squares/blocks on anything (hits, punches, respawns, double jumps, breaks).
- Breakables are everywhere: all upright glass (windows, glass walls, railings) breaks with one bullet, punch or blade hit and shatters into lots of tiny shards that fall and lie on the surface. Floor/roof glass (e.g. Railed roofs) stays tougher so one stray shot doesn't drop people through. Glass is thin (3 cm), very see-through, no tint, no outline.
- Explosive barrels go off from a single hit; cars blow up on the 3rd shot; shooting a mine sets it off for real. Every weapon (melee and crossbow included) breaks glass, barrels, mines and props. Throwables smash any glass they hit and carry straight on through it (no bounce, no blast). A thrown grenade sets off every barrel and mine inside its whole blast.
- Damaged buildings never show black zig-zag crack lines and never smoke.
- Stairs on every map: clear to go up and down, nothing near the top or bottom, small low guardrails, room at the foot.
- Climbing aids are white ladders (no stacked crates/boxes as hop-ups). Exception: Lagoon uses creative hop-ups, no ladders.
- A downed, crawling player must never visibly pass through solid blocks; thrown bodies never pass through solid objects.
- Show new maps (4 preview images), new characters and major visual changes to Pete before publishing.

### Maps
- Standard sizes: **Biggest** 120 × 90 m (sniping), **Big** 70 × 50 m, **Small** 40 × 30 m. Each map's size shows with its picture.
- Every map is available in every mode. Arena is always the last map. Street Life is selected when the game opens.
- One shop per map, near the middle (except Arena: against the middle of one end wall, 24 Nov).
- Spawns: on land (never in the sea), different each round, never the same spot twice in a row; in 1v1 nobody starts facing their opponent.
- Menu map pictures are HQ renders that always match the real map; map names in cinematic type; the map name shows as the match loads, before the countdown.
- New maps need creative navigation, platforms and height, not flat layouts.
- **Street Life** (Big, 70 × 50 m, downsized 24 Nov): only the 2 big buildings, turned sideways (fronts along the street) and bigger: the ARCADE (was the hospital; no hospital things; black roof (no star on the ridge), the home's black for its outside frames, loud dark clashing colours inside: red floor, blue wall, purple, teal, magenta; game machines round the walls on both floors; quiet trap music inside only, no machine sounds); a two-way, very fast zipline from the top of one roof to the top of the other, over the road (small deck on each ridge; stand on the pad for 1.5 s to ride) and the home (black frame and roof, yellow board cladding on every wall; homely moveable/destructible furniture), either side of the road; each has 2 floors only (glass ground floor, then the loft room + open terrace straight on top); white picket fence; Tripo trees outside the fence only; two box trucks only, parked and static (never drive), in two styles: SCOOPS pink ice-cream truck and GAME TRUCK black neon retro-gaming truck; white Victorian lantern street lights with smashable bulbs; no rooftop boxes/brown walls; small buildings' rooftop walls have glass middles.
- **Railed**: small and bare-bones: one live line with the Tripo train out of a lit tunnel (blinking front lights), two sheds, footbridge, walk-through shipping containers (glass inward side). Half-glass roofs you can fall through; the train runs at 22 m/s (doubled 24 Nov, so there's a real chance of getting hit); nothing hangs in mid-air (no strip light in the goods shed's roof hatch); chain-link + barbed wire fence; trees well outside the fence; illuminated signs. Goods Shed: one straight stair to the top, high tool shelves, glass front. Engine Shed: train waiting room (benches, departure boards, newspaper), glass front. Train head-on = blown to pieces.
- **Beach Please** (Big, 70 × 50 m, downsized 24 Nov): simple, modern, expensive. No grey blocks, logs, boats, picnic benches or boxes. Big classy Tiki Bar (glass, smashable bottles, roof reachable by ladder, shop inside in a corner); small hut at each end; colourful lookout stairs; no walkway or jetties (the sand runs straight into the sea); halved deck chairs/parasols along the shore; waves.
- **Arena**: floodlit night stadium with crowd; 4 evenly spaced pillars of the same size, one in the middle of each quarter of the floor (cut from 6, 24 Nov); wide double-height ramps on 2 sides; no red/blue on floor or pillars; floor and walkway decks in 5 m slabs (24 Nov, were 2 m tiles); trapdoors (24 Nov): any floor or walkway slab (never the ramps or the middle cross) can flash amber 3 times and drop open, and whoever is on it falls and is out; no marked hazard panels, so nobody can tell where the next one will be; breakable glass along walkways; shootable lamps/poles; 2 straight-edged portals in the pillars; the shop stands against the middle of the south end wall (not on the ramp in the middle).
- **Sky High** (rebuilt 24 Nov as an infinity-pool roof terrace): no helipad, no chopper (never add them back). Pool in the middle: a shallow flush pool with solid 1.8 m wooden walls on its two short ends (crouched you're hidden, standing you shoot over; the middle cover walls are the same height), no rails or glass on its long sides, wade in it. Raised sun decks 2.2 m up at both ends with real cover on top (solid parapet with a glass window, bar counter, sculpture, cabana booth with low solid walls), one wide flight of stairs up to each, and glass on their outer sides; teak cover walls and sculptures down the long sides; sculptures on solid plinths instead of trees (trees didn't work); no white loungers or open cabanas that give no cover. 2.1 m glass edge railing is the only edge barrier and smashes even on touch; falling off = "Man Down" and loses the round; white explosive barrels.
- **Lagoon** (Big, 70 × 50 m): one big rectangular deck over the lagoon, no water in the middle (rebuilt 24 Nov: the two-pavilion version felt small and tricky). High level at 4.6 m: a boardwalk along each short end, two wide straight flights of stairs up to each (low guardrails), and a high bridge from each boardwalk onto the shop canopy in the middle; all high-level railings and stair guardrails are polished shiny silver (classy promenade look). Shop under the walkable thatch canopy (also reached by a tiki totem each side); 1 tiki bar per long side with drum + barrel hop-ups to its roof; no ladders on Lagoon. Rope rails round the outer edge snap; lights and torches, Tripo boats; rogue waves. You can walk under the high end of every staircase (open steps). Boats and the seaplane always stay out on the water, never on the deck.
- **The House**: rooms with distinct colours/textures, brick outside, straight wide stairs, destructible furniture, shop against a wall. Open flow for speed (24 Nov): 4.4 m doorways, no inside glass partitions or hop walls (open archways instead), nothing standing in or beside any opening, straight runs through several rooms.
- **The Mansion** (Biggest, 2-floor maze): only front and back lawns accessible (sides closed); ladders to the roof; one-shot glass roof skylights; nothing covers windows or glass ceilings; jump-through windows; disco lights stay inside the disco room; garage with black textured walls, flickering lights, 2 dirt bikes on wall racks; built for fast flow: no inside glass walls (open archways instead), inside doorways 4.4 m wide, nothing solid within ~2 m of a doorway; hall of mirrors has its mirrors flat on the walls, floor clear; hot tubs with white stone surround, jets only, no ducks; must run smoothly with 8 players.

### Modes
- Duels (1v1, 2v2, Free for all), Rumble. 1v1 and 2v2 always use your own loadout (the Simple rules were removed on 24 Nov).
- Free for all: 2, 4, 6 or 8 players; timed 3/5/10 min, most kills wins; leaderboard shows top 3; bot falls off get no Man Down cinematic.
- Rumble: bats only, no armour; Speed Shoes pickup appears 10 s into each round.
- Free for all: straight kills, no downed state (1v1/2v2 keep downs and revives).
- Every gun is allowed on every map (no small-map weapon limits). The Reaper, Titan .50 and Phantom snipers stay in the code but aren't offered anywhere until Pete picks which, if any, to bring in.
- Collection is not part of this game: it was taken out on 24 Nov 2026 to be rebuilt as its own project in a separate folder and GitHub repo. Its last version here is tagged `collection-v1` (rules then: The Mansion, 8 players, start with fists, find SMGs/pistols/bats, 10 stars to win, cash in at the shop, going down costs 2 stars, dying loses all, 8+ stars outlined through walls and marked on minimaps). Don't add it back to imok 1v1.
- Planned: Basic 1v1 (guns only, no shop/lethals, same fixed loadout both sides); online play is peer-to-peer (host + 1 friend, rest bots).

### Weapons
- Style: realistic, detailed, premium finish with shine, trims and glow, never toy-like. Weapon previews/pictures always match the latest models.
- One gun and the bat (Pete, 24 Nov): you carry a single gun, picked from one list of 11, plus the bat. There is no secondary slot. The list, in order: M4 (all-round rifle), AKM (long-range rifle), Crossbow, SPAS-12, MP5 (all-round SMG), Vector (point-blank SMG), UMP (longer-range SMG), Dual Pistols, Rocket Launcher, HDR (long-range sniper), Vanguard (semi-auto marksman sniper, replaced the Kar98). The Swarm stays a pickup (2 shots, each a burst of 4 micro-missiles, then your gun comes back) and the shop Flamethrower is still sold; each one temporarily replaces your gun, then gives it back.
- M4 is first in the gun list; snipers sit at the end; Random is the default for gun and lethal and sits at the end of each row, jiggling slightly.
- Loadout is one page, no tabs: the showcase (whatever you last picked, big, with its stats) on the left; the gun grid on the right, then a clear empty row's worth of space, then the lethals.
- The game is hard, fast and simple, not a realistic sim (Pete, 24 Nov): every gun aims down sights as fast as the quickest SMG (0.07 s, snipers included); there's no reload button, a gun reloads only once its mag is empty (bots too, no topping up), and no gun takes longer than 1.5 s to reload; hip fire is half as wide as it was on the ARs and SMGs; weapon swaps are instant; no stamina (double jump is free).
- Controls are kept few: E throws a shop grenade if you have one, otherwise uses your lethal (no separate T key); no wall building and no Sentry.
- The barbed-wire bat is always the 2nd slot: 1 = gun, 2 = bat (3 also works), and the wheel or the phone Swap button flips between them. You're 40% faster with the bat out (not in Rumble) and it swings twice as quick (every 0.275 s); ADS with the bat does nothing; it downs in 3 hits (34 a hit, Rumble too). No fists anywhere.
- Bat colours: every spawn you get one of six bats at random, same shape: classic white and red, Gold, Toxic (neon green and purple), Candy (pink, yellow, cyan), Galaxy (starry purple) and Lava (black with glowing cracks). The Gold Bat is the lucky one and must look it: bright polished gold with glitter flecks, a warm glow, little stars twinkling all over it, a gold swing arc with glitter and a shower of gold on every hit; its name glows gold on the HUD. 50 a hit, downs in 2. Your bat's colour shows on the HUD.
- No overpowered outliers; headshots do extra damage on all guns. ARs/SMGs: faster fire, lighter hits, bigger mags. AKM is the long-range AR. Shotguns only one-shot at point blank, otherwise max 75%.
- Sights (Pete, 24 Nov): two designs only. ARs (AKM, M4) use the twin steel-blade sight; SMGs (MP5, Vector, UMP) and the Dual Pistols use the round ring sight. SMG dots are blue; AR and pistol dots red. No other red dots/holos on those guns. Small aiming dots, no glow ring round red dots; shiny triggers and mirror scopes.
- No aim button (Pete, 24 Nov): holding Fire aims down sights while shooting (left click or touch Fire); snipers, the Rocket Launcher and the Swarm hold Fire to aim and fire on release, right click only cancels a held aim. No touch Aim button, no right-click aim, no "Aim when firing" setting.
- Sniper scopes zoom in hard (Pete, 24 Nov): HDR 12° field of view, Vanguard 27° (about 1.6x closer than before); look speed through a scope scales with the zoom. Letting go of Fire always drops the scope; nothing can leave you stuck aiming.
- Gun colours: HDR black with silver barrel; Vanguard shiny mirror chrome (the M4 is the gold gun); Vector black.
- Rocket Launcher is "Hellfire" (Pete picked it, 24 Nov): black chrome tube with glowing molten cracks, bone rings and spikes, a demon skull round the muzzle (burning eyes, fangs, fire in its throat) with black-and-red ram horns; its rockets match (cracked body, bone fins, red-hot nose).
- Lethals are "Neon Arcade" (Pete picked it, 24 Nov): gloss black bodies with glowing neon in each lethal's colour (Grenade lime, Cluster orange, Mine red with a glowing hex top, Stun cyan with a lightning bolt). The Gold Grenade still turns fully gold.
- Throwables land where the crosshair points, all the same speed; aim trail ends in a small solid dot with a dark outline. Grenade is the first lethal. Stun lasts 1 s. No Flash Bang. Mines always sit on a surface.
- Shop: vending machine with a glowing SHOP sign, lucky-dip (stand at it, bing, random pickup); Gold Grenade first; no Health/Stamina. Gold Grenade: double damage, an explosion twice the size of a normal one, and a slight shake of your screen wherever you are. Flamethrower: 16 m wide jet, 6 a tick (downs someone up close in about a second), 3 s of fuel, harder burn.

### Sound
- Top quality, never cheesy or harsh; preview new sounds before publishing. Sources: CC0 Freesound/Pixabay/Kenney etc. (ElevenLabs is unreliable).
- Volume: Sound (master), SFX, Weapons, Music; Weapons controls only weapon sounds.
- Near-miss puff only on extremely close misses. Round start = gong. Menu sounds subtle (Kenney Interface pack).
- Music: dark, bass-led trap on menus/between rounds/end of game. The menu song rotates between 3 tracks (Dark Trap, Dark Trap 2, Dark - Dark Beat), a different one each time the game opens.

### Characters
- Current roster (10): Wednesday, Lil Pink, then North West, Johnny Rotten, Emo Bunny, Glitch, Kitty, Puffa, Raven, Toxic (added 24 Nov from Pete's picked concepts, Puffa with black hair). Shadow is dev-only (Test Arena) for now. New characters share Lil Pink's and Wednesday's look and movement: Tripo image-to-3D models on the same six-part rig.
- Movement (Pete, 24 Nov): everyone, players and bots, runs about 9.5 m/s with a gun out (25% slower than before); the bat still adds 20%.
- All roughly the same height, same speed, no abilities; differ only in look. Pickers show no speed/health.
- Characters visibly hold their real gun; crouch is a ready-to-fire kneel.
- Downed: faint dark-red smoke. Revive: no effect. Respawn: no burst.

### Finishers
- Removed completely (24 Nov): no finishing moves. A downed player is eliminated by being shot out or bleeding out; bots shoot downed players instead of walking up to them.

### Bots
- Levels Easy, Normal, Hard (Easy is much gentler, no revenge). 10 hidden random play styles. Bot teammates no better than enemies.
- A bot you kill hunts you until its next kill but doesn't ignore others; slight pull towards whoever's winning. Bots shoot through glass, can fall off things, go for nearby explosives.

### Menus and HUD
- Navy and white everywhere (navy instead of black since 24 Nov), menus and in-game HUD alike, layout copied from the Unity version. The menus' accent colour (main buttons, logo, Rematch, Defeat, highlights) is neon pink, not red; red stays only for in-game danger/enemy cues (HUD enemy score, damage, Man Down, countdown). tools/navy-theme.py and tools/pink-menus.py convert anything new.
- Fits a laptop screen without scrolling. Back and forward buttons the same size side by side, centred.
- Map and character pickers: one box of small pictures plus Random; selection shown by a white edge; Random spins only when you move on. Mode & map screen: options in one row across the top (Quick start first), map picker below: small square map pictures on the left, a big preview of the picked map beside them with its name and description; hovering a small picture shows it in the big preview (no pop-up); no scrolling; on the Loadout screen hovering a gun shows it in the existing showcase panel (no pop-up); lethals have no hover. After a win the results offer just Rematch or Menu. Quick start = Free for all, 4 players, 5 min, random map and weapons; hover shows what it includes.
- Sliders: sensitivities 0–10 whole steps; volumes in 10% steps. Countdown small and red, the 1 dissolves.
- Minimap is a plain circle. No permanent in-game Home icon. Clips only at game end as one video icon. Pete's phone HUD layout is the default mobile layout.

---

## Part 2 – Never add back

- Maps: Sky High helipad and rescue chopper (removed 24 Nov 2026). Sky Islands (never mention), Toy Town/Playtime, Small Arena, Baseplate Arena, Club Night (removed 24 Nov 2026, with its deep house music), Backyard (removed 24 Nov 2026). (Old names Maple Street, Wreck Cove and Rail Yard are now Street Life, Beach Please and Railed.)
- Characters: Volt, Zip, Hook, Xero, Pyro, Blaze, Thor, Isaac, Blink, Angel, Ice Maiden, Gorillaz, Jet, Murda Medic, Spacebot, Crusty, Dracz, Starscreen, Anti Hero (the last eight removed 24 Nov). Character abilities.
- Weapons/items: the Flash Bang (removed 24 Nov), FAMAS, AUG, SCAR-H, Shotty Horror, Uzi, P90, Sting and Kar98 (cut on 24 Nov), the Simple rules (Normal/Simple row), the secondary weapon slot and two-gun loadouts, the Knife, loadout tabs (Primary/Secondary/Lethal), Snipers only mode, small-map weapon limits, building walls (Q), the Sentry (V), the separate shop-grenade key (T), stamina, the weapon-swap delay, fists (and boxing gloves, punch poses, first-person fists, the bat pickup), the reload button/R key, slower per-gun ADS times, .44 Magnum, Thumper, Ninja Stars, Stim, HeartBeat, Gold Armour (the always-on 30-armour lethal), auto weapon switch, Extreme bots, Health/Stamina in the shop, Tripo market-stall shop, grab/carry mechanic.
- Finishers: all finishing moves (removed 24 Nov: Pancake, Heartbreaker, Roast, Combat, the F key and the Finish button), Knockout, Piledriver, Clear!, Overcharge, Dog pile, Sky drop, Hot potato, Ice sculpture, Sawn in half, Shadow grab, Blur rush, Overgrown, Gone fishing, signature finishers.
- Effects: stun stars over the head (removed 24 Nov), floating yellow/pink butterflies, confetti, coloured particle squares, black zig-zag cracks, building smoke, green downed smoke, revive glow, respawn burst, white finisher flash, cartoon outlines, clouds.
- Beach Please: the jetties and glass promenade walkway (removed 24 Nov).
- Street Life: the 4 smaller side buildings, the big buildings' middle floor, the hospital theme (red, crosses, medical kit, helipad) and the home's brown cedar (all removed 24 Nov).
- Other: the separate aim control (touch Aim button, right-click aim, Aim-when-firing setting), the UMP's micro red dot and the Vector's holo box, throne-room crown scene, laser/flashlight on the M4, sprinting, bells in finishers, the red barn on Street Life.

---

## Part 3 – Daily log (newest first)

### 2026-11-24
- Ziplines: 3 s cooldown after any ride (players and bots). Riders can be shot; a downing hit on the zipline kills outright and the body tumbles off, falls all the way and explodes where it lands.
- Fixed invisible walls under staircases (Street Life's house and hospital, The Mansion, The House): stairs keep their solid blocks for walking, but shots, throws and sight now only meet the visible steps, so you can shoot under and between them.
- Fixed getting stuck aiming down a sniper scope (pressing Fire again before the last shot had gone, or a held aim carried into the next round). Sniper scopes zoom further: HDR 20° to 12°, Vanguard 44° to 27°, with look speed scaled to the zoom.
- Ziplines: stand on the pad at either end for 1.5 s to grab the handle (no jump); after a ride you step off the pad before it can take you back.
- Rocket Launcher re-skinned as "Hellfire" (black-and-red horns) with matching rockets; lethals re-skinned as "Neon Arcade". Picked from four concepts each.
- Vanguard re-finished in shiny mirror chrome (was gold, which clashed with the gold M4).
- Stun stars removed completely (no stars, halo ring or sparks over a stunned or dazed player's head).
- Street Life: a zipline from roof top to roof top (small deck on each ridge; stand on the pad for 1.5 s to grab (step off before you can ride back; 3 s cooldown after any ride, players and bots), can be shot while riding (killed outright: the body tumbles off along the cable, falls all the way and explodes where it lands), about 1.7 s across, jump to let go; bots use it both ways); quiet original trap loop playing inside the arcade.
- Street Life: the arcade's two corner blade signs removed; the ARCADE board scrolls slowly left; arcade carpet, starry ceiling, memphis blue wall, posters, a HIGH SCORES board and a GAME ON sign inside; the two lorries restyled (SCOOPS ice-cream truck, GAME TRUCK).
- Gold Bat made the obvious special one: brighter polished gold with glitter, a glow, twinkling stars, a gold swing arc and gold sparks on hits; gold name on the HUD.
- Street Life arcade: the star on the ridge removed and the roof made black.
- Bat: 40% speed boost while held (was 20%) and swings twice as quick. Six bat colours at random each spawn; the Gold Bat downs in 2, the rest in 3.
- Throwables smash through any glass without bouncing or going off; thrown grenades set off barrels and mines anywhere in their blast; Gold Grenade blast twice as big with a slight screen shake; Flamethrower more powerful (6 a tick, 16 m, wider jet, 3 s fuel, harder burn).
- Stun stars half the size (and a little lower). Watching someone after you're out no longer judders/looks fuzzy (the camera now moves with their smoothed position).
- Mansion: the side hedges (out of bounds) raised to the full height of the house (11 m), and the roof's side parapets to 2.6 m, so both are obvious.
- Street Life: the home all yellow (black frame kept); the arcade's outside frames black like the home's, and loud dark clashing colours inside (red floor, electric-blue wall, deep purple ceiling/upstairs floor, loft lined blue/purple/teal/magenta).
- 8 new characters added (North West, Johnny Rotten, Emo Bunny, Glitch, Kitty, Puffa, Raven, Toxic), and Crusty, Dracz, Starscreen and Anti Hero removed completely; roster is now 10 (Wednesday, Lil Pink and the 8).
- Bat now takes 3 hits to down (34 a hit, was 50), Rumble included.
- Swarm pickup cut to 2 shots (one mag, two bursts of 4) and switched to hold Fire to aim, release to fire.
- Gorillaz, Jet, Murda Medic and Spacebot removed completely (characters, skins, models, menu pictures, glows, faces, Jet's jetpack flames); the roster is Wednesday, Anti Hero, Lil Pink, Starscreen, Crusty and Dracz.
- Rocket Launcher joins the snipers on hold Fire to aim, release to fire (desktop and phone).
- Player speed cut by 25% for everyone, players and bots (running about 9.5 m/s, was 12.7).
- SMG sights (MP5, Vector, UMP) get a blue dot.
- Sky High rebuilt as an infinity-pool roof terrace: helipad, chopper (model and rotor sound), stairwell buildings, tanks and skylights removed; wooden-ended glass pool, raised sun decks with solid cover, teak cover walls.
- Flash Bang removed completely (lethal, projectile, model, icon, bot use); lethals are Grenade, Cluster, Mine and Stun.
- Finishing moves removed completely: no F key, binding or phone Finish button, no finisher camera, sounds or effects; downed players are shot out or bleed out, and bots shoot downed players.
- Street Life: the hospital became the yellow ARCADE (game machines on both floors, star signs, a star on the ridge); both buildings turned sideways and made bigger; the home's brown wood replaced by bright boards (a colour per wall, black frame kept); fewer, bigger glass panes; deep green plain ground outside the fence; the shop moved to the south end of the road against the fence.
- Street Life home: plain floors downstairs (flat stone-beige living room, plain pale stone kitchen/dining; the patterned carpet, rugs and chequered tiles are gone).
- Street Life's vans made static: they stay parked (still damageable, burn out, back next round).
- Sights: ARs (AKM, M4) both get the twin steel-blade sight; MP5, Vector, UMP and Dual Pistols get the round ring sight (UMP micro dot and Vector holo removed).
- Aim button removed: holding Fire aims down sights; snipers hold Fire to scope, release to fire, on desktop too. Touch Aim button, right-click aim and the Aim-when-firing setting removed.
- Simple rules (Normal/Simple row for 1v1 and 2v2) removed.
- Hospital lighting thinned out (it was too much): ceiling panels about a third as many with softer glows, fewer and dimmer real lights.
- Street Life downsized to Big (70 × 50 m): the 4 side buildings removed, and the hospital and home cut to 2 floors (middle floor removed; the loft room and terrace sit on the ground floor); buildings scaled to fit, narrower road, trees, lamps and spawns moved in.
- One gun and the bat: the secondary slot is gone. All 11 guns are in one list (the MP5, Vector, UMP, Dual Pistols and Rocket Launcher joined it), the Knife was removed completely, and the bat moved to key 2. The loadout is back on one page: guns on top, a clear gap, then the lethals, no tabs. Swarm and Flamethrower now stand in for your gun.
- Beach Please downsized to Big (70 × 50 m) and its walkway removed (both jetties, the glass promenade, its lamps, ladders and promenade waves); huts, loungers, palms, sandcastles and spawns moved in to fit.
- The House open flow: doorways widened to 4.4 m, glass partitions and low hop walls replaced by open archways, furniture cleared from every opening (kitchen island, dining table, armchair, hop sideboards removed).
- Gun list cut to 12: FAMAS, AUG, SCAR-H, Shotty Horror, Uzi, P90 and Sting removed completely, and the Kar98 swapped for the Vanguard.
- Simpler still: reloads capped at 1.5 s (only the Rocket Launcher and Swarm were longer), hip fire halved on ARs/SMGs, instant swaps; shop grenades moved onto E, wall building and the Sentry removed, stamina removed (free double jump); free for all is straight kills; small-map weapon limits and Snipers only mode removed (the four extra snipers kept in code, unused).
- The Mansion opened up for fast movement: every inside glass wall replaced by an open archway, inside doorways widened to 4.4 m, furniture and wall decor cleared from every doorway (master bed, guest room and dressing room re-laid out), hall of mirrors' mirrors moved from the floor onto the walls.
- Back to hard and fast: all guns get the quickest SMG's ADS speed; reload button (R key, phone button, key binding) removed, guns reload only when empty; fists removed completely and replaced by the barbed-wire bat as the permanent 3rd slot (Rumble is bats only; the bat pickup is gone).
- Lagoon rebuilt as a Big (70 × 50 m) single rectangular deck with high boardwalks, stairs and bridges to the shop canopy.
- Club Night removed from the game completely (map, code, music, README).
- Collection mode removed from imok 1v1 (menu, code, README) to be rebuilt as a separate project; last version tagged `collection-v1`.

### 2026-11-23
- Gold Armour lethal removed from the game (shop armour, plates and Gold Grenade unchanged).
- New Collection mode on The Mansion (8 players, start with fists, collect stars, cash in at the shop); later the same day: 10 stars to win, going down costs 2, dying loses all, stars respawn 12+ m away, bots search only for what they've seen.
- Collection: 10 stars to win confirmed; the through-walls outline and minimap marker now start at 8 stars (was 4).

### 2026-11-22
- Bug fixes only: bot grenade aim, sentry splash through walls, bloom, melee on finishers, flamer accuracy, online sync.

### 2026-11-21
- Shadow pulled from the game (dev-only) and a Test Arena (`?test`) added for working on characters.
- Mansion: nothing over windows or glass ceilings.
- Sting aims straight through its iron sights; crossbow bolt small, thin, visible and sticks in what it hits.

### 2026-11-20
- Mansion: ball pit, jump-through windows, one-shot roof skylights, hot tubs, refurnished bedrooms, dirt bikes on garage racks with black walls, side lawns closed, porch pillars/fountain/hot tub tidy-ups, review fixes (bots use portals, one shop in the grand hall).
- Railed train head-on and Sky High chopper crush now blow the body to pieces.
- Weapon weight sets move speed. Low guardrails on every staircase.
- Ninja Stars removed. Clouds removed from every sky. Butterflies removed from every map.
- Knife (Arctic Chrome) replaces the sword; Swarm becomes a random pickup.
- New rifles SCAR-H "Crimson" and AUG "Shadow"; new finishes for SPAS-12, Shotty Horror, P90; polished triggers on all ARs.
- SMGs: iron sights only, fastest ADS. Pancake loses dust/rubble; finishers evenly split; Roast gets the Inferno fire; no white flash/sparks on finishers. Respawn block burst removed.
- Menu sounds (Kenney CC0). Boxing gloves on fists. Built walls 3 bricks high.
- Shadow character added (later pulled on the 21st). Lagoon sea fixed, all roofs walkable, ladders replaced by hop-ups.

### 2026-11-19
- Finishers cut to four (Pancake, Heartbreaker, Roast, Combat); finisher polish; harsh finisher sounds removed.
- Melee: fists 3 punches to down, bat/sword 2, speed boost with melee out; new fist swing/land and bat swing sounds; first-person fists.
- Snipers only mode, then 4 new snipers (Reaper, Titan .50, Vanguard, Phantom) exclusive to it; small-map weapon limits.
- New SFX volume slider; Weapons volume only for weapons.
- Railed: Goods Shed single stair, glass front, tool shelves; Engine Shed becomes a waiting room; locomotive removed.
- Club Night deep house music. No repeat spawns. Bot cover/peek tactics.
- Glass: thin, very see-through, no outline. Live TVs and departure boards.
- Street Life small houses get interiors. The House study desk removed, bath, race car.
- New map: The Mansion (Biggest). Throne-room crown scene removed; results screen becomes a scorecard. First-person camera option. No glass in red-dot/holo sights.

### 2026-11-18
- Menu: map size groups, Random last, Quick start; pickers become one box of small pictures with Random; Street Life selected on open; character box matches map box.
- Street Life clean-up (2 vans, picket fence), then facing buildings, four roof-deck houses, white lantern lamps.
- Characters removed: Angel, Ice Maiden, Xero, Pyro, Blaze, Thor, Isaac, Blink. All character abilities removed; all same speed.
- Crossbow fast and accurate; every weapon breaks things. Hot potato and Ice sculpture removed; finisher throws never pass through solid things; finishers can't be interrupted.
- 2v2 gets Normal/Simple rules. Fists always the 3rd slot. Weapon balance pass (AKM long-range).
- The House rebuilt (glass partitions, colour-themed rooms, straight wide stairs, destructible furniture). Backyard rebuilt (sunken pool, sunken trampolines, picket fence).
- Shop becomes a lucky dip. Standard map sizes. Sky High tweaks. Beach Please huts, classy Tiki Bar, shop inside it.
- Free for all: 8 players back; timed matches. In-game look goes monochrome. Home icon removed. Throws land on the crosshair.
- Crusty recoloured (purple hair, green suit). Easy bots much gentler. Arena portals. Remastered gun sounds. Bat pickup for Rumble; Neon Runners speed shoes; pickups wait 10 s.

### 2026-11-17
- Menus go monochrome (copied from the Unity version). Kar98 black-frame model back.
- New options: Weapons volume, key rebinding, FOV, brightness, crosshair, hit sound/hitmarker toggles, kill commentary toggle, reset; Auto frame rate.
- Every map available in every mode. Revenge-hunting bots no longer blind to others.
- New map: Club Night.

### 2026-11-11
- Character motion upgrade; Beach Please single straight walkway, waves; Lagoon rogue waves, rope rails, Man Down into the water.
- Downed smoke faint dark red; no revive effects. M4 laser and light removed. Near-miss sound only on very close misses.
- Sky High: buildings with opening glass doors, chopper landing crush, chopper sound. Bots see through glass and play more human.
- Realistic finish rolled out to all guns; Kar98 black frame (reverted, then back on the 17th). Stim removed.
- Run speed +25% then -10%; players and bots share one speed. Loadout preview bigger and studio-lit with 1–10 ratings.
- Extreme bots added (later removed). Cars blow up on 3rd shot. Gong round start. Minimap zoomed out. Different spawns each round. Bots pick range-appropriate guns.

### 2026-11-10
- 1v1 map list trimmed, then Small Arena removed. 1v1 spawns face away from the opponent.
- Realistic gun models; M4 premium finish. Sky High glass balustrade is the only edge barrier. Arena colours toned down.

### 2026-11-09
- Each secondary gets its own ADS view. Auto weapon switch removed.
- Beach Please: fishing boat gone, jetties become a long glass promenade.
- New AKM, M4 and FAMAS sounds. Explosive barrels go off from one hit. Mines never float.
- Arena always last in the map list. Back/forward buttons same size side by side. LMG renamed Fireblade; class tags on gun cards. Menu fits the screen.

### 2026-11-08
- Shooting a mine sets it off. Beach Please made simple and premium (glass pavilions, big Tiki Bar). Cinematic map titles.
- Red spray hit effect replaces coloured blocks. Shop grenades show a throw arc.
- Glass shatters into tiny shards; upright glass breaks with one bullet, roof glass stays tougher.
- Railed Engine Shed glass front and lit signs. Loadout preview spins in 3D.
- New secondaries: UMP, Sting, Swarm.

### 2026-11-07
- Arena becomes a floodlit night stadium; ramps doubled in height.
- Throw arc ends in a small landing dot. Visible sword swing. Character pictures rendered from the in-game models. HQ menu map pictures.
- Lagoon rebuilt clean (decks cleared, 2 crossovers). Loadout Showcase layout.

### 2026-11-06
- Lagoon Tripo models. Railed container glass. Map title card before round 1.
- Xero red with eye flames; glow features for other characters (Xero later removed).
- FAMAS full-auto. Toy Town removed. Bots hold a grudge; kill call-outs.
- Street Life trees outside the fence.

### 2026-11-05
- Shotty Horror (double barrel) replaces AA-12; Thumper out. Vector and P90 added. Sentry and Flamethrower shop items.
- Railed: half-glass roofs, trees outside the fence, real lit tunnels, chain-link fence.
- Menu becomes 3 full-width screens. Characters hold their real guns. Keyboard E = lethal.
- New explosions; damage numbers halved; no in-game health bars. Character menu order set. Lagoon split into 2 pavilions with evening lights.
- New characters: Dracula (later Dracz), Spaceman (later Spacebot), Lil Pink.

### 2026-11-04
- Clips only at game end. New M4 sound. Random default for all weapons; lethals under secondaries; flash/stun 1 s.
- Street Life simplified to 2 buildings (hospital and home), white ladders replace hop-ups, Tripo trees, cars and furniture; black Lambo.
- Countdown smaller and red. Characters levelled to the same height. Crouch is a ready-to-fire kneel.
- Railed rebuilt small with the Tripo train. Vending machine shop with Gold Grenade first; Health/Stamina out. Pancake weighted double (since reversed).

### 2026-11-03
- ARs/SMGs faster with lighter hits and bigger mags. 1v1 moves into Players. Shootable mines. Brick walls easy to shoot down; bot teammates same level as enemies.

### 2026-11-02
- Aiming dots halved; red-dot glow ring removed.

### 2026-11-01
- 1v1 mode (Simple/Normal); Sky High and Lagoon added. Map tiles below the option rows. Sky Islands removed.

### 2026-10-31
- Safety checks and GitHub Actions publishing added. Snipers to the bottom of primaries, M4 first. Dragon Sword model.
- Sliders 0–10 / 10% steps. One shop per map near the middle. Simple 1v1s. Pete's phone HUD becomes the default. Boxing-guard fists.

### 2026-10-30
- Shotguns only one-shot at point blank (else max 75%). Arena added. Snipers fire from the hip. Random character tile. "Eliminated" shows as soon as a finisher starts. Rumble fists only.

### 2026-10-29
- Detailed real-gun models (MP5 style on every gun); .44 Magnum removed; red dot designs per gun. Playtime map added (later removed).

### 2026-10-28
- Tripo models for all characters. Volt, Zip, Hook removed; Angel, Crusty, Wednesday, Anti Hero, Thor added; six renamed. Full-screen white menu (since monochrome).

### 2026-10-25 to 10-27
- FAMAS, SPAS-12, AA-12, Crossbow and others added. Fixed 60 Hz clock and peer-to-peer "Play a friend" online play.
- Beach Please opened up; ladder climbing animation; bots reach everywhere; explosive drums on every map; character models rebuilt.
- Menu split into Lobby and Loadout.

### 2026-10-18 to 10-23
- Game created as Block Rush, renamed imok 1v1. Duels, Rumble, 2v2, free for all; 10 hidden bot styles.
- Finishers, characters and skins; shops; stamina; ElevenLabs sounds; dark trap menu music.
- Maps renamed Street Life, Railed and Beach Please; Rail Yard and Wreck Cove built. Phone controls, HUD editor, performance modes. Sprinting removed.
