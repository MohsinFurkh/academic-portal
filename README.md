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
./tools/build.sh
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

## The generators

`tools/` also holds the generators used for the 2026 redesign. They were
**one-shot migration tools**: each read the original page and wrote the
redesigned one over it. Now that the redesign is committed, the HTML files are
the source of truth and are edited directly — re-running a generator would
parse its own output and discard later edits, so they refuse to run. They are
kept for reference.

The one exception is the home page, which is still generated from the course
list:

```bash
python3 tools/gen_home.py      # after editing tools/catalogue.py
```

| file | what it does |
|---|---|
| `build-search-index.py` | crawls the site and writes `assets/search-index.json` |
| `catalogue.py` | the course list: titles, codes, sessions, status |
| `gen_home.py` | the home page, from the catalogue |
| `shell.py` | shared head, masthead, search and footer |
| `gen_courses.py` | *(migration)* rebuilt the standard course pages |
| `gen_pages.py` | *(migration)* research, about and the blog index |
| `reskin.py` | *(migration)* re-dressed the bespoke pages and blog posts |
| `fix-links.py` | *(migration)* repaired known broken relative paths |

## Local preview

```bash
npx -y http-server . -p 8123 -c-1
```

## Private material

`Claude outputs/` is in `.gitignore`. Question papers and answer keys must
never be committed — GitHub Pages serves every file in the repository at a
guessable URL, whether or not anything links to it.
