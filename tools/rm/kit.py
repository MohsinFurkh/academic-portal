# -*- coding: utf-8 -*-
"""
Build kit for CSEG3060 Unit III — lecture decks and student notes.

Two renderers:
  * deck(meta, slides, notes)  -> self-contained 1280x720 HTML deck
                                  (CSS lifted verbatim from the superseded
                                   Unit III Part decks so the house style holds)
  * notes(meta, body)          -> reading document on ../assets/notes.css

Slide/notes content is written with the small helper vocabulary below rather
than raw HTML, so markup stays valid and uniform across all eight lectures.
"""

import html
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
DECK_CSS = open(os.path.join(HERE, "deck_style.css"), encoding="utf-8").read()

# --------------------------------------------------------------- inline bits

def esc(s):
    return html.escape(s, quote=False)


def md(s):
    """Very small inline markup: **bold**, *italic*, `code`, [[math]]."""
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    s = re.sub(r"`(.+?)`", r"<code>\1</code>", s)
    s = re.sub(r"\[\[(.+?)\]\]", r'<span class="mv">\1</span>', s)
    return s


# ------------------------------------------------------------ deck vocabulary

def p(text, cls=None, style=None):
    a = f' class="{cls}"' if cls else ""
    b = f' style="{style}"' if style else ""
    return f"<p{a}{b}>{md(text)}</p>"


def ul(items, cls=None, style=None):
    a = f' class="{cls}"' if cls else ""
    b = f' style="{style}"' if style else ""
    li = "".join(f"<li>{md(i)}</li>" for i in items)
    return f"<ul{a}{b}>{li}</ul>"


def ol(items, cls=None, style=None):
    a = f' class="{cls}"' if cls else ""
    b = f' style="{style}"' if style else ""
    li = "".join(f"<li>{md(i)}</li>" for i in items)
    return f"<ol{a}{b}>{li}</ol>"


def card(inner, head=None, cls="", style=None):
    b = f' style="{style}"' if style else ""
    h = f"<h3>{md(head)}</h3>" if head else ""
    return f'<div class="card {cls}"{b}>{h}{inner}</div>'


def rule(text):
    return f'<div class="rule">{md(text)}</div>'


def grid(children, cols="1fr 1fr", cls="", gap=None, style=""):
    g = f"gap:{gap};" if gap else ""
    return (f'<div class="grid {cls}" style="grid-template-columns:{cols};{g}{style}">'
            + "".join(children) + "</div>")


def goals(items, tone="", start=1):
    rows = []
    for k, t in enumerate(items, start):
        rows.append(f'<div class="goal"><span class="badge {tone}">'
                    f'{k:02d}</span><p style="margin:0">{md(t)}</p></div>')
    return "".join(rows)


def table(headers, rows, style=None):
    b = f' style="{style}"' if style else ""
    th = "".join(f"<th>{md(h)}</th>" for h in headers)
    tr = ""
    for r in rows:
        tr += "<tr>" + "".join(f"<td>{md(c)}</td>" for c in r) + "</tr>"
    return (f'<table{b}><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table>')


def chips(items, style=""):
    inner = " ".join(f'<span class="chip">{md(i)}</span>' for i in items)
    return f'<div style="display:flex;flex-wrap:wrap;gap:6px;{style}">{inner}</div>'


def codeline(text):
    return f'<span class="codeline">{md(text)}</span>'


def eqbox(text, tone="ink"):
    """Centred display equation for a slide."""
    bg = "var(--ink)" if tone == "ink" else "var(--card-2)"
    fg = "var(--mint)" if tone == "ink" else "var(--ink)"
    bd = "" if tone == "ink" else "border:1px dashed var(--line);"
    return (f'<div style="background:{bg};color:{fg};{bd}border-radius:10px;'
            f'padding:11px 16px;text-align:center;font-size:19px;'
            f'font-family:Georgia,\'Times New Roman\',serif">{text}</div>')


def stack(children, gap=12, style=""):
    return (f'<div style="display:flex;flex-direction:column;gap:{gap}px;{style}">'
            + "".join(children) + "</div>")


def row(children, gap=12, style=""):
    return (f'<div style="display:flex;gap:{gap}px;{style}">'
            + "".join(children) + "</div>")


def flow(steps, tone="ink"):
    """Horizontal arrow chain of short labels."""
    parts = []
    for i, s in enumerate(steps):
        if i:
            parts.append('<span style="color:var(--rust);font-weight:700;'
                         'align-self:center">&rarr;</span>')
        parts.append(f'<div class="card tint" style="flex:1;padding:10px 12px;'
                     f'font-size:14px;text-align:center">{md(s)}</div>')
    return ('<div style="display:flex;gap:8px;align-items:stretch">'
            + "".join(parts) + "</div>")


def gauge(bands):
    """bands = [(label, colour, note), ...] rendered as a colour ladder."""
    out = []
    for label, colour, note in bands:
        out.append(
            f'<div style="display:flex;align-items:center;gap:10px">'
            f'<span style="width:74px;text-align:right;font-family:var(--mono);'
            f'font-size:13px;font-weight:700">{md(label)}</span>'
            f'<span style="flex:0 0 14px;height:26px;border-radius:4px;'
            f'background:{colour}"></span>'
            f'<span style="font-size:14px">{md(note)}</span></div>')
    return stack(out, gap=7)


# ------------------------------------------------------------- deck rendering

SLIDE_T = """            <!-- ============ {n} ============ -->
            <section class="slide{dark}" data-title="{title}">
{head}
                <div class="body">{body}</div>
{foot}
            </section>
"""


def _slide(n, s, runner, total):
    dark = " dark" if s.get("dark") else ""
    head = []
    if s.get("kicker"):
        head.append(f'                <p class="kicker">{md(s["kicker"])}</p>')
    if s.get("h1"):
        head.append(f'                <h1>{md(s["h1"])}</h1>')
    elif s.get("h"):
        head.append(f'                <h2>{md(s["h"])}</h2>')
    if s.get("lead"):
        head.append(f'                <p class="lead">{md(s["lead"])}</p>')
    foot = ("" if s.get("nofoot") else
            f'                <footer><span>{esc(runner)}</span>'
            f'<span class="num">{n}</span></footer>')
    return SLIDE_T.format(n=n, dark=dark, title=esc(s.get("title", "")),
                          head="\n".join(head), body=s.get("body", ""), foot=foot)


DECK_T = """<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <style>
{css}    </style>
</head>

<body>
    <div id="stage-wrap">
        <div id="stage">

{slides}
        </div>
    </div>

    <div class="progress" id="bar" style="width:0"></div>
    <div class="bar">
        <button onclick="go(-1)">&larr;</button>
        <button onclick="go(1)">&rarr;</button>
        <span class="count" id="count">1 / {total}</span>
        <span class="now" id="now"></span>
        <button onclick="toggleNotes()">Notes (N)</button>
        <button onclick="toggleOverview()">Slides (O)</button>
        <button onclick="goFull()">Full screen (F)</button>
        <button onclick="window.print()">Print</button>
    </div>

    <div class="panel" id="overview">
        <h2>Slides &mdash; click to jump <span class="fine" style="float:right; color:#8fa7ab">Esc to close</span></h2>
        <div class="ov-grid" id="ov-list"></div>
    </div>

    <div id="notes">
        <h3>Speaker notes</h3>
        <div id="notes-body"></div>
    </div>

    <script>
        const NOTES = {{
{notes}
        }};

        const slides = [...document.querySelectorAll('.slide')];
        const stage = document.getElementById('stage');
        let cur = 0;

        function fitStage() {{
            const pad = 20, barH = 40;
            const w = window.innerWidth - pad * 2;
            const h = window.innerHeight - barH - pad * 2;
            const k = Math.min(w / 1280, h / 720);
            stage.style.transform = 'translate(-50%,-50%) scale(' + k + ')';
        }}
        window.addEventListener('resize', fitStage);

        function show(i) {{
            cur = Math.max(0, Math.min(slides.length - 1, i));
            slides.forEach((s, k) => s.classList.toggle('active', k === cur));
            document.getElementById('count').textContent = (cur + 1) + ' / ' + slides.length;
            document.getElementById('now').textContent = slides[cur].dataset.title || '';
            document.getElementById('bar').style.width = ((cur + 1) / slides.length * 100) + '%';
            const n = NOTES[cur + 1];
            document.getElementById('notes-body').innerHTML = n
                ? '<p style="margin:0">' + n + '</p>'
                : '<p style="margin:0; opacity:.6">No notes for this slide.</p>';
            location.hash = 's' + (cur + 1);
        }}
        function go(d) {{ show(cur + d); }}
        function toggleOverview() {{ document.getElementById('overview').classList.toggle('open'); }}
        function toggleNotes() {{ document.getElementById('notes').classList.toggle('open'); }}
        function goFull() {{
            if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
            else document.exitFullscreen?.();
        }}

        document.addEventListener('keydown', e => {{
            if (e.key === 'Escape') {{ document.getElementById('overview').classList.remove('open'); return; }}
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {{ e.preventDefault(); go(1); }}
            else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {{ e.preventDefault(); go(-1); }}
            else if (e.key === 'Home') show(0);
            else if (e.key === 'End') show(slides.length - 1);
            else if (e.key.toLowerCase() === 'o') toggleOverview();
            else if (e.key.toLowerCase() === 'n') toggleNotes();
            else if (e.key.toLowerCase() === 'f') goFull();
            else if (e.key.toLowerCase() === 'p') window.print();
        }});

        let tx = 0;
        document.addEventListener('touchstart', e => tx = e.changedTouches[0].clientX, {{ passive: true }});
        document.addEventListener('touchend', e => {{
            const dx = e.changedTouches[0].clientX - tx;
            if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}, {{ passive: true }});

        const ov = document.getElementById('ov-list');
        slides.forEach((s, i) => {{
            const b = document.createElement('button');
            b.className = 'ov-item';
            b.innerHTML = '<b>' + String(i + 1).padStart(2, '0') + '</b>' + (s.dataset.title || '');
            b.onclick = () => {{ show(i); toggleOverview(); }};
            ov.appendChild(b);
        }});

        fitStage();
        const h0 = parseInt((location.hash || '').replace('#s', ''), 10);
        show(Number.isFinite(h0) && h0 > 0 ? h0 - 1 : 0);
    </script>
</body>

</html>
"""


def deck(meta, slides, notes):
    total = len(slides)
    runner = meta["runner"]
    body = "".join(_slide(i, s, runner, total) for i, s in enumerate(slides, 1))
    nl = []
    for k in sorted(notes):
        txt = notes[k].replace('"', '\\"')
        nl.append(f'            {k}: "{txt}",')
    return DECK_T.format(title=esc(meta["title"]), desc=esc(meta["desc"]),
                         css=DECK_CSS, slides=body, total=total,
                         notes="\n".join(nl).rstrip(","))


# ------------------------------------------------------------ notes vocabulary

def sec(n, title, sid):
    return f'<h2 class="sec" id="{sid}"><span class="n">{n}.</span> {md(title)}</h2>'


def sub(title, sid):
    return f'<h3 class="sub" id="{sid}">{md(title)}</h3>'


def box(kind, title, inner):
    return (f'<div class="box {kind}"><div class="bt">{md(title)}</div>'
            f'<div class="bb">{inner}</div></div>')


def eq(text, tag=None):
    t = f'<span class="tag">{md(tag)}</span>' if tag else ""
    return f'<div class="eq">{t}{text}</div>'


def qlist(items):
    li = "".join(f"<li>{md(i)}</li>" for i in items)
    return f'<ol class="qlist">{li}</ol>'


def marks(m):
    return f'<span class="marks">{md(m)}</span>'


def tw(inner):
    return f'<div class="tw">{inner}</div>'


NOTES_T = """<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <link rel="stylesheet" href="../assets/notes.css">
</head>

<body>
    <div class="readbar"></div>

    <div class="topbar">
        <span class="code">CSEG3060</span>
        <a href="../index.html">Course home</a>
        <a href="../../index.html">Portal</a>
        <span class="spacer"></span>
        <button type="button" data-action="theme">Dark / Light</button>
        <button type="button" data-action="print">Print / PDF</button>
    </div>

    <div class="wrap">
        <aside class="toc" id="toc">
            <h2>Contents</h2>
        </aside>

        <main class="page">

            <div class="titleblock">
                <div class="school">UPES &middot; University of Tomorrow</div>
                <div class="course">CSEG3060 &mdash; Research Methodology in Computer Science &middot; L-T-P-C 3-0-0-3</div>
                <div class="unitno">Unit III &middot; Lecture {lecno}</div>
                <div class="unit">{lectitle}</div>
                <div class="sub">{subline}</div>
                <div class="badges">
{badges}
                </div>
            </div>

{body}

            <div class="pager">
{pager}
            </div>

            <div class="docfoot">
                CSEG3060 Research Methodology in Computer Science &middot; Unit III &middot; Lecture {lecno} student
                notes &middot; Dr. Mohsin Furkh Dar &middot; School of Computer Science, UPES.
                Companion slide deck: <a href="{deck}">{decklabel}</a>.
            </div>

        </main>
    </div>

    <script src="../assets/notes.js"></script>
</body>

</html>
"""


def notes(meta, body):
    badges = "\n".join(f"                    <span>{md(b)}</span>"
                       for b in meta["badges"])
    pager = "\n".join(f"                <a href=\"{h}\">{t}</a>"
                      for h, t in meta["pager"])
    return NOTES_T.format(title=esc(meta["title"]), desc=esc(meta["desc"]),
                          lecno=meta["lecno"], lectitle=md(meta["lectitle"]),
                          subline=md(meta["subline"]), badges=badges,
                          body=body, pager=pager, deck=meta["deck"],
                          decklabel=md(meta["decklabel"]))


# --------------------------------------------------------------- hub page ----

HUB_T = """<!DOCTYPE html>
<html lang="en" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSEG3060 &middot; Unit III &mdash; Ethical Conduct and Literature Studies</title>
    <meta name="description"
        content="Unit III of Research Methodology in Computer Science (CSEG3060): eight lectures on literature studies, review methods, literature analysis, plagiarism and its prevention, research ethics and regulatory frameworks. Slide deck and student notes for each lecture.">
    <link rel="stylesheet" href="../assets/notes.css">
    <style>
        .lec {{
            display: grid;
            grid-template-columns: 3.2rem minmax(0, 1fr) auto;
            align-items: start;
            gap: .35rem 1.1rem;
            padding: 1.05rem 0;
            border-bottom: 1px solid var(--line);
        }}
        .lec:last-of-type {{ border-bottom: 0; }}
        .lec .no {{
            grid-row: 1 / span 3;
            font-family: var(--mono, monospace);
            font-size: .82rem;
            font-weight: 700;
            color: var(--accent, #b5452a);
            padding-top: .2rem;
        }}
        .lec h3 {{
            grid-column: 2;
            margin: 0;
            font-size: 1.06rem;
            line-height: 1.3;
        }}
        .lec p {{
            grid-column: 2;
            margin: 0;
            font-size: .92rem;
            color: var(--ink-faint, #6b6b6b);
            line-height: 1.55;
        }}
        .lec .links {{
            grid-column: 2;
            display: flex;
            flex-wrap: wrap;
            gap: .5rem .9rem;
            margin-top: .15rem;
            font-size: .86rem;
        }}
        .lec .links a {{ font-weight: 600; }}
        .lec .co {{
            grid-column: 3;
            grid-row: 1;
            justify-self: end;
            font-family: var(--mono, monospace);
            font-size: .72rem;
            letter-spacing: .08em;
            color: var(--ink-faint, #6b6b6b);
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: .12rem .55rem;
        }}
        @media (max-width: 640px) {{
            .lec {{ grid-template-columns: 2.4rem minmax(0, 1fr); }}
            .lec .co {{ grid-column: 2; grid-row: auto; justify-self: start; }}
        }}
    </style>
</head>

<body>
    <div class="readbar"></div>

    <div class="topbar">
        <span class="code">CSEG3060</span>
        <a href="../index.html">Course home</a>
        <a href="../../index.html">Portal</a>
        <span class="spacer"></span>
        <button type="button" data-action="theme">Dark / Light</button>
        <button type="button" data-action="print">Print / PDF</button>
    </div>

    <div class="wrap">
        <aside class="toc" id="toc">
            <h2>Contents</h2>
        </aside>

        <main class="page">

            <div class="titleblock">
                <div class="school">UPES &middot; University of Tomorrow</div>
                <div class="course">CSEG3060 &mdash; Research Methodology in Computer Science &middot; L-T-P-C 3-0-0-3</div>
                <div class="unitno">Unit III</div>
                <div class="unit">Ethical Conduct and Literature Studies</div>
                <div class="sub">8 syllabus hours &middot; 8 lectures &middot; B.Tech. (Computer Science &amp; Engineering)
                    &middot; Dr. Mohsin Furkh Dar</div>
                <div class="badges">
                    <span>CO2</span>
                    <span>CO3</span>
                    <span>Literature studies</span>
                    <span>Review methods</span>
                    <span>Plagiarism</span>
                    <span>Research ethics</span>
                    <span>Regulation</span>
                </div>
            </div>

            <div class="box def">
                <div class="bt">Syllabus covered in this unit</div>
                <div class="bb">
                    <ul>
                        <li><span class="kw">Literature studies:</span> objectives, scope and significance; approaches to
                            literature review; and the analysis techniques that turn a corpus into an argument.</li>
                        <li><span class="kw">Ethical conduct:</span> plagiarism and its prevention; the foundational
                            principles of research ethics; the domains in which they apply; and the regulatory and
                            institutional machinery that enforces them.</li>
                    </ul>
                    <p><span class="kw">Course outcomes addressed &mdash; CO2:</span> demonstrate an understanding of
                        literature exploration and ethical considerations in conducting research.
                        <span class="kw">CO3:</span> demonstrate ethical conduct in research with adherence to academic
                        integrity standards.</p>
                </div>
            </div>

            <div class="box exam">
                <div class="bt">How this unit is organised</div>
                <div class="bb">
                    <p>Each lecture has two companion documents: a <span class="kw">slide deck</span> for the session
                        itself, and a set of <span class="kw">student notes</span> written for revision. The decks run
                        in the browser &mdash; arrow keys or space to advance, <b>O</b> for the slide overview,
                        <b>N</b> for speaker notes, <b>F</b> for full screen and <b>P</b> to print. The notes open as a
                        single reading document with a contents sidebar, a dark/light toggle and a
                        <b>Print / PDF</b> button.</p>
                    <p>The unit divides into two halves. <span class="kw">Lectures 1&ndash;3</span> build the literature
                        study &mdash; why it matters, which review method answers which question, and how to appraise
                        and synthesise what you find. <span class="kw">Lectures 4&ndash;8</span> turn to ethical
                        conduct, moving from one specific violation and its prevention, through the principles that
                        underlie the rules, to the committees and regulations that enforce them.</p>
                </div>
            </div>

            <h2 class="sec" id="lectures"><span class="n">1.</span> Lectures</h2>
{lectures}

            <h2 class="sec" id="reading"><span class="n">2.</span> Reading Path</h2>
            <p>If you are revising the whole unit, read the notes in order &mdash; each set links to the next at the
                foot of the page. If you are preparing a specific assessment:</p>
            <ul>
                <li><span class="kw">Your project literature review</span> &mdash; Lectures 1, 2 and 3, then the
                    prevention workflow in Lecture 5.</li>
                <li><span class="kw">Quiz and class test on ethics</span> &mdash; Lectures 4 and 5 for plagiarism,
                    then 6 and 7 for principles and domains.</li>
                <li><span class="kw">Case-study assessment</span> &mdash; Lecture 8, together with the case sections of
                    Lectures 4, 6 and 7.</li>
            </ul>

            <div class="box caution">
                <div class="bt">Before you rely on a threshold</div>
                <div class="bb">
                    <p>The UGC similarity tiers and the UPES-specific thresholds, tools and workflow quoted in Lectures
                        5 and 8 are reproduced from the lecture notes. Because examinations ask for exact percentages,
                        confirm them against the current gazette text of the UGC Regulations and the live UPES
                        Academic Integrity policy before relying on them.</p>
                </div>
            </div>

            <div class="pager">
                <a href="../index.html">&larr; Course home</a>
                <a href="CSEG3060_Unit3_L01_Effective_Literature_Studies_Notes.html">Start with Lecture 1 &rarr;</a>
            </div>

            <div class="docfoot">
                CSEG3060 Research Methodology in Computer Science &middot; Unit III &middot;
                Dr. Mohsin Furkh Dar &middot; School of Computer Science, UPES.
            </div>

        </main>
    </div>

    <script src="../assets/notes.js"></script>
</body>

</html>
"""

LEC_T = """            <div class="lec">
                <span class="no">{no}</span>
                <span class="co">{co}</span>
                <h3>{title}</h3>
                <p>{blurb}</p>
                <div class="links">
                    <a href="{deck}">Slides &rarr;</a>
                    <a href="{notes}">Notes &rarr;</a>
                </div>
            </div>
"""


def hub(lectures):
    rows = "".join(LEC_T.format(**lec) for lec in lectures)
    return HUB_T.format(lectures=rows)
