/* =====================================================================
   CSEG8003 - Modelling and Simulation : shared behaviour for the notes
   - theme toggle (remembered in localStorage)
   - table of contents built from the h2.sec / h3.sub headings
   - scroll-spy highlighting + reading progress bar
   ===================================================================== */
(function () {
    'use strict';

    /* ---------------------------------------------------- theme ---- */
    var root = document.documentElement;
    try {
        var saved = localStorage.getItem('ms-notes-theme');
        if (saved) root.setAttribute('data-theme', saved);
    } catch (e) { /* private mode: ignore */ }

    document.addEventListener('click', function (ev) {
        var t = ev.target.closest('[data-action]');
        if (!t) return;
        var a = t.getAttribute('data-action');
        if (a === 'theme') {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('ms-notes-theme', next); } catch (e) { }
        } else if (a === 'print') {
            window.print();
        }
    });

    /* ------------------------------------------------------ toc ---- */
    var tocBox = document.getElementById('toc');
    var page = document.querySelector('.page');
    if (!tocBox || !page) return;

    var heads = Array.prototype.slice.call(page.querySelectorAll('h2.sec, h3.sub'));
    var list = document.createElement('ol');

    heads.forEach(function (h, i) {
        if (!h.id) h.id = 'h' + i;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
        if (h.tagName === 'H3') a.className = 'sub';
        li.appendChild(a);
        list.appendChild(li);
    });
    tocBox.appendChild(list);

    var links = Array.prototype.slice.call(list.querySelectorAll('a'));
    var bar = document.querySelector('.readbar');

    function onScroll() {
        var y = window.scrollY + 110;
        var current = 0;
        for (var i = 0; i < heads.length; i++) {
            if (heads[i].offsetTop <= y) current = i; else break;
        }
        links.forEach(function (a, i) { a.classList.toggle('active', i === current); });

        if (bar) {
            var max = document.body.scrollHeight - window.innerHeight;
            bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
})();
