#!/usr/bin/env python3
"""Generate the Machine Learning Foundations course page.

Lecture titles, parts and blurbs are read out of the lecture files themselves,
so the page cannot drift from the material. Reading-list links were each
checked to resolve; the books are not redistributed here.
"""

import glob
import os
import re
import sys

from bs4 import BeautifulSoup

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shell as S
from catalogue import COURSES, STATUS_LABEL

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = "Machine Learning Foundations"
C = next(c for c in COURSES if c["dir"] == DIR)

PHASES = [
    ("A", "ML-Foundations-PhaseA", "Mathematics",
     "The functions, calculus, linear algebra and probability that machine "
     "learning rests on — built in the order the algorithms need them, and "
     "derived rather than quoted."),
    ("B", "ML-Foundations-PhaseB", "Classical Machine Learning",
     "The algorithms themselves, each one derived from the mathematics of "
     "Phase A: what it optimises, what it assumes, and what breaks when the "
     "assumption fails."),
]

# Phases C and D are described in the material's own roadmap but not written.
PLANNED = [
    ("C", "Statistical Learning Theory &amp; Deep Learning",
     "Generalisation and empirical risk minimisation, then computational "
     "graphs, automatic differentiation, backpropagation, convolutional and "
     "recurrent networks, attention and Transformers."),
    ("D", "Advanced &amp; Research Machine Learning",
     "Probabilistic graphical models, variational inference, Monte Carlo "
     "methods, generative models, reinforcement learning and information "
     "theory."),
]


def clean(t):
    return re.sub(r"\s+", " ", (t or "")).strip()


def read_phase(folder):
    """Every lecture in a phase, grouped by the part it belongs to."""
    parts, seen = [], {}
    for f in sorted(glob.glob(os.path.join(ROOT, DIR, folder, "[0-9][0-9]-*.html"))):
        soup = BeautifulSoup(open(f, encoding="utf-8", errors="replace").read(),
                             "html.parser")
        for t in soup(["script", "style"]):
            t.decompose()

        title = clean(soup.title.string if soup.title else "")
        title = re.sub(r"\s*—\s*ML (Foundations|Phase [AB])\s*$", "", title)
        title = re.sub(r"^\d+\.\s*", "", title)

        lead = ""
        h1 = soup.find("h1")
        if h1:
            p = h1.find_next("p")
            if p:
                lead = clean(p.get_text(" ", strip=True))

        part = "Lectures"
        el = soup.find(string=re.compile(r"^\s*Part [IVX]+\s+—"))
        if el:
            part = clean(el).split("·")[0].strip()

        if part not in seen:
            seen[part] = {"name": part, "lectures": []}
            parts.append(seen[part])
        seen[part]["lectures"].append({
            "no": os.path.basename(f)[:2],
            "href": f"{folder}/{os.path.basename(f)}",
            "title": title,
            "lead": lead,
        })
    return parts


# --- Reading list --------------------------------------------------------
# "free" links go to the copy the author or publisher gives away; the rest go
# to the publisher or to an Open Library record. Nothing is rehosted here.
FREE = [
    ("Mathematics for Machine Learning",
     "Deisenroth, Faisal &amp; Ong · Cambridge University Press",
     "The single best companion to Phase A. Free PDF from the authors.",
     "https://mml-book.github.io/"),
    ("Deep Learning", "Goodfellow, Bengio &amp; Courville · MIT Press",
     "The standard reference. Part I covers the same mathematics as Phase A.",
     "https://www.deeplearningbook.org/"),
    ("Dive into Deep Learning", "Zhang, Lipton, Li &amp; Smola",
     "Interactive, with runnable code throughout — closest in spirit to these "
     "lectures.", "https://d2l.ai/"),
    ("Understanding Deep Learning", "Simon J. D. Prince · MIT Press",
     "Free PDF from the author; unusually good figures.",
     "https://udlbook.github.io/udlbook/"),
    ("Pattern Recognition and Machine Learning", "Christopher Bishop · Springer",
     "The classical-ML reference behind most of Phase B. Released free by "
     "Microsoft Research.",
     "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/"),
    ("Understanding Machine Learning: From Theory to Algorithms",
     "Shalev-Shwartz &amp; Ben-David · Cambridge University Press",
     "Where Phase C starts: PAC learning, VC dimension, generalisation bounds.",
     "https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/"),
    ("Data Science and Machine Learning: Mathematical and Statistical Methods",
     "Kroese, Botev, Taimre &amp; Vaisman",
     "Heavier on the statistics than most ML texts. Free PDF from the authors.",
     "https://people.smp.uq.edu.au/DirkKroese/DSML/"),
    ("Computer Vision: Algorithms and Applications (2e)",
     "Richard Szeliski", "Free PDF from the author.",
     "https://szeliski.org/Book/"),
    ("Machine Learning Yearning", "Andrew Ng",
     "Not mathematics — judgement. How to decide what to try next.",
     "https://info.deeplearning.ai/machine-learning-yearning-book"),
    ("Statistics and Machine Learning in Python", "Duchesnay, Löfstedt &amp; Younes",
     "Free course notes; useful alongside the NumPy exercises.",
     "https://duchesnay.github.io/pystatsml/"),
    ("Applications of Deep Neural Networks with Keras", "Jeff Heaton",
     "Free on arXiv.", "https://arxiv.org/abs/2009.05673"),
    ("Deep Learning and Computational Physics", "Deep Ray, Orazio Pinti &amp; Assad Oberai",
     "Lecture notes, free on arXiv.", "https://arxiv.org/abs/2301.00942"),
    ("Deep Learning Interviews", "Shlomo Kashani &amp; Amir Ivry",
     "Hundreds of solved problems; good self-testing. Free on arXiv.",
     "https://arxiv.org/abs/2201.00650"),
    ("Multimodal Deep Learning", "Akkus, Chu, Djakovic et al.",
     "A survey, free on arXiv.", "https://arxiv.org/abs/2301.04856"),
]

COMMERCIAL = [
    ("Hands-On Machine Learning with Scikit-Learn, Keras &amp; TensorFlow",
     "Aurélien Géron · O'Reilly",
     "The practical counterpart: read it after the derivation, not instead of it.",
     "https://openlibrary.org/works/OL20709638W"),
    ("Deep Learning with Python (2e)", "François Chollet · Manning",
     "Written by the author of Keras.",
     "https://www.manning.com/books/deep-learning-with-python-second-edition"),
    ("Deep Learning for Vision Systems", "Mohamed Elgendy · Manning", "",
     "https://www.manning.com/books/deep-learning-for-vision-systems"),
    ("Deep Learning: A Practitioner's Approach", "Patterson &amp; Gibson · O'Reilly", "",
     "https://openlibrary.org/works/OL19543741W"),
    ("Deep Learning for Computer Vision with Python", "Adrian Rosebrock · PyImageSearch", "",
     "https://pyimagesearch.com/deep-learning-computer-vision-python-book/"),
    ("Deep Neuro-Fuzzy Systems with Python", "Himanshu Singh &amp; Yunis Ahmad Lone · Apress", "",
     "https://link.springer.com/book/10.1007/978-1-4842-4415-3"),
    ("Practical Machine Learning and Image Processing", "Himanshu Singh · Apress", "",
     "https://link.springer.com/book/10.1007/978-1-4842-4149-7"),
    ("Digital Image Processing for Medical Applications", "Geoff Dougherty · Cambridge", "",
     "https://openlibrary.org/works/OL25677921W"),
]


def book_entry(b, n, free):
    title, author, note, href = b
    tag = "Free" if free else "Publisher"
    return f"""<li class="entry">
<span class="entry__no">{n:02d}</span>
<span>
<a class="entry__title" href="{href}" target="_blank" rel="noopener">{title}</a>
<span class="entry__note">{author}{(' &mdash; ' + note) if note else ''}</span>
</span>
<span class="entry__acts"><a class="act" href="{href}" target="_blank"
   rel="noopener">{tag}</a></span>
</li>"""


def build():
    phases = [(letter, name, blurb, read_phase(folder))
              for letter, folder, name, blurb in PHASES]
    total = sum(len(p["lectures"]) for _, _, _, parts in phases for p in parts)

    parts_out = [
        S.head("Machine Learning Foundations",
               clean(re.sub("<[^>]+>", "", C["desc"])),
               depth=1, canonical=DIR + "/index.html", og_type="article"),
        S.masthead("courses", 1),
    ]

    meta = [C["field"], f"{total} lectures", "Self-paced", "No prerequisites beyond school algebra"]
    parts_out.append(f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="../index.html">Portal</a></li>
<li><a href="../index.html#courses">Courses</a></li>
<li>{C["title"]}</li>
</ol></nav>
<div class="page-head">
<span class="status status--current">Open course</span>
<h1 class="page-head__title">Machine Learning Foundations</h1>
<p class="page-head__meta">{''.join(f'<span>{m}</span>' for m in meta)}</p>
<p class="page-head__lede lede">{C["desc"]}</p>
<div class="page-head__actions">
<a class="btn btn--primary" href="ML-Foundations-PhaseA/index.html">{S.icon('arrow')}Start Phase A</a>
<a class="btn" href="ML-Foundations-PhaseB/index.html">{S.icon('deck')}Phase B</a>
<a class="btn" href="#reading">{S.icon('doc')}Reading</a>
</div>
</div>
</div>
""")

    toc = "".join([
        '<a class="toc__link" href="#how">How it works</a>',
        *[f'<a class="toc__link" href="#phase-{l.lower()}">Phase {l}</a>'
          for l, _, _, _ in phases],
        '<a class="toc__link" href="#ahead">Phases C &amp; D</a>',
        '<a class="toc__link" href="#reading">Reading</a>',
    ])

    body = ["""<section id="how" class="section" style="padding-top:0">
<div class="section-head"><h2 class="section-head__title">How it works</h2></div>
<div class="prose">
<p>Every lecture runs in the browser and needs nothing installed. Derivations are
hidden one step at a time — predict the next line before you reveal it, and
notice when you cannot. Each Python block is editable and executes in the page,
so you can change a number, make it fail, and work out why. Exercises come before
their solutions on purpose.</p>
<p>The order is the content: each lecture assumes the ones before it. Phase B
uses Phase A constantly and does not re-derive it.</p>
</div>
</section>"""]

    for letter, name, blurb, parts in phases:
        n = sum(len(p["lectures"]) for p in parts)
        blocks = []
        for i, part in enumerate(parts, 1):
            entries = "\n".join(f"""<li class="entry">
<span class="entry__no">{lec['no']}</span>
<span>
<a class="entry__title" href="{S.esc(lec['href'])}">{S.esc(lec['title'])}</a>
<span class="entry__note">{S.esc(lec['lead'])}</span>
</span>
</li>""" for lec in part["lectures"])
            heading = part["name"].replace("Part ", "")
            m = re.match(r"^([IVX]+)\s*—\s*(.*)$", heading)
            no, label = (m.group(1), m.group(2)) if m else (f"{i:02d}", heading)
            blocks.append(f"""<li class="unit">
<span class="unit__no">{no}</span>
<span>
<span class="unit__title">{S.esc(label)}</span>
<ul class="entries unit__files">
{entries}
</ul>
</span>
</li>""")
        body.append(f"""<section id="phase-{letter.lower()}" class="section">
<div class="section-head">
<h2 class="section-head__title">Phase {letter} &mdash; {name}</h2>
<p class="section-head__note">{n} lectures &middot; {len(parts)} parts</p>
</div>
<p class="lede" style="margin-bottom:var(--sp-6)">{blurb}</p>
<ul>{''.join(blocks)}</ul>
</section>""")

    planned = "\n".join(f"""<li class="unit">
<span class="unit__no">{l}</span>
<span>
<span class="unit__title">{t}</span>
<span class="unit__topics">{d}</span>
<span class="unit__meta">Not written yet</span>
</span>
</li>""" for l, t, d in PLANNED)

    body.append(f"""<section id="ahead" class="section">
<div class="section-head">
<h2 class="section-head__title">Phases C &amp; D</h2>
<p class="section-head__note">Planned</p>
</div>
<p class="note">Listed so the mathematics in Phase A has a visible destination.
Neither phase is written yet.</p>
<ul style="margin-top:var(--sp-5)">{planned}</ul>
</section>""")

    free = "\n".join(book_entry(b, i + 1, True) for i, b in enumerate(FREE))
    comm = "\n".join(book_entry(b, i + 1, False) for i, b in enumerate(COMMERCIAL))
    body.append(f"""<section id="reading" class="section">
<div class="section-head">
<h2 class="section-head__title">Reading</h2>
<p class="section-head__note">{len(FREE) + len(COMMERCIAL)} books</p>
</div>
<p class="note note--accent">Nothing here is hosted on this site. Each link goes to
the author&rsquo;s or publisher&rsquo;s own copy. The first group is given away free by
the people who wrote it.</p>
<h3 class="section-head__title" style="margin:var(--sp-7) 0 var(--sp-4)">Free from the author or publisher</h3>
<ul class="entries">{free}</ul>
<h3 class="section-head__title" style="margin:var(--sp-7) 0 var(--sp-4)">In print</h3>
<ul class="entries">{comm}</ul>
</section>""")

    parts_out.append(f"""<div class="wrap split">
<aside class="split__aside">
<p class="label" style="margin-bottom:var(--sp-3)">On this page</p>
<nav class="toc" aria-label="Sections">{toc}</nav>
</aside>
<div>{''.join(body)}</div>
</div>
""")
    parts_out.append(S.footer(1))
    S.write(os.path.join(ROOT, DIR, "index.html"), parts_out)
    print(f"    {total} lectures across {len(phases)} phases")


if __name__ == "__main__":
    build()
