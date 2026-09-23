#!/usr/bin/env bash
# Rebuild the search index.
#
# This is the only build step the site has. Run it after adding or removing
# material so the new files become findable:
#
#     ./tools/build.sh
#
# The page generators next to this script (gen_home.py, gen_courses.py,
# gen_pages.py, reskin.py) were one-shot migration tools used for the 2026
# redesign. They read each ORIGINAL page and wrote the redesigned one over it.
# Now that the redesign is committed, the HTML files are the source of truth
# and are edited directly -- re-running those generators would parse their own
# output, and would discard any edit made since. They refuse to run for that
# reason. They are kept for reference, not for routine use.
#
# gen_home.py is the exception: the home page is still generated from
# tools/catalogue.py, so edit the catalogue and run:
#
#     python3 tools/gen_home.py
#
set -euo pipefail
cd "$(dirname "$0")/.."

if [ "${1:-}" = "--home" ]; then
    echo "regenerating the home page from tools/catalogue.py..."
    python3 tools/gen_home.py
fi

python3 tools/build-search-index.py
