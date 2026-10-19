# imok 1v1

A blocky three.js shooter you play in the browser against bots: 1v1, 2v2 or free for all.

**Duels** – pick **1v1**, **2v2** (you and a bot teammate against two bots; teammates spawn side by side, can't hurt each other, and once you're out you spectate your teammate) or **Free for all** (you against three bots, everyone for themselves; last one standing takes the round). First to five rounds, on Maple Street (Sky Islands, Wreck Cove and Rail Yard are coming soon and show as locked tiles in the menu). On Maple Street every house can be entered; most have two floors, balconies, lofts with rooftop terraces, and big upstairs windows you can walk out of. Ledges and air-con units under the side windows let you climb onto the roofs, and every pitched roof can be walked on. The two big end houses also have a hop-up (bin, crate, shed) against one side that takes you straight in through an upstairs window. Each house has its own roof colour so you can call out positions. Parked cars (with spinning hubcaps that blur at speed and kick up a little dust) pull out now and then and drive along the street at their own speed (they stop for players and walls), birds fly over, clouds drift, trees sway and butterflies flutter round the front gardens. Each round you and the bot start at two of eight spawn points, far apart. The bot climbs stairs and roofs too.

**Bot play styles** – every round each bot secretly picks one of ten styles (and weapons to match), so you have to work out what you're up against:
- **Rusher** – charges straight at you, jukes and jumps, never retreats.
- **Sniper** – takes high ground far away, scopes in, relocates after every couple of shots, switches to its sidearm if you get close.
- **Lurker** – hides out of sight near you and springs when you come close or turn your back.
- **Flanker** – circles round out of view and hits you from the side.
- **Turtle** – walls up when it sees you, peeks from cover, backs off when hurt.
- **Duelist** – strafes and trades shots at mid range.
- **Hunter** – always has a rough fix on where you are and keeps tracking you down.
- **Breacher** – shotgun; hops between hiding spots, each one closer, then bursts in.
- **Kiter** – holds its favourite range: backs off as you push, follows as you run.
- **Camper** – picks one spot with a view, walls up and holds the angle all round.

All styles push when you're low, play safer when hurt, and chase the clock late in a round when behind on health. Sniper, Turtle, Kiter and Camper aren't used in Rumble.

**Rumble** – Duels with no guns (also 1v1, 2v2 or free for all): fists only (15 per punch), on the small Backyard map or The House. Punch someone while you're falling for 20 damage: you both get knocked back and they're stunned for a second. Abilities, walls, pick-ups, slams and finishing moves all still work.

The menu is a full-screen, three-step setup: 1) mode and map, 2) character (with a profile preview; Blaze is selected by default) and consumable, 3) primary and secondary weapons (with previews and stats). Start turns green once everything is picked.

The menu opens with everything pre-picked so you can hit Start straight away: the top map, Blaze (top left of the character grid), HDR, MP5 and Grenade.

**Shop** – every map has an open SHOP kiosk on the clearest ground near the middle, reachable from all sides (a gold marker shows how far away it is). Walk up to it and a quick menu pops up: press 1–4 (or tap) to take one item – **Health** (+50 HP), **Armour** (blocks the next 50 damage), **Scope** (the red-dot sight on the AKM, M4, LMG, MP5 and Uzi, with steadier aim; lasts the match) or **Grenades** (3, thrown with T). In Rumble it's Health, Armour or **Speed** (+25% for 30 s). After a pick the shop restocks for you in 60 seconds (shown bottom left). The fight doesn't pause while you're there.

Characters (12): Brute (a slate-skinned giant with rage veins; 130 HP, leaps and smashes the ground for up to 40 damage and knockback, breaking nearby walls), Jet (an ace pilot with a chrome jetpack; flight), Blaze (a fire brawler with flame hair; fireballs), Blink (a street magician; teleport dash), Tank (a mech pilot in a yellow exo-frame; 150 HP and a shield), Ghost (a hooded spectre; invisibility), Frost (an ice mage; frost nova that slows anyone within 9 m), Patch (a field medic; heals 40 HP), Volt (an electric punk with tesla coils; 30-damage lightning bolt), Hook (a climber; grapples to wherever you aim), Zip (a sprinter; fastest runner, 90 HP, sprint burst) and Thorn (a bark-armoured warden; blocks 30% and reflects half the damage taken), each with an ability on E.

**Stamina and regen** – hold Shift to run (about 40% faster; on touch, push the move stick all the way out). The stamina bar under your health lasts about 5 seconds of running, refills a second after you stop, and once it's empty you can't run again until it's a quarter full. Getting shot drains stamina too, more for harder hits (an HDR body shot takes most of it, an SMG bullet a sliver). Health regenerates once you've gone 5 seconds without being hit: 6 HP a second up to half health, then 3 HP a second; bots regenerate too.

**HUD** – top left is a small leaderboard of everyone in the match with kills, assists (damaged someone a teammate or rival then eliminated within 15 s) and deaths; anyone out for the current round is greyed. Top right is a minimap that turns with you and shows the map layout, the shop (gold square) and teammates (blue). Enemies never show unless they fire: each shot leaves a tiny red dot where they were, fading over a couple of seconds. The pause menu has switches to hide or show each on-screen panel (score, leaderboard, minimap, health and items, weapon and ammo, kill feed, controls hint, shop marker, name tags); your choice is remembered. XP is only shown on the menu and the end-of-match screen.

**Cover** – bullets go through wood (fences, sheds, furniture, wooden floors and crates; each layer takes off 30% of the damage, up to three layers) but not through concrete, brick, walls, cars or built walls. Bodies can't pass through solid structures: throws and slams stop at walls, a Home run finisher stops at the first wall it hits, and anyone pushed into a wall is moved back out.

At 0 HP you go down instead of dying, with your downed health at 50% (30 of 60), so you're quicker to finish off: you crawl slowly, take 20 less damage per hit (35 less from shotguns, grenades in full), can punch for 5 damage, and revive automatically after 4 seconds (getting hit doesn't reset it), or the opponent can walk up and press F for a finishing move (one of five, picked at random and never the same twice in a row: Ice sculpture, Dog pile, Sky drop, Hot potato or Pancake), or press C to pick you up and then click to throw you (fatal) or F to slam you down (hold C to sky slam: fly high, hold them up for 2 seconds, chuck them down, shoot them, then dive down and punch them out; bots don't sky slam you, they throw or slam instead). Every elimination plays the winner's kill effect: each character has two kill effects of their own. XP: +10 per round won, +5 per round lost, 100 XP per level. Built walls break apart brick by brick.

Each weapon's crosshair matches its colour. The HDR and Kar98 aim through a scope (the HDR's view is a little tighter), each with a red centre dot and a thin outline in the gun's colour. A close-range scope for the AKM, M4, LMG, MP5 and Uzi (a see-through ring sight with a red dot, the shop's Scope) can be previewed from the pause menu. Weapons: pick one primary – HDR sniper (long range, a headshot downs in one, 2 body shots), Kar98 (short-range sniper), AKM, M4 (gold; harder hits, slower fire) or LMG – and one secondary – MP5, Uzi (heavier, steadier SMG), Rocket Launcher (slow-firing splash), Ninja Stars or Sword.

Consumables (press G; for grenades, hold G to see a dotted throw arc and landing circle, release to throw toward your crosshair; aiming with Ninja Stars shows their flight path too): Grenade (2 per round, 50 splash damage), Stim (+45% speed for 5s, 20s cooldown), Stun Grenade (2 per round, stuns anyone caught in the flash) or Sense Pack (see the enemy through walls for 6s, 25s cooldown). The bot gets a random one and uses it too. You also get four buildable walls per round. Magazines are small; an empty gun in your hands starts reloading by itself after a short beat (even if you switched weapons mid-reload), and R reloads early.

Controls: WASD move · Shift run · Space jump · mouse aim (click to lock) · left click fire · right click aim down sights / scope · C crouch (toggle; running stands you up) / pick up a downed opponent · E ability · G consumable · T shop grenade · F finish · R reload · 1/2 or wheel switch · Q build wall · P or Esc pause (controls and sensitivity sliders are on the pause menu). Touch controls (move stick, drag to look, on-screen buttons) switch on automatically on phones and tablets and can be toggled on the pause menu.

**Parkour** – 12 obstacle courses with double jump, swings and moving platforms.

It's a single static `index.html` (three.js and fonts load from CDNs), served by GitHub Pages. To play locally, open `index.html` in a browser.
