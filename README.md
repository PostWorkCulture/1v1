# imok 1v1

A blocky three.js 1v1 shooter you play in the browser against a bot.

**Duels 1v1** – first to five rounds on Maple Street. Every house can be entered; most have two floors, balconies, lofts with rooftop terraces, and windows to snipe from. Each round you and the bot start at two of eight spawn points, far apart. The bot climbs stairs and roofs too.

Characters: Ace (super-high double jump), Jet (jetpack flight), Blaze (fireballs), Blink (teleport dash), Tank (150 HP + shield) and Ghost (invisibility), each with an ability on E.

At 0 HP you go down instead of dying: you crawl slowly, take 20 less damage per hit (35 less from shotguns, grenades in full), can punch for 5 damage, and revive automatically after 4 seconds (getting hit doesn't reset it), or the opponent can walk up and press F for a finishing move (bat home run, axe drop or execution, chosen in the menu), or press C to pick you up and then click to throw you (fatal) or F to slam you down (hold C to sky slam: fly high, hold them up for 2 seconds, chuck them down, shoot them, then dive down and punch them out). Every elimination plays the winner's kill effect: 12 effects (Brick burst, Firework, Shrink, Freeze, Disco, Lightning, Balloon, Tornado, Gold statue, Black hole, Rainbow beam, Spirit) unlock as you level up: +10 XP per round won, +5 per round lost, 100 XP per level. Sniper headshots skip the downed state. Built walls break apart brick by brick.

Weapons: Sniper (headshot kills, 2 body shots), Assault Rifle, SMG, Shotgun, Machine Gun, Rocket Launcher (slow, splash, rocket-jump by shooting your feet: no self damage, no fall damage), and Ninja Stars, plus a secondary of your choice (Pistol, Revolver, Knife or 3 Grenades at 50 damage) and four buildable walls per round. Magazines are small; empty guns reload automatically and R reloads early.

Controls: WASD move · Space jump · mouse aim (click to lock) · left click fire · right click aim down sights / scope · C crouch / pick up a downed opponent · E ability · F finish · R reload · 1/2 or wheel switch · Q build wall · P or Esc pause (controls and sensitivity sliders are on the pause menu). Needs a keyboard and mouse.

**Parkour** – 12 obstacle courses with double jump, swings and moving platforms.

It's a single static `index.html` (three.js and fonts load from CDNs), served by GitHub Pages. To play locally, open `index.html` in a browser.
