(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
    // close on link tap (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && window.innerWidth <= 860) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Rotating hero prompt (the signature element) ---
  var el = document.getElementById("rotating-prompt");
  var data = document.getElementById("prompt-data");
  if (!el || !data) return;

  var items = data.querySelectorAll("li");
  var prompts = Array.prototype.map.call(items, function (li) { return li.textContent.trim(); });
  if (prompts.length < 2) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // respect reduced-motion: leave the first prompt static

  var i = 0;
  setInterval(function () {
    el.classList.add("is-fading");
    setTimeout(function () {
      i = (i + 1) % prompts.length;
      el.textContent = prompts[i];
      el.classList.remove("is-fading");
    }, 500);
  }, 4200);
})();

(function () {
  "use strict";
  // --- Auto-flipping "look inside" book showcase ---
  var flip = document.querySelector(".book-flip");
  if (!flip) return;
  var imgs = flip.querySelectorAll(".book-flip__img");
  if (imgs.length < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var i = 0;
  setInterval(function () {
    imgs[i].classList.remove("is-active");
    i = (i + 1) % imgs.length;
    imgs[i].classList.add("is-active");
  }, 3400);
})();
