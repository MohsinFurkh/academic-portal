/* =====================================================================
   CSEG3060 · Unit III lecture decks — presenter runtime.

   The important part is repaginate(): the source PowerPoint slides are
   already full at their original (small) type size, so simply enlarging
   the text would overflow.  Instead every content slide is re-flowed at
   the chosen type size and any overflow is carried onto a continuation
   slide, so the type stays legible from the back of the hall and no
   content is ever clipped.  Tables repeat their header row when split.

   Keys:  → / ← / Space / PgUp / PgDn / Home / End   navigate
          O overview · F full screen · D dark · T timer
          + / -  text size (persisted)  ·  0 reset text size
   ===================================================================== */
(function () {
    'use strict';

    var deck = document.getElementById('deck');
    if (!deck) return;

    var root = document.documentElement;
    var elCur = document.getElementById('cur');
    var elTot = document.getElementById('tot');
    var elNow = document.getElementById('now');
    var elFill = document.getElementById('pfill');
    var elScale = document.getElementById('tscale');
    var overview = document.getElementById('overview');
    var ovList = overview ? overview.querySelector('.ov-list') : null;

    /* templates: the slides exactly as generated, before pagination */
    var templates = Array.prototype.slice.call(deck.children).map(function (s) { return s.cloneNode(true); });

    var slides = [];
    var total = 0;
    var idx = 0;

    /* ------------------------------------------------- text scale ---- */
    var scale = 1;
    try {
        var st = parseFloat(localStorage.getItem('rm-deck-tscale'));
        if (st >= 0.6 && st <= 1.8) scale = st;
    } catch (e) { }

    function setScaleVar() {
        root.style.setProperty('--tscale', scale.toFixed(2));
        if (elScale) elScale.textContent = Math.round(scale * 100) + '%';
    }

    function bumpScale(d) {
        var at = slides[idx] ? slides[idx].dataset.src : '0';
        scale = Math.min(1.8, Math.max(0.6, Math.round((scale + d) * 100) / 100));
        setScaleVar();
        try { localStorage.setItem('rm-deck-tscale', String(scale)); } catch (e) { }
        repaginate();
        goToSource(at);
    }

    /* -------------------------------------------------- theme -------- */
    try {
        var th = localStorage.getItem('rm-deck-theme');
        if (th) root.setAttribute('data-theme', th);
    } catch (e) { }

    /* ---------------------------------------------- pagination ------- */

    /* Break a block into the atomic units that may be spread over slides. */
    function unitsOf(el) {
        if (el.tagName === 'TABLE' && el.classList.contains('mx')) {
            var rows = Array.prototype.slice.call(el.querySelectorAll('tbody > tr'));
            if (rows.length > 1) {
                return {
                    make: function () {
                        var t = el.cloneNode(false);
                        var cg = el.querySelector('colgroup');
                        var th = el.querySelector('thead');
                        if (cg) t.appendChild(cg.cloneNode(true));
                        if (th) t.appendChild(th.cloneNode(true));
                        t.appendChild(document.createElement('tbody'));
                        return t;
                    },
                    into: function (c, u) { c.querySelector('tbody').appendChild(u); },
                    units: rows.map(function (r) { return r.cloneNode(true); }),
                };
            }
        }
        if (el.classList.contains('cards') && el.children.length > 1) {
            var cards = Array.prototype.slice.call(el.children);
            return {
                make: function () { var c = el.cloneNode(false); return c; },
                into: function (c, u) { c.appendChild(u); c.style.setProperty('--n', c.children.length); },
                units: cards.map(function (c) { return c.cloneNode(true); }),
            };
        }
        if (el.classList.contains('numlist') && el.children.length > 1) {
            var lis = Array.prototype.slice.call(el.children);
            return {
                make: function () { return el.cloneNode(false); },
                into: function (c, u) { c.appendChild(u); },
                units: lis.map(function (l) { return l.cloneNode(true); }),
            };
        }
        return { single: el.cloneNode(true) };
    }

    function overflowing(bodyEl) {
        return bodyEl.scrollHeight > bodyEl.clientHeight + 1;
    }

    function measureOn(slide, fn) {
        slide.classList.add('measuring');
        var r = fn();
        slide.classList.remove('measuring');
        return r;
    }

    /* Fill `slide`'s body from `queue`; returns the unplaced remainder. */
    function fillSlide(slide, queue) {
        var bodyEl = slide.querySelector('.body');
        bodyEl.innerHTML = '';
        var rest = [];

        return measureOn(slide, function () {
            /* Containers belong to the slide being filled: a block carried
               over from the previous slide must start a fresh one here, or
               its remaining units are appended to the old slide's table. */
            queue.forEach(function (b) { b.container = null; });

            while (queue.length) {
                var blk = queue[0];

                if (blk.single) {
                    bodyEl.appendChild(blk.single);
                    if (overflowing(bodyEl) && bodyEl.children.length > 1) {
                        bodyEl.removeChild(blk.single);
                        break;
                    }
                    queue.shift();
                    continue;
                }

                // splittable block: add units one at a time
                var container = blk.container;
                if (!container) {
                    container = blk.container = blk.make();
                    bodyEl.appendChild(container);
                }
                var placedAny = false;
                while (blk.units.length) {
                    var u = blk.units[0];
                    blk.into(container, u);
                    if (overflowing(bodyEl) && (bodyEl.children.length > 1 || placedAny)) {
                        u.parentNode.removeChild(u);
                        if (blk.units.length) {
                            if (container.classList && container.classList.contains('cards')) {
                                container.style.setProperty('--n', container.children.length || 1);
                            }
                        }
                        break;
                    }
                    blk.units.shift();
                    placedAny = true;
                }
                if (blk.units.length === 0) { queue.shift(); continue; }
                if (!placedAny && bodyEl.children.length > 1) {
                    // nothing of this block fits next to what is already there
                    bodyEl.removeChild(container);
                    blk.container = null;
                }
                break;
            }
            rest = queue.slice();
            return rest;
        });
    }

    function repaginate() {
        deck.innerHTML = '';

        templates.forEach(function (tpl, ti) {
            var src = String(ti + 1);

            if (!tpl.querySelector('.body')) {          // title / divider slide
                var d = tpl.cloneNode(true);
                d.dataset.src = src;
                deck.appendChild(d);
                return;
            }

            var blocks = Array.prototype.slice.call(tpl.querySelector('.body').children).map(unitsOf);
            var part = 0;
            var produced = [];

            while (true) {
                /* The closer stays in the clone while we fill, so that the
                   space it occupies is reserved and the body cannot end up
                   overflowing once it is put back. */
                var s = tpl.cloneNode(true);
                s.dataset.src = src;
                if (part > 0) {
                    var lede = s.querySelector('.lede');
                    if (lede) lede.remove();
                    var t = s.querySelector('.s-title');
                    if (t && !t.querySelector('.cont')) {
                        var sup = document.createElement('span');
                        sup.className = 'cont';
                        sup.textContent = 'cont.';
                        t.appendChild(document.createTextNode(' '));
                        t.appendChild(sup);
                    }
                }
                deck.appendChild(s);
                produced.push(s);

                blocks = fillSlide(s, blocks);
                part++;

                if (!blocks.length) break;
                if (part > 8) break;                     // safety valve
            }

            /* only the final part of a group carries the closing line */
            produced.slice(0, -1).forEach(function (p) {
                var c = p.querySelector('.closer');
                if (c) c.remove();
            });
        });

        slides = Array.prototype.slice.call(deck.children);
        total = slides.length;

        slides.forEach(function (s, i) {
            var f = s.querySelector('.s-foot span:last-child');
            if (f) f.textContent = (i + 1) + ' / ' + total;
            s.dataset.n = String(i + 1);
        });
        if (elTot) elTot.textContent = String(total);

        buildOverview();
        lastResort();
    }

    /* If one atomic unit is taller than a whole slide, shrink just that slide. */
    function lastResort() {
        slides.forEach(function (s) {
            var inner = s.querySelector('.fit-in');
            var bodyEl = s.querySelector('.body');
            var wrap = s.querySelector('.fit');
            if (!inner || !bodyEl || !wrap) return;

            inner.style.transform = '';
            inner.style.width = '';
            inner.style.height = '';

            measureOn(s, function () {
                if (!overflowing(bodyEl)) return;
                var wrapH = wrap.clientHeight;
                var k = 1;
                /* Scaling re-wraps the text, so the required factor is not
                   exact first time — converge on it in a few passes. */
                for (var i = 0; i < 4 && overflowing(bodyEl); i++) {
                    k = Math.max(0.7, k * Math.min(1, bodyEl.clientHeight / bodyEl.scrollHeight) * 0.995);
                    inner.style.width = (100 / k) + '%';
                    inner.style.height = (wrapH / k) + 'px';
                    inner.style.transform = 'scale(' + k.toFixed(4) + ')';
                    if (k <= 0.7) break;
                }
            });
        });
    }

    function buildOverview() {
        if (!ovList) return;
        ovList.innerHTML = slides.map(function (s, i) {
            var t = s.querySelector('.s-title') || s.querySelector('.dk-line');
            var label = t ? t.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : 'Slide';
            return '<li><a href="#" data-go="' + (i + 1) + '"><b>' + (i + 1) + '</b> ' + label + '</a></li>';
        }).join('');
    }

    /* ------------------------------------------------ navigation ----- */
    function show(n) {
        idx = Math.max(0, Math.min(total - 1, n));
        slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });

        var s = slides[idx];
        if (elCur) elCur.textContent = String(idx + 1);
        if (elFill) elFill.style.width = ((idx + 1) / total * 100) + '%';
        if (elNow) {
            var t = s.querySelector('.s-title') || s.querySelector('.dk-line');
            elNow.textContent = t ? t.textContent.replace(/\s+/g, ' ').trim() : '';
        }
        try { history.replaceState(null, '', '#' + (idx + 1)); } catch (e) { }
    }

    function goToSource(src) {
        var i = slides.findIndex(function (s) { return s.dataset.src === src; });
        show(i >= 0 ? i : Math.min(idx, total - 1));
    }

    function next() { if (idx < total - 1) show(idx + 1); }
    function prev() { if (idx > 0) show(idx - 1); }

    /* -------------------------------------------------- timer -------- */
    var tStart = null, tTick = null;
    function toggleTimer() {
        var b = document.querySelector('[data-act="timer"]');
        if (tTick) { clearInterval(tTick); tTick = null; if (b) b.textContent = '00:00'; return; }
        tStart = Date.now();
        tTick = setInterval(function () {
            var s = Math.floor((Date.now() - tStart) / 1000);
            if (b) b.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
        }, 500);
    }

    function toggleOverview(force) {
        if (!overview) return;
        var open = force === undefined ? overview.hasAttribute('hidden') : force;
        if (open) overview.removeAttribute('hidden'); else overview.setAttribute('hidden', '');
    }

    /* -------------------------------------------------- actions ------ */
    document.addEventListener('click', function (ev) {
        var go = ev.target.closest('[data-go]');
        if (go) { ev.preventDefault(); show(parseInt(go.getAttribute('data-go'), 10) - 1); toggleOverview(false); return; }
        var b = ev.target.closest('[data-act]');
        if (!b) return;
        var a = b.getAttribute('data-act');
        if (a === 'next') next();
        else if (a === 'prev') prev();
        else if (a === 'bigger') bumpScale(0.05);
        else if (a === 'smaller') bumpScale(-0.05);
        else if (a === 'overview') toggleOverview();
        else if (a === 'timer') toggleTimer();
        else if (a === 'theme') {
            var nx = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', nx);
            try { localStorage.setItem('rm-deck-theme', nx); } catch (e) { }
        } else if (a === 'full') {
            if (document.fullscreenElement) document.exitFullscreen();
            else document.documentElement.requestFullscreen();
        }
    });

    document.addEventListener('keydown', function (ev) {
        if (ev.target.matches('input, textarea')) return;
        var k = ev.key;
        if (k === 'ArrowRight' || k === 'PageDown' || k === ' ') { ev.preventDefault(); next(); }
        else if (k === 'ArrowLeft' || k === 'PageUp') { ev.preventDefault(); prev(); }
        else if (k === 'Home') { ev.preventDefault(); show(0); }
        else if (k === 'End') { ev.preventDefault(); show(total - 1); }
        else if (k === 'o' || k === 'O') toggleOverview();
        else if (k === 'Escape') toggleOverview(false);
        else if (k === 't' || k === 'T') toggleTimer();
        else if (k === 'd' || k === 'D') document.querySelector('[data-act="theme"]').click();
        else if (k === 'f' || k === 'F') document.querySelector('[data-act="full"]').click();
        else if (k === '+' || k === '=') bumpScale(0.05);
        else if (k === '-' || k === '_') bumpScale(-0.05);
        else if (k === '0') { scale = 1; setScaleVar(); try { localStorage.setItem('rm-deck-tscale', '1'); } catch (e) { } repaginate(); show(Math.min(idx, total - 1)); }
    });

    var tx = null;
    deck.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    deck.addEventListener('touchend', function (e) {
        if (tx === null) return;
        var dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        tx = null;
    }, { passive: true });

    var rt = null;
    window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () {
            var at = slides[idx] ? slides[idx].dataset.src : '1';
            repaginate(); goToSource(at);
        }, 200);
    });

    /* ---------------------------------------------------- start ------ */
    setScaleVar();
    repaginate();

    var start = parseInt((location.hash || '').replace('#', ''), 10);
    show(isFinite(start) && start >= 1 ? start - 1 : 0);

    function refresh() {
        var at = slides[idx] ? slides[idx].dataset.src : '1';
        repaginate(); goToSource(at);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
})();
