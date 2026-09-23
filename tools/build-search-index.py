#!/usr/bin/env python3
"""Build assets/search-index.json by crawling the site.

Every lecture page, note, slide deck, lab sheet and downloadable file on disk
becomes one record, tagged with the course and unit it sits under, so a search
for a topic returns the path into the library rather than a bare filename.

Run after adding material:   python3 tools/build-search-index.py
"""

import json
import os
import re
import sys

from bs4 import BeautifulSoup

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from catalogue import COURSES

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "search-index.json")

COURSE_BY_DIR = {c["dir"]: c for c in COURSES}

# Directories that are applications or private material, not library content.
SKIP_DIRS = {".git", "node_modules", "Claude outputs", "assets", "tools", "css", "js", "images"}
SKIP_FILES = {
    "admin.html", "selftest.html", "test-api.html", "test-endpoints.html",
    "interactive_test.html",
    # Superseded by the four Unit III PowerPoint decks. Kept on disk so old
    # links still resolve, but no longer listed or searchable.
    "CSEG3060_Unit3_L01_Literature_Study_Purpose_and_Sources.html",
    "CSEG3060_Unit3_L02_Approaches_to_Literature_Studies.html",
    "CSEG3060_Unit3_L03_Conducting_and_Writing_the_Review.html",
    "CSEG3060_Unit3_L04_Attribution_Plagiarism_and_Integrity.html",
    "CSEG3060_Unit3_L05_Research_Ethics_in_Computing.html",
}

DOC_KINDS = {
    ".pdf": "PDF", ".pptx": "Slides", ".ppt": "Slides", ".docx": "Document",
    ".ipynb": "Notebook", ".xlsx": "Spreadsheet", ".sql": "SQL",
}

STOP = set("""
the and for with from that this into than then they them their there here what
which when where who whom whose why how all any are was were been being have has
had not but its it's you your our out off over under more most some such only own
same too very can will just don should now about above after again against because
before below between both during each few further once other others during per via
a an as at be by do if in is of on or so to up we vs use used using does did doing
""".split())

NOISE = re.compile(
    r"^(view|read|open|download|next|previous|back|home|menu|close|start|slide|"
    r"contents|table of contents|print|pdf|dark|light|summary|key terms|"
    r"practice questions|references|unit summary)$", re.I)


def clean(s):
    return re.sub(r"\s+", " ", (s or "")).strip()


def unit_of(rel):
    """The 'Unit III' style folder a file sits in, if any."""
    for part in rel.split(os.sep)[1:-1]:
        if re.match(r"^(Unit|Uni)[\s\-]", part, re.I):
            return clean(part.replace("Uni-", "Unit ").replace("Unit-", "Unit "))
        if part.lower() in ("presentation slides", "python programming lab"):
            return clean(part)
    return ""


def kind_of(rel, name):
    low = (rel + " " + name).lower()
    ext = os.path.splitext(name)[1].lower()
    if ext in DOC_KINDS:
        if "syllabus" in low or "course_plan" in low or "delivery_plan" in low:
            return "Syllabus"
        return DOC_KINDS[ext]
    if "question_paper" in low or "question paper" in low:
        return "Question paper"
    if "quiz" in low:
        return "Quiz"
    if re.search(r"\b(lab|exp)[-_ ]?\d|viva|guidelines", low):
        return "Lab"
    if "presentation slides" in low or re.match(r"^lec-\d", name.lower()):
        return "Presentation"
    if "_notes" in low or "notes" in low:
        return "Notes"
    if re.search(r"l\d{2}_|lecture", low):
        return "Lecture"
    return "Page"


# Titles carry a lot of boilerplate: the site name, the course code, a trailing
# "Interactive Presentation". Strip it so results read as topics.
TITLE_PREFIX = re.compile(
    r"^(CS[A-Z]{2}\d{4}|CSEG\d{4}|DevOps Automation|Modelling and Simulation|"
    r"Modeling and Simulation|Research Methodology)\s*[\u00b7\u2013\u2014|:-]\s*", re.I)
TITLE_UNIT = re.compile(r"^(Unit[\s\-]?[IVXLC\d]+|L\d{2})\s*[\u00b7\u2013\u2014|:-]\s*", re.I)
TITLE_SUFFIX = re.compile(
    r"\s*[\u00b7\u2013\u2014|-]\s*(Mohsin Furkh Dar|UPES|Academic Portal|"
    r"Interactive Presentation|Interactive Guide|CS[A-Z]{2}\d{4}.*|CSEG\d{4}.*|"
    r"Unit[\s\-][IVXLC\d]+( Notes)?)\s*$", re.I)
EMOJI = re.compile("[\U0001F000-\U0001FAFF\u2190-\u21FF\u2600-\u27BF\uFE0F]+")


def tidy_title(t):
    t = EMOJI.sub("", clean(t))
    for _ in range(2):
        t = TITLE_SUFFIX.sub("", t)
    t = TITLE_PREFIX.sub("", t)
    t = TITLE_UNIT.sub("", t)
    return clean(t).strip(" \u00b7-\u2013\u2014:")


def title_and_terms(path):
    """Page title plus its headings, used as search keywords.

    The <title> element is more reliable than the first heading: on a slide
    deck the first heading is whatever the opening slide happens to say.
    """
    try:
        with open(path, encoding="utf-8", errors="replace") as fh:
            soup = BeautifulSoup(fh.read(), "html.parser")
    except OSError:
        return "", ""
    for t in soup(["script", "style", "nav", "footer"]):
        t.decompose()

    title = tidy_title(soup.title.string if soup.title and soup.title.string else "")
    if len(title) < 4:
        h = soup.find(["h1", "h2"])
        if h:
            title = tidy_title(h.get_text(" ", strip=True))

    # Keywords are a deduplicated word bag drawn from every heading on the
    # page, not the headings verbatim: it covers the whole document for
    # roughly the same number of bytes, and search matches term by term.
    heads = []
    for h in soup.find_all(["h1", "h2", "h3", "h4", "h5"])[:120]:
        t = EMOJI.sub("", clean(h.get_text(" ", strip=True)))
        t = re.sub(r"^\d+(\.\d+)*[.)]?\s+", "", t)
        if t and len(t) <= 110 and not NOISE.match(t):
            heads.append(t)

    drop = set(title.lower().split())
    words, seen = [], set()
    for tok in re.findall(r"[a-z0-9][a-z0-9+#/'\u2019._-]*", " ".join(heads).lower()):
        tok = tok.strip("._-'\u2019")
        if len(tok) < 3 or tok in STOP or tok in seen or tok in drop:
            continue
        seen.add(tok)
        words.append(tok)
        if len(words) >= 90:
            break
    return title, " ".join(words)


def prettify(name):
    """A readable title from a filename, for files we cannot open."""
    stem = os.path.splitext(name)[0]
    stem = re.sub(r"^(CS[A-Z]{2}\d{4}|CSEG\d{4}|DA|MS|DevOps)[_\s]*", "", stem)
    stem = re.sub(r"^Unit\d+[_\s]*", "", stem)
    stem = re.sub(r"^L\d{2}[_\s]*", "", stem)
    # "Part1_Literature_Search_Strategies" -> "Part 1 - Literature Search..."
    stem = re.sub(r"^Part(\d+)[_\s]+", "Part \\1 — ", stem)
    stem = stem.replace("_", " ").replace("-", " ")
    return clean(stem) or name


def build():
    records = []

    # 1. The courses themselves, ranked above their contents.
    for c in COURSES:
        if c["status"] == "empty":
            continue
        records.append({
            "t": c["title"].replace("&amp;", "&"),
            "c": c["title"].replace("&amp;", "&"),
            "u": "", "k": "Course",
            "url": c["dir"] + "/index.html",
            "x": " ".join([c["code"], c["field"].replace("&amp;", "&"), c["desc"]]),
            "p": 30,
        })

    # 2. Everything inside each course folder.
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        rel_dir = os.path.relpath(dirpath, ROOT)
        if rel_dir == ".":
            rel_dir = ""
        top = rel_dir.split(os.sep)[0] if rel_dir else ""
        course = COURSE_BY_DIR.get(top)

        for name in sorted(filenames):
            if name in SKIP_FILES or name.startswith("."):
                continue
            ext = os.path.splitext(name)[1].lower()
            if ext not in (".html", ".pdf", ".pptx", ".ppt", ".docx", ".ipynb", ".xlsx", ".sql"):
                continue
            rel = os.path.join(rel_dir, name) if rel_dir else name
            if rel in ("index.html", "about.html", "research.html"):
                continue
            if top in ("quiz", "exam"):
                continue
            if course and name == "index.html":
                continue          # already added above

            unit = unit_of(rel) if course else ""
            kind = kind_of(rel, name)

            if ext == ".html":
                title, terms = title_and_terms(os.path.join(ROOT, name if not rel_dir else rel))
                if not title:
                    title = prettify(name)
            else:
                title, terms = prettify(name), ""

            if top == "blog":
                cname, kind = "Writing", "Post"
            elif course:
                cname = course["title"].replace("&amp;", "&")
            else:
                cname = "Portal"

            records.append({
                "t": title, "c": cname, "u": unit, "k": kind,
                "url": rel.replace(os.sep, "/"),
                "x": terms, "p": 8 if kind in ("Notes", "Syllabus") else 0,
            })

    # Drop empty keyword fields to keep the file small.
    for r in records:
        if not r["x"]:
            del r["x"]
        if not r["p"]:
            del r["p"]
        if not r["u"]:
            del r["u"]

    payload = {"built": True, "count": len(records), "records": records}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, separators=(",", ":"))

    size = os.path.getsize(OUT)
    print(f"indexed {len(records)} records -> assets/search-index.json ({size/1024:.1f} KB)")

    from collections import Counter
    for k, n in Counter(r["k"] for r in records).most_common():
        print(f"    {n:4d}  {k}")


if __name__ == "__main__":
    build()
