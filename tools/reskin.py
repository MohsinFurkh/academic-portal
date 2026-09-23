#!/usr/bin/env python3
"""Re-dress the three bespoke course pages in the portal's design language.

Their body markup and their scripts are left untouched: only the document
head, the navigation, the footer and the page-local stylesheet are replaced.
That keeps every word of the content — and the delivery-plan filtering — working.
"""

import os
import re
import sys

from urllib.parse import unquote, urlparse

from bs4 import BeautifulSoup

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shell as S
from catalogue import COURSES, STATUS_LABEL

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BY_DIR = {c["dir"]: c for c in COURSES}

BLOG_POSTS = [
    "blog/the-lost-art-of-learning.html",
    "blog/the-art-of-effective-note-taking.html",
    "blog/patience-sabr-lessons-from-ayyub.html",
]

PAGES = [
    ("DevOps Automation/index.html", "DevOps Automation"),
    ("Research Methodology/index.html", "Research Methodology"),
    ("Research Methodology/assignments.html", "Research Methodology"),
    ("Modeling and Simulation/index.html", "Modeling and Simulation"),
]



def mark_missing(soup, page_rel):
    """Neutralise links whose target is not in the repository.

    A button that leads to a 404 is worse than one that says so: the reader
    learns the file is not published yet instead of hitting a dead page.
    """
    base = os.path.dirname(os.path.join(ROOT, page_rel))
    n = 0
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not href or href.startswith(("http", "mailto:", "tel:", "#", "//", "javascript:")):
            continue
        target = unquote(urlparse(href).path).replace("\\", "/")
        if not target or os.path.exists(os.path.normpath(os.path.join(base, target))):
            continue
        del a["href"]
        a["aria-disabled"] = "true"
        a["title"] = "Not published yet"
        a["class"] = (a.get("class") or []) + ["is-missing"]
        n += 1
    return n


def reskin(rel, course_dir):
    path = os.path.join(ROOT, rel)
    with open(path, encoding="utf-8", errors="replace") as fh:
        raw = fh.read()
    if 'class="masthead"' in raw:
        raise SystemExit(f"{rel} has already been reskinned; restore it from git first.")
    soup = BeautifulSoup(raw, "html.parser")

    c = BY_DIR[course_dir]
    is_index = rel.endswith("/index.html")

    # --- keep the page's own scripts, drop its old presentation layer ------
    scripts = [str(t) for t in soup.find_all("script") if not t.get("src")]
    src_scripts = [t.get("src") for t in soup.find_all("script") if t.get("src")]

    for t in soup.find_all("style"):
        t.decompose()
    for t in soup.find_all("nav"):
        t.decompose()
    for t in soup.find_all("footer"):
        t.decompose()
    for t in soup.find_all("script"):
        t.decompose()
    # the old sticky "scroll to top" control is replaced by the new chrome
    for t in soup.select(".scroll-to-top, .menu-toggle"):
        t.decompose()

    # Font Awesome is no longer loaded: drop the decorative glyph slots.
    for t in soup.find_all("i"):
        if any(c.startswith(("fa", "fas", "far", "fab")) for c in (t.get("class") or [])):
            t.decompose()

    # Inline colours were tuned for the old blue palette and would survive
    # the theme switch; layout declarations are left alone.
    colour = re.compile(r"\s*(color|background|background-color|border-color|"
                        r"box-shadow|text-shadow)\s*:[^;]*;?", re.I)
    for t in soup.find_all(style=True):
        kept = colour.sub("", t["style"]).strip().strip(";")
        if kept:
            t["style"] = kept
        else:
            del t["style"]


    # These pages wrap their content in their own <main>; the new shell
    # supplies one, and two main landmarks is a screen-reader problem.
    for inner in soup.find_all("main"):
        inner.name = "div"

    missing = mark_missing(soup, rel)

    title = soup.title.string if soup.title else c["title"]
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = desc_tag["content"] if desc_tag and desc_tag.get("content") else \
        re.sub("<[^>]+>", "", c["desc"])

    # --- body: everything that is not chrome -------------------------------
    body = soup.body
    hero = body.find("header")

    # Two of these pages open with an <h2> and have no <h1> at all. Promote it
    # so every page has exactly one top-level heading.
    if hero is not None and not hero.find("h1"):
        first = hero.find(["h2", "h3"])
        if first is not None:
            first.name = "h1"
    hero_html = str(hero) if hero else ""
    if hero:
        hero.extract()
    rest = "".join(str(t) for t in body.contents).strip()

    page_title = re.sub(r"\s*[·|–—-]\s*(Mohsin Furkh Dar|UPES).*$", "",
                        (title or "").strip())

    depth = 1
    head = S.head(page_title, description.strip(), depth=depth,
                  canonical=rel, og_type="article",
                  extra_head='\n<link rel="stylesheet" href="../assets/course-page.css">')

    crumb_last = c["title"] if is_index else page_title
    crumb_mid = (f'<li><a href="index.html">{c["title"]}</a></li>'
                 if not is_index else "")
    status = ""
    if is_index:
        cls = "status--current" if c["status"] == "current" else ""
        status = f'<span class="status {cls}">{STATUS_LABEL[c["status"]]}</span>'

    out = [
        head,
        S.masthead("courses", depth),
        f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="../index.html">Portal</a></li>
<li><a href="../index.html#courses">Courses</a></li>
{crumb_mid}<li>{S.esc(crumb_last)}</li>
</ol></nav>
{status}
</div>
""",
        hero_html,
        rest,
        S.footer(depth),
    ]

    html = "".join(out)
    # put the page's own scripts back, just before </body>
    tail = "".join(f'<script src="{s}"></script>' for s in src_scripts if s
                   and "script.js" not in s) + "".join(scripts)
    html = html.replace("</body>", tail + "\n</body>")

    with open(path, "w", encoding="utf-8") as fh:
        fh.write(html)
    print(f"    reskinned {rel}  ({len(scripts)} scripts kept, "
          f"{missing} unavailable link{'s' if missing != 1 else ''} marked)")


def reskin_post(rel):
    """Blog posts: same treatment, but their own breadcrumb and no course."""
    path = os.path.join(ROOT, rel)
    with open(path, encoding="utf-8", errors="replace") as fh:
        raw = fh.read()
    if 'class="masthead"' in raw:
        raise SystemExit(f"{rel} has already been reskinned; restore it from git first.")
    soup = BeautifulSoup(raw, "html.parser")

    for t in soup.find_all(["style", "nav", "footer", "script"]):
        t.decompose()
    for t in soup.select(".scroll-to-top, .menu-toggle"):
        t.decompose()
    for t in soup.find_all("i"):
        if any(c.startswith(("fa", "fas", "far", "fab")) for c in (t.get("class") or [])):
            t.decompose()
    colour = re.compile(r"\s*(color|background|background-color|border-color|"
                        r"box-shadow|text-shadow)\s*:[^;]*;?", re.I)
    for t in soup.find_all(style=True):
        kept = colour.sub("", t["style"]).strip().strip(";")
        if kept:
            t["style"] = kept
        else:
            del t["style"]


    # These pages wrap their content in their own <main>; the new shell
    # supplies one, and two main landmarks is a screen-reader problem.
    for inner in soup.find_all("main"):
        inner.name = "div"

    mark_missing(soup, rel)

    title = (soup.title.string or "").strip() if soup.title else ""
    title = re.sub(r"\s*[\u00b7|\u2013\u2014-]\s*(Blog|Mohsin Furkh Dar|UPES).*$", "", title)
    d = soup.find("meta", attrs={"name": "description"})
    description = d["content"] if d and d.get("content") else title

    body = "".join(str(t) for t in soup.body.contents).strip()

    out = [
        S.head(title, description, depth=1, canonical=rel, og_type="article",
               extra_head='\n<link rel="stylesheet" href="../assets/course-page.css">'),
        S.masthead("blog", 1),
        f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="../index.html">Portal</a></li>
<li><a href="index.html">Notes &amp; thoughts</a></li>
<li>{S.esc(title)}</li>
</ol></nav>
</div>
""",
        body,
        S.footer(1),
    ]
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("".join(out))
    print(f"    reskinned {rel}")


if __name__ == "__main__":
    for rel, d in PAGES:
        reskin(rel, d)
    for rel in BLOG_POSTS:
        reskin_post(rel)
