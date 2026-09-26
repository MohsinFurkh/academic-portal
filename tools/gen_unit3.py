#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Regenerate the CSEG3060 Unit III lecture decks and student notes.

    python3 tools/gen_unit3.py [L01 L02 ...]

With no arguments every lecture is rebuilt. Content lives in tools/unit3/lNN.py;
the shared renderers and markup helpers live in tools/unit3/kit.py.
"""
import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "unit3"))
ROOT = os.path.join(os.path.dirname(HERE), "Research Methodology", "Unit III")

import kit  # noqa: E402

LECTURES = ["l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08"]

# One row per lecture on the Unit III hub page: the mapped course outcome and a
# one-sentence blurb, kept here rather than in the lecture modules because they
# describe the lecture from outside it.
HUB_ROWS = {
    "l01": ("CO2", "What a literature study is, its eight objectives, the five dimensions of "
            "scope, its significance at four levels, and why it is the ethical foundation of "
            "research."),
    "l02": ("CO2", "Systematic, narrative, scoping and meta-analytical methods: PRISMA "
            "reporting, effect sizes and pooling models, heterogeneity, and the heuristic for "
            "choosing an approach."),
    "l03": ("CO2", "Critical appraisal through three lenses, five synthesis techniques, the "
            "taxonomy of research gaps and the canonical gap-statement grammar, and building a "
            "theoretical framework."),
    "l04": ("CO3", "Definitions of plagiarism, the four principal types, code and AI-assisted "
            "forms, how detection works, and how to read a similarity report critically."),
    "l05": ("CO3", "The five-step paraphrasing method, IEEE and APA citation styles, reference "
            "management with Zotero, Mendeley and BibTeX, and acting on a Turnitin or URKUND "
            "report."),
    "l06": ("CO3", "Honesty, objectivity, integrity and respect for intellectual property: "
            "honest error against misconduct, the legal-ethical boundary, and a five-test "
            "diagnostic workflow."),
    "l07": ("CO3", "Informed consent, confidentiality and anonymisation, fabrication and "
            "falsification, authorship under ICMJE and CRediT, and conflicts of interest."),
    "l08": ("CO3", "The four-tier regulatory architecture, Institutional Ethics Committees, "
            "UGC and UPES plagiarism policy, ethical dilemmas in computing, and six case "
            "studies."),
}


def build(name):
    mod = importlib.import_module(name)
    importlib.reload(mod)
    out = []

    path = os.path.join(ROOT, mod.STEM + ".html")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(kit.deck(mod.DECK_META, mod.SLIDES, mod.SPEAKER_NOTES))
    out.append((path, len(mod.SLIDES)))

    path = os.path.join(ROOT, mod.STEM + "_Notes.html")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(kit.notes(mod.NOTES_META, mod.NOTES_BODY))
    out.append((path, None))
    return out


def build_hub():
    rows = []
    for i, name in enumerate(LECTURES, 1):
        mod = importlib.import_module(name)
        co, blurb = HUB_ROWS[name]
        rows.append({
            "no": f"{i:02d}",
            "co": co,
            "title": mod.NOTES_META["lectitle"],
            "blurb": blurb,
            "deck": mod.STEM + ".html",
            "notes": mod.STEM + "_Notes.html",
        })
    path = os.path.join(ROOT, "index.html")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(kit.hub(rows))
    return path


if __name__ == "__main__":
    want = [a.lower() for a in sys.argv[1:]] or LECTURES
    for name in want:
        for path, n in build(name):
            size = os.path.getsize(path) // 1024
            tag = f"{n} slides" if n else "notes"
            print(f"  {os.path.basename(path):<62} {size:>4} KB  {tag}")
    path = build_hub()
    print(f"  {os.path.basename(path):<62} {os.path.getsize(path)//1024:>4} KB  hub")
