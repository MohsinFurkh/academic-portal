#!/usr/bin/env python3
"""Repair relative paths that point one level too far up (or too few).

These are typos in individual lecture pages, not design decisions: the page's
whole navigation or stylesheet is unreachable because of them. Links to files
that simply do not exist are left alone and reported instead, since only the
author can supply the missing file.
"""

import os
import re
import sys
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FIXES = [
    # file, wrong prefix, right prefix
    ("Data Structures and Algorithms/Arrays.html", "../../index.html", "../index.html"),
    ("Discrete Mathematics/MathematicalLogic.html", "../../js/script.js", "../js/script.js"),
    ("Object Oriented Programming/Unit I/Introduction.html",
     'href="../css/style.css"', 'href="../../css/style.css"'),
    ("Object Oriented Programming/Unit I/Introduction.html",
     'href="index.html"', 'href="../index.html"'),
    ("Python Programming/Unit-I/lecture-4.html",
     "../Unit-II/lecture-5.html", "../Uni-II/lecture-5.html"),
    ("Python Programming/Unit-III/lecture-1.html",
     "../Unit-II/lecture-5.html", "../Uni-II/lecture-5.html"),
]

# Elements whose target never existed: remove the element rather than leave a
# broken image or a 404 script.
DROP = [
    ("C Programming/lab-1.html", "img", "../images/upes_logo.png"),
    ("Database Systems/lab-1.html", "img", "../images/upes_logo.png"),
    ("Database Systems/lab-2.html", "img", "../images/upes_logo.png"),
    ("Database Systems/lab-4.html", "img", "../images/upes_logo.png"),
    ("Discrete Mathematics/SetsRelations.html", "img", "../img/logo.png"),
    ("Discrete Mathematics/Functions.html", "script", "../js/main.js"),
    ("Discrete Mathematics/probability.html", "script", "../js/main.js"),
    ("blog/the-art-of-effective-note-taking.html", "img", "images/note-taking.jpg"),
]


def main():
    changed = 0
    for rel, old, new in FIXES:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        with open(path, encoding="utf-8", errors="replace") as fh:
            s = fh.read()
        if old not in s:
            continue
        n = s.count(old)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(s.replace(old, new))
        print(f"    {rel}: {n}x  {old} -> {new}")
        changed += n

    from bs4 import BeautifulSoup
    for rel, tag, target in DROP:
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            continue
        with open(path, encoding="utf-8", errors="replace") as fh:
            soup = BeautifulSoup(fh.read(), "html.parser")
        removed = 0
        for el in soup.find_all(tag):
            src = el.get("src") or el.get("href") or ""
            if unquote(urlparse(src).path) == target:
                el.decompose()
                removed += 1
        if removed:
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(str(soup))
            print(f"    {rel}: removed {removed} <{tag}> -> {target}")
            changed += removed

    print(f"  {changed} references repaired")


if __name__ == "__main__":
    main()
