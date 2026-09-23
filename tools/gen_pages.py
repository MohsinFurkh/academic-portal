#!/usr/bin/env python3
"""Generate research.html, about.html and the blog index.

Every publication, figure and affiliation below is taken from the author's
own PhD research presentation (kept in this repository's history) or from
the existing site. Nothing here is invented.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shell as S

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Research ------------------------------------------------------------

THREADS = [
    ("Advanced segmentation architectures",
     "EfficientU-Net and UMA-Net. Parameter-efficient encoders built from "
     "depthwise separable convolutions, atrous convolution blocks for adaptive "
     "receptive fields, and compound scaling across width, depth and resolution.",
     "EfficientU-Net · UMA-Net"),
    ("Loss function design",
     "The Fuzzy Rough Set (FRS) loss, and dynamically weight-adjusted ensemble "
     "losses for segmentation where boundaries are genuinely uncertain.",
     "FRS loss · Adaptive ensemble loss"),
    ("Multi-modal classification",
     "Saliency-guided attention networks for classification across medical "
     "imaging modalities.",
     "Saliency-Guided AttentionNet"),
    ("Optimisation and feature selection",
     "Ensemble models combining deep features with genetic-algorithm feature "
     "selection, tuned for accuracy against parameter count and training time.",
     "Genetic algorithm · Ensemble"),
]

PUBLICATIONS = [
    ("Adaptive ensemble loss and multi-scale attention in breast ultrasound "
     "segmentation with UMA-Net",
     "Dar, M.F. &amp; Ganivada, A.",
     "Medical &amp; Biological Engineering &amp; Computing", "2025",
     "SCI indexed · Impact factor 2.6", "10.1007/s11517-025-03301-5"),
    ("Deep learning and genetic algorithm-based ensemble model for feature "
     "selection and classification of breast ultrasound images",
     "Dar, M.F. &amp; Ganivada, A.",
     "Image and Vision Computing, 146, 105018", "2024",
     "SCI indexed · Impact factor 4.2", "10.1016/J.IMAVIS.2024.105018"),
    ("EfficientU-Net: A novel deep learning method for breast tumor "
     "segmentation and classification in ultrasound images",
     "Dar, M.F. &amp; Ganivada, A.",
     "Neural Processing Letters, 55, 10439–10462", "2023",
     "SCI indexed · Impact factor 2.8", "10.1007/s11063-023-11333-x"),
    ("Dynamic weight-adjusted ensemble loss for enhanced medical image "
     "segmentation",
     "Dar, M.F. &amp; Ganivada, A.",
     "Proceedings of the Fourth International Conference on Computing and "
     "Communication Networks (ICCCN 2024), Springer, Singapore", "2025",
     "Scopus indexed", "10.1007/978-981-96-3250-3_1"),
    ("Design and analysis of a robust security layer for software defined "
     "network framework",
     "Alhaj, A.N., Patel, N.D., Singh, A., Bondugula, R.K., Dar, M.F. "
     "&amp; Ahamed, J.",
     "International Journal of Sensor Networks, 46(1), 1–14", "2024",
     "Scopus indexed", "10.1504/IJSNET.2024.141613"),
    ("Latent fingerprint enhancement and matching using intuitionistic type-2 "
     "fuzzy",
     "Mukhtar, S., Dar, M.F. &amp; Kaur, A.",
     "International Journal of Artificial Intelligence and Soft Computing, "
     "7(4), 313–328", "2022",
     "Scopus indexed", "10.1504/IJAISC.2022.130558"),
    ("Performance comparison of face detection and recognition algorithms",
     "Dar, M.F. &amp; Dixit, S.",
     "International Journal of Science and Research (IJSR), 8(1), 986–994",
     "2019", "CrossRef", "10.21275/ART20194439"),
]


def research():
    desc = ("Research by Mohsin Furkh Dar on deep learning for medical image "
            "analysis: segmentation architectures, loss function design, "
            "multi-modal classification and feature selection. Seven "
            "peer-reviewed publications.")
    parts = [S.head("Research", desc, depth=0, canonical="research.html",
                    og_type="profile"),
             S.masthead("research", 0)]

    parts.append(f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="index.html">Portal</a></li>
<li>Research</li>
</ol></nav>
<div class="page-head">
<span class="label label--accent">Medical image analysis</span>
<h1 class="page-head__title">Deep learning for medical image analysis</h1>
<p class="page-head__lede lede">Doctoral research at the University of Hyderabad on
segmentation and classification of medical images — chiefly breast ultrasound —
where the aim throughout was state-of-the-art accuracy at a parameter count that can
actually be deployed in a clinic.</p>
<div class="page-head__actions">
<a class="btn" href="{S.SCHOLAR}" rel="noopener" target="_blank">{S.icon('out')}Google Scholar</a>
<a class="btn" href="{S.ORCID}" rel="noopener" target="_blank">{S.icon('out')}ORCID</a>
<a class="btn" href="{S.RESEARCHGATE}" rel="noopener" target="_blank">{S.icon('out')}ResearchGate</a>
</div>
</div>
</div>
""")

    threads = "\n".join(f"""<li class="unit">
<span class="unit__no">{i + 1:02d}</span>
<span>
<span class="unit__title">{t}</span>
<span class="unit__topics">{d}</span>
<span class="unit__meta">{k}</span>
</span>
</li>""" for i, (t, d, k) in enumerate(THREADS))

    pubs = "\n".join(f"""<li class="entry">
<span class="entry__no">{i + 1:02d}</span>
<span>
<a class="entry__title" href="https://doi.org/{doi}" target="_blank" rel="noopener">{title}</a>
<span class="entry__note">{authors}</span>
<span class="entry__meta">{venue} &middot; {year} &middot; {note}</span>
</span>
<span class="entry__acts"><a class="act" href="https://doi.org/{doi}"
   target="_blank" rel="noopener">DOI</a></span>
</li>""" for i, (title, authors, venue, year, note, doi) in enumerate(PUBLICATIONS))

    parts.append(f"""<div class="wrap section">
<div class="section-head">
<h2 class="section-head__title">Research threads</h2>
<p class="section-head__note">{len(THREADS)} areas</p>
</div>
<ul>{threads}</ul>
</div>

<div class="wrap section">
<div class="section-head">
<h2 class="section-head__title">Publications</h2>
<p class="section-head__note">{len(PUBLICATIONS)} papers &middot; newest first</p>
</div>
<ul class="entries">{pubs}</ul>
<p class="note" style="margin-top:var(--sp-6)">Every entry links to its DOI. The
Google Scholar profile above is the authoritative, current list.</p>
</div>

<div class="wrap section">
<div class="section-head">
<h2 class="section-head__title">Presentations</h2>
</div>
<div class="empty">
<p class="empty__title">The PhD research presentation is not currently published
on this portal.</p>
<p class="empty__hint">The papers above cover the same work, and each links to its
published version.</p>
</div>
</div>
""")
    parts.append(S.footer(0))
    S.write(os.path.join(ROOT, "research.html"), parts)


# --- About ---------------------------------------------------------------

TEACHING = [
    ("UPES, Dehradun", "Assistant Professor", "School of Computer Science",
     "DevOps, DevOps Automation, Modelling and Simulation, Research "
     "Methodology in CS, Python Programming, Object Oriented Programming, "
     "C Programming, Database Management Systems"),
    ("University of Hyderabad", "Teaching Assistant (PhD)",
     "School of Computer and Information Sciences",
     "Discrete Mathematics, Data Structures, Research Methodology, Deep Learning"),
    ("Govt Degree College, Uri", "Assistant Professor", "",
     "Discrete Mathematics, Data Structures and Algorithms"),
]


def about():
    desc = ("Mohsin Furkh Dar, Assistant Professor in the School of Computer "
            "Science at UPES. About this teaching portal and how to get in touch.")
    parts = [S.head("About", desc, depth=0, canonical="about.html",
                    og_type="profile"),
             S.masthead("about", 0)]

    parts.append(f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="index.html">Portal</a></li>
<li>About</li>
</ol></nav>
<div class="page-head">
<span class="label">{S.ROLE} &middot; {S.SCHOOL}</span>
<h1 class="page-head__title">{S.AUTHOR}</h1>
<p class="page-head__lede lede">I teach Computer Science at UPES, Dehradun. This
portal is where the material for my courses lives: lecture notes, slide decks,
lab sheets, class tests and quizzes, and the reading behind each unit.</p>
</div>
</div>
""")

    roles = "\n".join(f"""<li class="unit">
<span class="unit__no">{i + 1:02d}</span>
<span>
<span class="unit__title">{place}</span>
<span class="unit__meta">{role}{f' &middot; {dept}' if dept else ''}</span>
<span class="unit__topics">{taught}</span>
</span>
</li>""" for i, (place, role, dept, taught) in enumerate(TEACHING))

    parts.append(f"""<div class="wrap split">
<aside class="split__aside">
<p class="label" style="margin-bottom:var(--sp-3)">On this page</p>
<nav class="toc" aria-label="Sections">
<a class="toc__link" href="#portal">This portal</a>
<a class="toc__link" href="#teaching">Teaching</a>
<a class="toc__link" href="#contact">Contact</a>
</nav>
</aside>
<div>

<section id="portal" class="section" style="padding-top:0">
<div class="section-head"><h2 class="section-head__title">This portal</h2></div>
<div class="prose">
<p>Everything here is written for the students in front of me, and left online
afterwards for anyone revising. Courses are grouped by academic session: the
current session first, then previous sessions, then an archive of subjects taught
earlier.</p>
<p>Material comes in three forms. <strong>Unit notes</strong> are single reading
documents, written for revision rather than projection, with a contents sidebar,
a dark mode and a clean print view. <strong>Lecture decks</strong> are
self-navigating slides built for a large hall — they re-paginate to whatever
text size the room needs. <strong>Lab sheets and assignments</strong> carry the
practical work.</p>
<p>The search on the <a class="link" href="index.html">home page</a> covers every
course, unit, lecture, note and downloadable file on the portal. Press
<code>/</code> anywhere to reach it.</p>
</div>
</section>

<section id="teaching" class="section">
<div class="section-head">
<h2 class="section-head__title">Teaching</h2>
<p class="section-head__note">{len(TEACHING)} institutions</p>
</div>
<ul>{roles}</ul>
</section>

<section id="contact" class="section">
<div class="section-head"><h2 class="section-head__title">Contact</h2></div>
<dl class="facts">
<div class="facts__row">
<dt class="facts__term">Email</dt>
<dd class="facts__val"><a class="link" href="mailto:{S.EMAIL}">{S.EMAIL}</a></dd>
</div>
<div class="facts__row">
<dt class="facts__term">Department</dt>
<dd class="facts__val">{S.SCHOOL}, {S.UNIVERSITY}, Dehradun</dd>
</div>
<div class="facts__row">
<dt class="facts__term">Research</dt>
<dd class="facts__val"><a class="link" href="research.html">Publications and
research threads</a> · <a class="link link-out" href="{S.SCHOLAR}"
rel="noopener" target="_blank">Google Scholar</a></dd>
</div>
<div class="facts__row">
<dt class="facts__term">Elsewhere</dt>
<dd class="facts__val">
<a class="link link-out" href="{S.ORCID}" rel="noopener" target="_blank">ORCID</a> ·
<a class="link link-out" href="{S.LINKEDIN}" rel="noopener" target="_blank">LinkedIn</a> ·
<a class="link link-out" href="{S.GITHUB}" rel="noopener" target="_blank">GitHub</a> ·
<a class="link link-out" href="{S.RESEARCHGATE}" rel="noopener" target="_blank">ResearchGate</a> ·
<a class="link link-out" href="{S.PORTFOLIO}" rel="noopener" target="_blank">Personal site</a>
</dd>
</div>
</dl>
</section>

</div>
</div>
""")
    parts.append(S.footer(0))
    S.write(os.path.join(ROOT, "about.html"), parts)


# --- Blog index ----------------------------------------------------------

POSTS = [
    ("the-lost-art-of-learning.html", "The Lost Art of Learning",
     "Vivekananda’s wisdom for today’s students: concentration, calmness, "
     "reflection, and learning with the whole being."),
    ("the-art-of-effective-note-taking.html", "The Art of Effective Note-Taking",
     "Note-taking methods that improve learning and retention, and how to "
     "organise what you read."),
    ("patience-sabr-lessons-from-ayyub.html",
     "Patience (Sabr) — Lessons from Ayyub (AS)",
     "Lessons in patience and perseverance from the story of Prophet Ayyub (AS), "
     "and their relevance today."),
]


def blog():
    desc = ("Notes and essays on learning, study habits and patience, by "
            "Mohsin Furkh Dar.")
    parts = [S.head("Notes & Thoughts", desc, depth=1,
                    canonical="blog/index.html"),
             S.masthead("blog", 1)]

    rows = "\n".join(f"""<li><a class="row" href="{href}">
<span class="row__no">{i + 1:02d}</span>
<span class="row__body">
<span class="row__title">{title}</span>
<span class="row__desc">{blurb}</span>
</span>
<span class="row__aside">{S.icon('arrow', 'row__arrow')}</span>
</a></li>""" for i, (href, title, blurb) in enumerate(POSTS))

    parts.append(f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="../index.html">Portal</a></li>
<li>Notes &amp; thoughts</li>
</ol></nav>
<div class="page-head">
<span class="label">Writing</span>
<h1 class="page-head__title">Notes &amp; thoughts</h1>
<p class="page-head__lede lede">Occasional essays on how we learn, how we read,
and how we keep going — written mostly for students.</p>
</div>
</div>

<div class="wrap section" style="padding-top:0">
<div class="section-head">
<h2 class="section-head__title">Posts</h2>
<p class="section-head__note">{len(POSTS)} posts</p>
</div>
<ul class="index">{rows}</ul>
</div>
""")
    parts.append(S.footer(1))
    S.write(os.path.join(ROOT, "blog", "index.html"), parts)


if __name__ == "__main__":
    research()
    about()
    blog()
