# Academic Portal

Teaching material for Computer Science students at UPES — lecture notes, slide
decks, lab sheets, class tests, quizzes and reading lists.

Live at <https://mohsinfurkh.github.io/academic-portal/>

A static site: no build step, no dependencies, no framework. Plain HTML served
by GitHub Pages.

## Layout

```
index.html              Home: the course index and site-wide search
about.html              Profile, teaching history, contact
research.html           Research threads and publications
blog/                   Notes & thoughts
<Course Name>/          One folder per subject
  index.html              The course page
  Unit I/ Unit II/ ...    Lecture documents and slide decks
quiz/  exam/            The live quiz and class-test apps (Firebase)
assets/                 The design system and search index
tools/                  One-shot generators — see below
css/ js/                Used only by older lecture documents
```

## Adding material

Add the file, link it from the course's `index.html`, then rebuild the search
index so it becomes findable:

```bash
python3 tools/build-search-index.py
```

That is the only command you need day to day. The index covers every course,
unit, lecture, note and downloadable file, matching on titles and on every
heading inside each document.

## The design system

`assets/portal.css` holds every token — colour, type, spacing, radius,
transition — and every shared component. Change a value at the top of that
file and it changes everywhere. There are no hard-coded colours in the pages.

`assets/course-page.css` re-dresses the three course pages that carry their own
bespoke structure (DevOps Automation, Research Methodology, Modelling and
Simulation) without touching their markup or their scripts.

`assets/portal.js` is the only script: theme, navigation, search, scrollspy.
Every page works without it.

Dark mode follows the system preference and remembers an explicit choice in
`localStorage`.

## Regenerating pages

`tools/` holds the generators used for the redesign. They are **one-shot
migration tools**: each reads the original page and writes the redesigned one
over it, so running one twice would parse its own output. They refuse to do
that, and `tools/build.sh` restores the originals from git first:

```bash
./tools/build.sh          # restore originals, regenerate everything, rebuild index
```

You do not need this to add material — edit the HTML directly. It is here so
the redesign can be reproduced or adjusted.

| file | what it does |
|---|---|
| `shell.py` | shared head, masthead, search and footer |
| `catalogue.py` | the course list: titles, codes, sessions, status |
| `gen_home.py` | the home page |
| `gen_courses.py` | rebuilds the standard course pages from the originals |
| `gen_pages.py` | research, about and the blog index |
| `reskin.py` | re-dresses the bespoke course pages and blog posts |
| `fix-links.py` | repairs known broken relative paths |
| `build-search-index.py` | crawls the site and writes `assets/search-index.json` |

## Local preview

```bash
npx -y http-server . -p 8123 -c-1
```

## Private material

`Claude outputs/` is in `.gitignore`. Question papers and answer keys must
never be committed — GitHub Pages serves every file in the repository at a
guessable URL, whether or not anything links to it.
