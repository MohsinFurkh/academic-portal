#!/usr/bin/env bash
# Rebuild every generated page from the originals, then the search index.
#
# The page generators are one-shot migration tools: they read the ORIGINAL
# page and write the redesigned one over it. To re-run them you must first
# restore the originals from git, which is what this script does.
#
# Day to day you do not need this. Add material by editing the HTML directly,
# then run only:   python3 tools/build-search-index.py
set -euo pipefail
cd "$(dirname "$0")/.."

GEN1=("Devops Overview" "DevOps" "Python Programming" "Database Systems"
      "C Programming" "Object Oriented Programming"
      "Data Structures and Algorithms" "Discrete Mathematics"
      "Operating Systems" "Computer Networks" "Computer Architecture"
      "Compiler Design" "Theory of Computation" "Software Engineering"
      "Artificial Intelligence" "Machine Learning")

RESKIN=("DevOps Automation/index.html" "Research Methodology/index.html"
        "Research Methodology/assignments.html" "Modeling and Simulation/index.html"
        "blog/the-lost-art-of-learning.html" "blog/the-art-of-effective-note-taking.html"
        "blog/patience-sabr-lessons-from-ayyub.html")

echo "restoring originals..."
for d in "${GEN1[@]}"; do git checkout -- "$d/index.html"; done
for f in "${RESKIN[@]}"; do git checkout -- "$f"; done

echo "generating pages..."
python3 tools/gen_home.py
python3 tools/gen_courses.py
python3 tools/gen_pages.py
python3 tools/fix-links.py
python3 tools/reskin.py

echo "building search index..."
python3 tools/build-search-index.py

echo "done."
