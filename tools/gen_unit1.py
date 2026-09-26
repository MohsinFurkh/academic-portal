#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Regenerate the CSEG3060 Unit I student notes and the Unit I hub page.

    python3 tools/gen_unit1.py [l01 l02 ...]

With no arguments every lecture is rebuilt. Content lives in tools/unit1/lNN.py;
the shared renderers and markup helpers live in tools/rm/kit.py.

Unit I is notes-only: the lecture decks for this unit already exist as PDFs
(L01-L04) and as HTML decks (L05-L07) and are not generated here.
"""
import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "rm"))
sys.path.insert(0, os.path.join(HERE, "unit1"))
ROOT = os.path.join(os.path.dirname(HERE), "Research Methodology", "Unit I")

import kit  # noqa: E402

LECTURES = ["l01", "l02", "l03", "l04", "l05", "l06", "l07"]

# One row per lecture on the Unit I hub page.
HUB_ROWS = {
    "l01": ("CO1", "What separates a research problem from a topic, why its formulation is "
            "the most consequential decision in a project, where problems come from, and the "
            "five-phase process for identifying one."),
    "l02": ("CO1", "The external criteria against which a problem is judged and the internal "
            "characteristics it must possess, the difference between the two, and the ten "
            "errors of selection."),
    "l03": ("CO1", "The essential attributes grouped as conceptual quality, operational "
            "feasibility and strategic value; the ATTR-FEAS checklist; and the five families "
            "of selection error."),
    "l04": ("CO2", "Translating a validated problem into a bounded scope and SMART "
            "objectives: the six dimensions of scope, delimitations against limitations, and "
            "the aim to hypothesis chain."),
    "l05": ("CO2", "The investigative approaches available in computing research, how to "
            "match an approach to a problem, and what each one licenses you to conclude."),
    "l06": ("CO2", "The nature and classification of research data, primary and secondary "
            "collection methods, sampling, instrumentation, and descriptive and inferential "
            "analysis."),
    "l07": ("CO2", "Turning analysed data into defensible findings: levels of interpretation, "
            "measurement scales, reliability and validity, and the errors that corrupt "
            "interpretation."),
}


def build(name):
    mod = importlib.import_module(name)
    importlib.reload(mod)
    path = os.path.join(ROOT, mod.STEM + ".html")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(kit.notes(mod.NOTES_META, mod.NOTES_BODY))
    return path


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
            "links": mod.HUB_LINKS,
        })
    path = os.path.join(ROOT, "index.html")
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(kit.hub_unit1(rows))
    return path


if __name__ == "__main__":
    want = [a.lower() for a in sys.argv[1:]] or LECTURES
    for name in want:
        path = build(name)
        print(f"  {os.path.basename(path):<64} {os.path.getsize(path)//1024:>4} KB  notes")
    path = build_hub()
    print(f"  {os.path.basename(path):<64} {os.path.getsize(path)//1024:>4} KB  hub")
