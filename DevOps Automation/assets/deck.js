/* ============================================================
   DevOps Automation — shared lecture-deck engine
   Loaded at the end of <body>, before each lecture's own script.
   Exposes: go() show() toggleOverview() toggleTheme() goFull() makeDrill()
   ============================================================ */
const slides = [...document.querySelectorAll('.slide')];
let cur = 0;

slides.forEach(s => {
    const fit = document.createElement('div');
    fit.className = 'fit';
    while (s.firstChild) fit.appendChild(s.firstChild);
    s.appendChild(fit);
});

function fitSlide(s) {
    const f = s.querySelector('.fit');
    if (!f) return;
    f.style.transform = 'none';
    const cs = getComputedStyle(s);
    const avail = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const h = f.offsetHeight;
    if (avail <= 0 || h <= 0) return;
    const k = Math.min(1, avail / h);
    f.style.transform = k > 0.995 ? 'none' : 'scale(' + k.toFixed(4) + ')';
}
const fitNow = () => fitSlide(slides[cur]);
const fitSoon = () => requestAnimationFrame(() => requestAnimationFrame(fitNow));
window.addEventListener('resize', fitNow);
document.addEventListener('click', fitSoon, true);
document.addEventListener('change', fitSoon, true);
document.addEventListener('input', fitSoon, true);

function show(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, k) => s.classList.toggle('active', k === cur));
    document.getElementById('count').textContent = (cur + 1) + ' / ' + slides.length;
    document.getElementById('title-now').textContent = slides[cur].dataset.title || '';
    document.getElementById('bar').style.width = ((cur + 1) / slides.length * 100) + '%';
    slides[cur].scrollTop = 0;
    location.hash = 's' + (cur + 1);
    fitSlide(slides[cur]);
}
function go(d) { show(cur + d); }

document.addEventListener('keydown', e => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (e.key === 'Escape') { document.getElementById('overview').classList.add('hidden'); return; }
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key.toLowerCase() === 'o') toggleOverview();
    else if (e.key.toLowerCase() === 'd') toggleTheme();
    else if (e.key.toLowerCase() === 'f') goFull();
    else if (e.key.toLowerCase() === 't') { const t = document.getElementById('lect-t'); t.__toggle && t.__toggle(); }
});

let tx = 0;
document.addEventListener('touchstart', e => tx = e.changedTouches[0].clientX, { passive: true });
document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 70) go(dx < 0 ? 1 : -1);
}, { passive: true });

function toggleTheme() {
    const h = document.documentElement;
    h.dataset.theme = h.dataset.theme === 'dark' ? 'light' : 'dark';
}
function goFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
}
function toggleOverview() { document.getElementById('overview').classList.toggle('hidden'); }

const ovList = document.getElementById('ov-list');
slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'ov-item';
    b.innerHTML = '<b>' + (i + 1) + '</b><span>' + (s.dataset.title || '') + '</span>' +
        (s.dataset.mode === 'do' ? '<span class="do-dot">STUDENT WORK</span>' : '');
    b.onclick = () => { show(i); toggleOverview(); };
    ovList.appendChild(b);
});

document.querySelectorAll('[data-reveal]').forEach(b => {
    const label = b.textContent;
    b.addEventListener('click', () => {
        const t = document.querySelector(b.dataset.reveal);
        t.classList.toggle('hidden');
        b.textContent = t.classList.contains('hidden') ? label : 'Hide again';
    });
});

document.querySelectorAll('.timer').forEach(box => {
    const disp = box.querySelector('.t');
    const total = parseInt(disp.dataset.sec, 10);
    let left = total, id = null;
    const fmt = s => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const paint = () => {
        disp.textContent = fmt(left);
        disp.classList.toggle('low', left <= Math.max(10, total * 0.15));
    };
    const tick = () => { if (left > 0) { left--; paint(); } else { clearInterval(id); id = null; } };
    const toggle = () => { if (id) { clearInterval(id); id = null; } else { id = setInterval(tick, 1000); } };
    disp.__toggle = toggle;
    box.querySelector('[data-timer=start]').addEventListener('click', toggle);
    box.querySelector('[data-timer=reset]').addEventListener('click', () => {
        clearInterval(id); id = null; left = total; paint();
    });
    paint();
});

/* ---------------- generic drill engine ---------------- */
function makeDrill(p, items, done) {
    const el = k => document.getElementById(p + '-' + k);
    const opts = el('opts');
    let i = 0, sc = 0, lock = false;

    function paint() {
        el('n').textContent = i + 1;
        el('total').textContent = items.length;
        el('stmt').innerHTML = items[i].q;
        el('score').textContent = sc;
        el('fb').classList.add('hidden');
        opts.innerHTML = '';
        items[i].o.forEach((t, k) => {
            const b = document.createElement('button');
            b.className = 'pick';
            b.innerHTML = '<b>' + 'ABCDEF'[k] + '.</b> ' + t;
            b.addEventListener('click', () => {
                if (lock) return;
                lock = true;
                const right = items[i].a;
                if (k === right) { b.classList.add('right'); sc++; }
                else { b.classList.add('wrong'); opts.children[right].classList.add('right'); }
                el('score').textContent = sc;
                const fb = el('fb');
                fb.innerHTML = items[i].w;
                fb.classList.remove('hidden');
            });
            opts.appendChild(b);
        });
        lock = false;
    }

    el('next').addEventListener('click', () => {
        if (i < items.length - 1) { i++; paint(); }
        else {
            const fb = el('fb');
            fb.classList.remove('hidden');
            fb.innerHTML = done(sc, items.length);
        }
    });
    const r = document.getElementById(p + '-restart');
    if (r) r.addEventListener('click', () => { i = 0; sc = 0; paint(); });
    paint();
}

/* ---------------- boot ----------------
   Runs on DOMContentLoaded, i.e. after each lecture's inline script has
   populated its drills, so the first slide is measured at its final height. */
document.addEventListener('DOMContentLoaded', () => {
    const h0 = parseInt((location.hash || '').replace('#s', ''), 10);
    show(Number.isFinite(h0) && h0 > 0 ? h0 - 1 : 0);
});
