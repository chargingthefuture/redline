/* Unified input for Redline.
 *
 * The rest of the game never asks "was a key pressed" or "is the gamepad
 * tilted" — it asks about actions: left, right, up, down, jump, start. Every
 * input device (keyboard, gamepad, on-screen touch buttons) feeds those same
 * actions, so a new control only has to be added once here.
 *
 * Usage each frame:
 *   Input.poll();                 // read the gamepad, roll edges forward
 *   if (Input.held('right')) ...  // is the action down right now
 *   if (Input.pressed('jump')) ...// did it go down this frame (edge)
 */
(function () {
  const ACTIONS = ["left", "right", "up", "down", "jump", "start"];

  const keyHeld = new Set();   // actions currently held via keyboard
  const touchHeld = new Set(); // actions currently held via touch buttons
  let padHeld = new Set();     // actions from the gamepad this frame

  let current = new Set();     // union of all sources, this frame
  let previous = new Set();    // union, previous frame (for edge detection)

  let touchSeen = false;

  const KEYMAP = {
    ArrowLeft: "left", KeyA: "left",
    ArrowRight: "right", KeyD: "right",
    ArrowUp: "up", KeyW: "up",
    ArrowDown: "down", KeyS: "down",
    Space: "jump", KeyZ: "jump", KeyJ: "jump", KeyK: "jump", KeyX: "jump",
    Enter: "start",
  };

  window.addEventListener("keydown", function (e) {
    const action = KEYMAP[e.code];
    if (action) {
      keyHeld.add(action);
      // stop the page from scrolling on arrows/space
      if (e.code.startsWith("Arrow") || e.code === "Space") e.preventDefault();
    }
  });

  window.addEventListener("keyup", function (e) {
    const action = KEYMAP[e.code];
    if (action) keyHeld.delete(action);
  });

  // ---- Gamepad (Gamepad API) ----
  function pollGamepad() {
    padHeld = new Set();
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (!pad) continue;
      const b = pad.buttons;
      const a = pad.axes;
      const on = (i) => b[i] && (b[i].pressed || b[i].value > 0.5);
      // Face button A (and B/X/Y as a fallback) = jump.
      if (on(0) || on(1) || on(2) || on(3)) padHeld.add("jump");
      // D-pad.
      if (on(14)) padHeld.add("left");
      if (on(15)) padHeld.add("right");
      if (on(12)) padHeld.add("up");
      if (on(13)) padHeld.add("down");
      // Left stick.
      if (a.length >= 2) {
        if (a[0] < -0.4) padHeld.add("left");
        if (a[0] > 0.4) padHeld.add("right");
        if (a[1] < -0.5) padHeld.add("up");
        if (a[1] > 0.5) padHeld.add("down");
      }
      // Start / menu buttons.
      if (on(9) || on(8)) padHeld.add("start");
    }
  }

  // ---- Touch buttons ----
  function bindTouch() {
    const overlay = document.getElementById("touch");
    const buttons = document.querySelectorAll(".tbtn");
    buttons.forEach(function (el) {
      const action = el.dataset.btn;
      const press = function (e) {
        e.preventDefault();
        touchHeld.add(action);
        el.classList.add("pressed");
        revealTouch();
      };
      const release = function (e) {
        e.preventDefault();
        touchHeld.delete(action);
        el.classList.remove("pressed");
      };
      el.addEventListener("pointerdown", press);
      el.addEventListener("pointerup", release);
      el.addEventListener("pointercancel", release);
      el.addEventListener("pointerleave", release);
      // stop the browser turning a long press into a context menu / selection
      el.addEventListener("contextmenu", (e) => e.preventDefault());
    });

    function revealTouch() {
      if (touchSeen) return;
      touchSeen = true;
      if (overlay) overlay.classList.remove("hidden");
    }

    // Any real touch anywhere reveals the on-screen pad (once).
    window.addEventListener(
      "touchstart",
      function () {
        if (!touchSeen) revealTouch();
        // touch also counts as "start" for the title/continue screens
        touchHeld.add("start");
        setTimeout(() => touchHeld.delete("start"), 60);
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindTouch);
  } else {
    bindTouch();
  }

  const Input = {
    poll() {
      pollGamepad();
      previous = current;
      current = new Set([...keyHeld, ...touchHeld, ...padHeld]);
    },
    held(action) {
      return current.has(action);
    },
    pressed(action) {
      return current.has(action) && !previous.has(action);
    },
    // True if any action just went down — handy for "press anything to start".
    anyPressed() {
      return ACTIONS.some((a) => this.pressed(a));
    },
    hasTouch() {
      return touchSeen;
    },
  };

  window.Input = Input;
})();
