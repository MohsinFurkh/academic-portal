/* ==========================================================================
   Academic Portal — behaviour
   No dependencies. Everything here is progressive: the pages work without it.

     1  Theme
     2  Mobile navigation
     3  Search
     4  Section scrollspy
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var BASE = root.getAttribute("data-base") || "";

  /* --- 1  Theme ---------------------------------------------------------
     The resolved theme is written to <html data-theme> by an inline script
     in the head so there is no flash; this only wires the toggle.          */

  function initTheme() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    function label() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("title", dark ? "Light theme" : "Dark theme");
    }

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("portal-theme", next); } catch (e) {}
      label();
    });

    label();
  }

  /* --- 2  Mobile navigation --------------------------------------------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.setAttribute("data-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(nav.getAttribute("data-open") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (nav.getAttribute("data-open") === "true" &&
          !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // The menu is a fixed overlay below 54rem only; reset when we grow past it.
    var mq = window.matchMedia("(min-width: 54rem)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(
      function () { setOpen(false); }
    );
  }

  /* --- 3  Search ---------------------------------------------------------
     The index is a static JSON file built by tools/build-search-index.py.
     It is fetched once, on first intent (focus or keypress), so the page
     itself costs nothing.                                                  */

  var IDX = null;
  var idxState = "idle"; // idle | loading | ready | error
  var idxPromise = null;

  function loadIndex() {
    // One shared promise: focus starts the fetch, the first keystroke waits on
    // that same fetch rather than resolving immediately against a null index.
    if (idxPromise) return idxPromise;
    idxState = "loading";
    idxPromise = fetch(BASE + "assets/search-index.json")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (data) {
        IDX = data.records || [];
        // Pre-lowercase once rather than on every keystroke.
        IDX.forEach(function (r) {
          r._h = ((r.t || "") + " " + (r.c || "") + " " + (r.u || "") + " " +
                  (r.k || "") + " " + (r.x || "")).toLowerCase();
          r._t = (r.t || "").toLowerCase();
        });
        idxState = "ready";
        return IDX;
      })
      .catch(function () { idxState = "error"; return null; });
    return idxPromise;
  }

  function score(rec, terms) {
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      if (rec._h.indexOf(term) === -1) return 0;       // every term must appear
      var inTitle = rec._t.indexOf(term);
      if (inTitle === 0) total += 12;                   // title starts with it
      else if (inTitle > 0) {
        total += /\b/.test(rec._t.charAt(inTitle - 1)) ? 8 : 6;
      } else total += 2;                                // matched elsewhere
    }
    if (rec.p) total += rec.p;                          // per-record priority
    return total;
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function highlight(text, terms) {
    var out = escapeHTML(text);
    terms.forEach(function (term) {
      if (!term) return;
      var re = new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  function initSearch(box) {
    if (!box) return;

    var input = box.querySelector(".search__input");
    var panel = box.querySelector(".search__panel");
    var clear = box.querySelector(".search__clear");
    if (!input || !panel) return;

    var hits = [];
    var active = -1;

    function close() {
      box.setAttribute("data-open", "false");
      input.setAttribute("aria-expanded", "false");
      active = -1;
    }

    function open() {
      box.setAttribute("data-open", "true");
      input.setAttribute("aria-expanded", "true");
    }

    function setActive(i) {
      var nodes = panel.querySelectorAll(".search__hit");
      if (!nodes.length) return;
      if (i < 0) i = nodes.length - 1;
      if (i >= nodes.length) i = 0;
      nodes.forEach(function (n) { n.removeAttribute("data-active"); });
      nodes[i].setAttribute("data-active", "true");
      nodes[i].scrollIntoView({ block: "nearest" });
      input.setAttribute("aria-activedescendant", nodes[i].id);
      active = i;
    }

    function message(html) {
      panel.innerHTML = '<p class="search__status">' + html + "</p>";
      open();
    }

    function render(q) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!terms.length) { close(); return; }

      if (idxState === "error") {
        message("Search is unavailable. Browse the course index below.");
        return;
      }
      if (idxState !== "ready") { message("Searching…"); return; }

      hits = [];
      for (var i = 0; i < IDX.length; i++) {
        var s = score(IDX[i], terms);
        if (s > 0) hits.push({ r: IDX[i], s: s });
      }
      hits.sort(function (a, b) { return b.s - a.s || a.r.t.length - b.r.t.length; });
      hits = hits.slice(0, 24);

      if (!hits.length) {
        message("No matches for &ldquo;" + escapeHTML(q) + "&rdquo;.");
        return;
      }

      // Group by course so results read as a path into the library.
      var order = [], groups = {};
      hits.forEach(function (h) {
        var key = h.r.c || "Portal";
        if (!groups[key]) { groups[key] = []; order.push(key); }
        groups[key].push(h.r);
      });

      var html = "", n = 0;
      order.forEach(function (key) {
        html += '<div class="search__group">' +
                '<p class="search__group-head">' + escapeHTML(key) + "</p>";
        groups[key].forEach(function (r) {
          var path = [];
          if (r.u) path.push(escapeHTML(r.u));
          if (r.k) path.push(escapeHTML(r.k));
          html += '<a class="search__hit" id="search-hit-' + n + '" role="option" ' +
                  'href="' + escapeHTML(BASE + r.url) + '">' +
                  '<span class="search__hit-title">' + highlight(r.t, terms) + "</span>" +
                  (path.length
                    ? '<span class="search__hit-path">' +
                      path.map(function (p) { return "<span>" + p + "</span>"; }).join("") +
                      "</span>"
                    : "") +
                  "</a>";
          n++;
        });
        html += "</div>";
      });

      html += '<p class="search__foot"><span>' + hits.length +
              (hits.length === 24 ? "+ results" : hits.length === 1 ? " result" : " results") +
              "</span><span>&uarr;&darr; move &middot; &crarr; open &middot; esc close</span></p>";

      panel.innerHTML = html;
      open();
      active = -1;
    }

    var timer;
    function onInput() {
      var q = input.value.trim();
      box.setAttribute("data-has-query", q ? "true" : "false");
      clearTimeout(timer);
      if (!q) { close(); return; }
      loadIndex().then(function () { render(input.value.trim()); });
      timer = setTimeout(function () { render(q); }, 60);
    }

    input.addEventListener("focus", loadIndex);
    input.addEventListener("input", onInput);

    input.addEventListener("keydown", function (e) {
      var open_ = box.getAttribute("data-open") === "true";
      if (e.key === "ArrowDown") { e.preventDefault(); if (open_) setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (open_) setActive(active - 1); }
      else if (e.key === "Enter") {
        var node = panel.querySelector('.search__hit[data-active="true"]');
        if (node) { e.preventDefault(); window.location.href = node.href; }
      } else if (e.key === "Escape") {
        if (open_) { close(); } else { input.value = ""; box.setAttribute("data-has-query", "false"); }
      }
    });

    if (clear) {
      clear.addEventListener("click", function () {
        input.value = "";
        box.setAttribute("data-has-query", "false");
        close();
        input.focus();
      });
    }

    document.addEventListener("click", function (e) {
      if (!box.contains(e.target)) close();
    });

  }

  /* The masthead carries a search field on every page; it is collapsed until
     asked for, by the toolbar button or by "/". */
  function initSearchAll() {
    var boxes = document.querySelectorAll("[data-search]");
    Array.prototype.forEach.call(boxes, initSearch);
    if (!boxes.length) return;

    var toggle = document.querySelector(".search-toggle");
    var drawer = document.getElementById("masthead-search");

    function openDrawer() {
      if (!drawer) return null;
      drawer.setAttribute("data-open", "true");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      return drawer.querySelector(".search__input");
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.setAttribute("data-open", "false");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        if (drawer.getAttribute("data-open") === "true") {
          closeDrawer();
          return;
        }
        var field = openDrawer();
        if (field) field.focus();
      });
    }

    function visibleInput() {
      // The drawer collapses by clipping, which does not change the input's
      // own box, so measuring it proves nothing. Look for a field that lives
      // outside the drawer instead: on the home page that is the hero search.
      for (var i = 0; i < boxes.length; i++) {
        var el = boxes[i].querySelector(".search__input");
        if (!el || (drawer && drawer.contains(el))) continue;
        if (el.offsetParent !== null && el.getBoundingClientRect().height > 4) return el;
      }
      return null;
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer && drawer.getAttribute("data-open") === "true") {
        closeDrawer();
        if (toggle) toggle.focus();
        return;
      }
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      var field = visibleInput() || openDrawer();
      if (field) { field.focus(); field.select(); }
    });
  }

  /* --- 4  Section scrollspy ---------------------------------------------- */

  function initSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc__link"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var targets = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    if (!targets.length) return;

    var visible = new Set();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target.id);
        else visible.delete(en.target.id);
      });
      var first = targets.filter(function (t) { return visible.has(t.id); })[0];
      links.forEach(function (a) {
        var on = first && a.getAttribute("href") === "#" + first.id;
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-72px 0px -60% 0px", threshold: 0 });

    targets.forEach(function (t) { io.observe(t); });
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initTheme();
    initNav();
    initSearchAll();
    initSpy();
    document.documentElement.classList.add("js");
  });
})();
