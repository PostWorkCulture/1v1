# imok 1v1

A blocky three.js shooter you play in the browser against bots: 1v1, 2v2 or free for all.

**Duels** – pick **1v1**, **2v2** (you and a bot teammate against two bots; teammates spawn side by side, can't hurt each other, and once you're out you spectate your teammate) or **Free for all** (you against three bots, everyone for themselves; last one standing takes the round). First to five rounds, on Maple Street, The House (room-to-room fights) or Baseplate Arena (open studs and forts for snipers). On Maple Street every house can be entered; most have two floors, balconies, lofts with rooftop terraces, and windows to snipe from. Each round you and the bot start at two of eight spawn points, far apart. The bot climbs stairs and roofs too.

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

The menu is a full-screen, three-step setup: 1) mode and map, 2) character (with a profile preview), 3) primary and secondary weapons (with previews). Start turns green once everything is picked.

Characters: Ace (your original avatar; super-high double jump), Jet (an ace pilot with a chrome jetpack; flight), Blaze (a fire brawler with flame hair; fireballs), Blink (a street magician; teleport dash), Tank (a mech pilot in a yellow exo-frame; 150 HP and a shield) and Ghost (a hooded spectre; invisibility), each with an ability on E.

At 0 HP you go down instead of dying: you crawl slowly, take 20 less damage per hit (35 less from shotguns, grenades in full), can punch for 5 damage, and revive automatically after 4 seconds (getting hit doesn't reset it), or the opponent can walk up and press F for a finishing move (bat home run, axe drop or execution, chosen in the menu), or press C to pick you up and then click to throw you (fatal) or F to slam you down (hold C to sky slam: fly high, hold them up for 2 seconds, chuck them down, shoot them, then dive down and punch them out). Every elimination plays the winner's kill effect: each character has two kill effects of their own. XP: +10 per round won, +5 per round lost, 100 XP per level. Sniper headshots skip the downed state. Built walls break apart brick by brick.

Weapons: pick one primary – Sniper (long range, headshot kills, 2 body shots), Scout (short-range sniper), AR or LMG – and one secondary – SMG, Ninja Stars or Sword. You also get four buildable walls per round. Magazines are small; empty guns reload automatically and R reloads early.

Controls: WASD move · Space jump · mouse aim (click to lock) · left click fire · right click aim down sights / scope · C crouch / pick up a downed opponent · E ability · F finish · R reload · 1/2 or wheel switch · Q build wall · P or Esc pause (controls and sensitivity sliders are on the pause menu). Touch controls (move stick, drag to look, on-screen buttons) switch on automatically on phones and tablets and can be toggled on the pause menu.

**Parkour** – 12 obstacle courses with double jump, swings and moving platforms.

It's a single static `index.html` (three.js and fonts load from CDNs), served by GitHub Pages. To play locally, open `index.html` in a browser.
