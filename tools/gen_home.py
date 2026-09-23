"""Generate the homepage."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shell as S
from catalogue import SESSIONS, COURSES, STATUS_LABEL, by_session

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DESC = ("Lecture notes, slide decks, class tests, quizzes, assignments and reading "
        "for B.Tech and M.Tech Computer Science students at UPES. Course materials "
        "by Mohsin Furkh Dar, Assistant Professor, School of Computer Science.")


def course_row(c, n):
    href = S.esc(c["dir"] + "/index.html")
    meta = "".join(f"<span>{m}</span>" for m in c["meta"])
    if c["code"]:
        meta = f'<span>{c["code"]}</span>' + meta
    status_cls = "status--current" if c["status"] == "current" else (
        "status--empty" if c["status"] == "empty" else "")
    quiet = " row--quiet" if c["status"] == "empty" else ""
    return f"""<li><a class="row{quiet}" href="{href}">
<span class="row__no">{n:02d}</span>
<span class="row__body">
<span class="row__title">{c["title"]}</span>
<span class="row__desc">{c["desc"]}</span>
{f'<span class="row__meta">{meta}</span>' if meta else ''}
</span>
<span class="row__aside">
<span class="status {status_cls}">{STATUS_LABEL[c["status"]]}</span>
{S.icon('arrow', 'row__arrow')}
</span>
</a></li>"""


def session_block(sess, start):
    items = by_session(sess["key"])
    quiet = " session--quiet" if sess["quiet"] else ""
    rows = "\n".join(course_row(c, start + i) for i, c in enumerate(items))
    count = len(items)
    return f"""<section class="session{quiet}">
<div class="session__head">
<h3 class="session__name">{sess["name"]} <span class="session__years">{sess["period"]}</span></h3>
<span class="session__count">{count} {'course' if count == 1 else 'courses'}</span>
</div>
<p class="note" style="margin-top:var(--sp-4)">{sess["note"]}</p>
<ul class="index" style="margin-top:var(--sp-4)">
{rows}
</ul>
</section>""", start + count


ASSESSMENTS = [
    ("quiz/index.html", "Live quiz",
     "Timed multiple-choice quiz, run during class. Sign in with your roll number "
     "when your teacher opens the paper.", "Full screen · server-timed"),
    ("exam/index.html", "Descriptive class test",
     "Written class test with a proctored, full-screen paper and server-side timing.",
     "Full screen · server-timed"),
]

POSTS = [
    ("blog/the-lost-art-of-learning.html", "The Lost Art of Learning",
     "Vivekananda’s wisdom for today’s students: concentration, calmness, "
     "reflection, and learning with the whole being."),
    ("blog/the-art-of-effective-note-taking.html", "The Art of Effective Note-Taking",
     "Note-taking methods that improve learning, retention and how you organise "
     "what you read."),
    ("blog/patience-sabr-lessons-from-ayyub.html",
     "Patience (Sabr) — Lessons from Ayyub (AS)",
     "Lessons in patience and perseverance from the story of Prophet Ayyub (AS), "
     "and their relevance today."),
]


def small_row(href, n, title, desc, aside=""):
    return f"""<li><a class="row row--quiet" href="{S.esc(href)}">
<span class="row__no">{n:02d}</span>
<span class="row__body">
<span class="row__title">{title}</span>
<span class="row__desc">{desc}</span>
</span>
<span class="row__aside">{f'<span class="status">{aside}</span>' if aside else ''}
{S.icon('arrow', 'row__arrow')}</span>
</a></li>"""


def build():
    parts = [S.head("Academic Portal", DESC, depth=0, canonical=""), S.masthead("courses", 0)]

    # --- Hero -------------------------------------------------------------
    parts.append(f"""<section class="wrap hero">
<p class="hero__eyebrow">
<span class="hero__eyebrow-name">{S.AUTHOR}</span><span>{S.ROLE}</span><span>{S.SCHOOL}, {S.UNIVERSITY}</span>
</p>
<h1 class="hero__title">Everything I teach, kept in one place.</h1>
<p class="hero__lede">Lecture notes, slide decks, class tests, quizzes, assignments and
reading lists for B.Tech and M.Tech Computer Science students. Five courses are running
this semester; everything taught earlier stays online.</p>
<div class="hero__search">{S.search("hero")}</div>
<p class="hero__jump">
<span>Jump to</span>
<a href="#courses">Courses</a>
<a href="#assessments">Assessments</a>
<a href="#research">Research</a>
<a href="#writing">Writing</a>
</p>
</section>
""")

    # --- Courses ----------------------------------------------------------
    blocks, n = [], 1
    for sess in SESSIONS:
        b, n = session_block(sess, n)
        blocks.append(b)
    parts.append(f"""<div class="wrap section" id="courses">
<div class="section-head">
<h2 class="section-head__title">Courses</h2>
<p class="section-head__note">{len(COURSES)} subjects, grouped by academic session</p>
</div>
<div class="stack-6">
{''.join(blocks)}
</div>
</div>
""")

    # --- Assessments ------------------------------------------------------
    rows = "\n".join(
        small_row(h, i + 1, t, d, a) for i, (h, t, d, a) in enumerate(ASSESSMENTS))
    parts.append(f"""<div class="wrap section" id="assessments">
<div class="section-head">
<h2 class="section-head__title">Assessments</h2>
<p class="section-head__note">Open only while a paper is running</p>
</div>
<p class="note note--accent">Both papers enforce full screen and take their timing from
the server, not from your device. Read the rules on the sign-in screen before you start.</p>
<ul class="index" style="margin-top:var(--sp-5)">
{rows}
</ul>
</div>
""")

    # --- Research + writing ----------------------------------------------
    posts = "\n".join(
        small_row(h, i + 1, t, d) for i, (h, t, d) in enumerate(POSTS))
    parts.append(f"""<div class="wrap section duo">
<section id="research">
<div class="section-head">
<h2 class="section-head__title">Research</h2>
</div>
<p class="lede">Doctoral work on deep learning for medical image analysis —
segmentation architectures, loss function design and feature selection, mostly on
breast ultrasound. Seven peer-reviewed papers, each linked to its DOI.</p>
<p style="margin-top:var(--sp-5)">
<a class="btn" href="research.html">Open research archive {S.icon('arrow')}</a>
</p>
</section>
<section id="writing">
<div class="section-head">
<h2 class="section-head__title">Writing</h2>
<p class="section-head__note"><a class="link" href="blog/index.html">All posts</a></p>
</div>
<ul class="index">
{posts}
</ul>
</section>
</div>
""")

    parts.append(S.footer(0))
    S.write(os.path.join(ROOT, "index.html"), parts)


if __name__ == "__main__":
    build()
