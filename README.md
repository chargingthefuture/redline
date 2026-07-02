# Redline

A fast, offline side-scrolling platformer — run, jump, roll, and spin-dash through
15 acts collecting rings, in the spirit of the classic 16-bit speed games. It is an
original game (its own hero, enemies, and levels), built to play on a phone, a tablet, or
a Chromebook with **no internet connection** once it has loaded once.

It plays with a **gamepad**, a **keyboard**, or **on-screen touch buttons** — all three at
the same time, so pick up whatever is in reach.

## How to play

| Action | Keyboard | Gamepad | Touch |
|---|---|---|---|
| Move | Arrow keys or `A` / `D` | D-pad or left stick | ◀ ▶ buttons |
| Jump | `Space` or `Z` / `X` | `A` (or any face button) | `A` button |
| Roll | hold `Down` while running | hold D-pad down while running | ▼ button while running |
| Spin dash | crouch (`Down`) + tap `Jump`, then release `Down` | crouch + tap `A`, release down | hold ▼ + tap `A`, release ▼ |
| Pause | `Enter` | `Start` | the `❚❚` button (top of screen) |
| Start / continue a menu | `Enter` / `Space` | `A` / `Start` | tap anywhere |
| Mute sound | `M` | — | — |

Collect rings — they are your shield. Get hit with rings and you scatter them but
survive; get hit with none and you lose a life. Stomp or roll into enemies to pop them,
bounce off springs, dodge spikes, and touch the spinning goal ring to clear the act.

## Run it locally

The game is plain HTML, CSS, and JavaScript — no build step. Because the offline install
(the service worker) only turns on over a web address, serve the folder rather than opening
the file directly:

```sh
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000 in a browser
```

Any static file server works (`npx serve`, `http-server`, etc.).

## Play it on your phone or Chromebook (offline)

Redline plays in **landscape** — turn the phone sideways and the game fills the screen. If
your phone's rotation lock is on and it stays portrait, the game rotates itself so you can
still turn the device and play; no need to unlock rotation.

Redline is a Progressive Web App — a web page a device can save and run offline like an
installed app. Once the page has loaded over the internet one time, it keeps working with
the network off. Installing it to the home screen also gives you a full-screen view with no
browser address bar.

- **iPhone / iPad (Safari):** open the game's web address, tap the **Share** button, then
  **Add to Home Screen**. Launch it from the new icon — it runs full-screen and offline.
- **Android (Chrome):** open the address, then use the menu → **Install app** (or **Add to
  Home screen**). Launch it from the icon.
- **Chromebook (Chrome):** open the address, then click the **install** icon in the address
  bar (or menu → **Install Redline…**). It opens in its own window and works offline.

A gamepad paired over USB or Bluetooth is picked up automatically on all three.

## Hosting it (optional)

This repo includes a GitHub Actions workflow that publishes the game to **GitHub Pages** on
every push to `main`, which gives you an `https://…` address to open on your devices (needed
for the offline "add to home screen" step above). To turn it on once: in the repository,
open **Settings → Pages** and set **Source** to **GitHub Actions**. The next push to `main`
publishes the game.

## What's in here

| Path | What it is |
|---|---|
| `index.html` | the game page |
| `css/style.css` | layout, the touch pad, scaling to fit the screen |
| `js/levels.js` | the 15 acts, as text tile maps |
| `js/input.js` | one place that turns keyboard, gamepad, and touch into game actions |
| `js/audio.js` | sound effects made from tones (no audio files) |
| `js/game.js` | physics, collision, enemies, camera, drawing, and game flow |
| `manifest.webmanifest`, `sw.js` | the installable / offline app plumbing |
| `assets/` | the app icons (generated, no outside art) |
