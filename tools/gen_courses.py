#!/usr/bin/env python3
"""Rebuild the first-generation course index pages on the new design system.

Content is read out of the existing page and re-rendered; nothing is dropped.
Links that point at files which do not exist on disk are kept but marked
unavailable, so a student is never sent to a 404 without warning.
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
COURSE_BY_DIR = {c["dir"]: c for c in COURSES}

ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
         "XI", "XII", "XIII"]


EMOJI = re.compile("[\\U0001F000-\\U0001FAFF\\u2600-\\u27BF\\uFE0F]+")


def clean(s):
    return re.sub(r"\\s+", " ", EMOJI.sub("", s or "")).strip()


def exists(course_dir, href):
    """Does this relative link resolve to a file in the repo?"""
    if not href or href.startswith(("http", "mailto:", "#", "//")):
        return True
    target = unquote(urlparse(href).path).replace("\\", "/")
    return os.path.exists(os.path.normpath(os.path.join(ROOT, course_dir, target)))


def act_label(text, href):
    t = clean(text).lower()
    if "download" in t:
        return "Download"
    if "view" in t or "open" in t or "read" in t or "present" in t:
        return "Open"
    if "start" in t:
        return "Start"
    label = clean(text)
    return label if 0 < len(label) <= 14 else "Open"


# --- Reading the old page ------------------------------------------------

UNIT_BLOCK = ".unit-section, .unit-card"
ITEM_ROW = ".presentation-item-detailed, .resource-item"


def links_in(node, course_dir):
    out = []
    for a in node.select("a"):
        href = (a.get("href") or "").strip()
        cls = " ".join(a.get("class", []))
        dead = "disabled" in cls or not href or href == "#"
        if not dead and not exists(course_dir, href):
            dead = True
        out.append({
            "label": act_label(a.get_text(" ", strip=True), href),
            "raw": clean(a.get_text(" ", strip=True)),
            "href": href, "dead": dead,
            "ext": href.startswith(("http", "mailto:")),
        })
    return out


def read_items(node, course_dir, single=False):
    """Every lecture / book / link row inside a block (or the row itself).

    A row may carry more than one description paragraph: the first names the
    item, any that follow expand on it. Both are kept.
    """
    items = []
    for row in ([node] if single else node.select(ITEM_ROW)):
        # Some rows contain further rows (unclosed divs in the source); only
        # take the parts that belong to this row directly.
        def mine(el):
            return el.find_parent(class_="presentation-item-detailed") in (row, None) \
                or el.find_parent(class_="presentation-item-detailed") is row

        descs = [clean(d.get_text(" ", strip=True))
                 for d in row.select(".presentation-description") if mine(d)]
        descs = [d for d in descs if d]
        title = descs[0] if descs else ""
        note = " \u2014 ".join(descs[1:])
        if not title:
            h = row.find(["h3", "h4", "h5"])
            title = clean(h.get_text(" ", strip=True)) if h else ""

        date = next((d for d in row.select(".presentation-date") if mine(d)), None)
        meta = clean(date.get_text(" ", strip=True)) if date else ""

        ls = [l for l, a in zip(links_in(row, course_dir), row.select("a")) if mine(a)]

        # A resource block is often a heading over a list: either plain text
        # references, or one link per line. Split it into one entry each.
        lis = [li for li in row.select("ol > li, ul > li")]
        linked = [li for li in lis if li.find("a", href=True)]

        if linked and len(linked) == len(lis):
            for li in lis:
                a = li.find("a", href=True)
                href = (a.get("href") or "").strip()
                items.append({
                    "title": clean(li.get_text(" ", strip=True)),
                    "note": "", "meta": title,
                    "links": [{"label": "Open", "raw": "", "href": href,
                               "dead": not href or href == "#" or not exists(course_dir, href),
                               "ext": href.startswith(("http", "mailto:"))}],
                })
            continue

        refs = [clean(li.get_text(" ", strip=True)) for li in lis]
        refs = [r for r in refs if r]
        if refs and not ls:
            for r in refs:
                items.append({"title": r, "note": "", "meta": title, "links": []})
            continue
        if refs:
            note = (note + " \u2014 " if note else "") + " \u00b7 ".join(refs)

        if title or ls:
            items.append({"title": title, "note": note, "meta": meta, "links": ls})
    return items


def block_heading(node):
    h = node.select_one(".unit-title")
    if h is None:
        # tolerates the class typos in the source, e.g. class="unit V-title"
        h = node.find(["h2", "h3", "h4"])
    return clean(h.get_text(" ", strip=True)) if h else ""


UNIT_CLASSES = ("unit-section", "unit-card")
RESOURCE_CHAPTER = re.compile(r"slide|lab|book|reading|resource|assessment|"
                              r"project|tutorial|material|quiz|exam", re.I)
UNIT_HEADING = re.compile(r"^(Unit\b|Topics$)", re.I)


def is_unit_block(tag):
    return tag.name in ("div", "section") and any(
        c in UNIT_CLASSES for c in (tag.get("class") or []))


def read_blocks(soup, course_dir):
    """Every unit block on the page, in document order.

    Some source pages nest unit blocks inside one another (unclosed divs), so
    items are attributed to their *nearest* enclosing block rather than to
    every ancestor.
    """
    body = soup.find("main") or soup.body
    out = []

    for node in body.find_all(is_unit_block):
        heading = block_heading(node)
        if not heading:
            continue

        chapter = ""
        h2 = node.find_previous("h2")
        if h2 and "unit-title" not in (h2.get("class") or []):
            chapter = clean(h2.get_text(" ", strip=True))

        topics = ""
        d = node.select_one(".unit-description")
        if d:
            topics = clean(d.get_text(" ", strip=True))
        tl = node.select_one(".unit-topics")
        if tl:
            extra = clean(tl.get_text(" \u00b7 ", strip=True))
            topics = (topics + " \u2014 " + extra) if topics else extra

        items = []
        for row in node.select(ITEM_ROW):
            if row.find_parent(is_unit_block) is not node:
                continue
            items.extend(read_items(row, course_dir, single=True))
        for a in node.select("a.lecture-link"):
            if a.find_parent(is_unit_block) is not node:
                continue
            href = (a.get("href") or "").strip()
            items.append({
                "title": clean(a.get_text(" ", strip=True)), "note": "", "meta": "",
                "links": [{"label": "Open", "raw": "", "href": href,
                           "dead": not href or href == "#" or not exists(course_dir, href),
                           "ext": False}]})
        if not items:
            soon = node.select_one(".coming-soon")
            if soon:
                items.append({"title": clean(soon.get_text(" ", strip=True)),
                              "note": "", "meta": "", "links": []})

        out.append({"heading": heading, "chapter": chapter,
                    "topics": topics, "items": items})

    # Resource blocks that sit outside any unit wrapper, e.g. the
    # "Additional Resources" list of textbooks on the OOP page.
    loose = {}
    for row in body.select(".resource-item"):
        if row.find_parent(is_unit_block):
            continue
        h2 = row.find_previous("h2")
        name = clean(h2.get_text(" ", strip=True)) if h2 else "Additional resources"
        loose.setdefault(name, []).extend(read_items(row, course_dir, single=True))
    for name, items in loose.items():
        if items:
            out.append({"heading": name, "chapter": name,
                        "topics": "", "items": items})

    if not out:
        # Flat pages with no unit wrappers at all
        items = []
        for row in body.select(ITEM_ROW):
            items.extend(read_items(row, course_dir, single=True))
        if items:
            out = [{"heading": "Topics", "chapter": "", "topics": "", "items": items}]

    return out


def classify(blocks):
    """Split blocks into course content and resource sections."""
    content, resources = [], []
    for b in blocks:
        unitish = bool(UNIT_HEADING.match(b["heading"]))
        chapter_is_resource = bool(b["chapter"] and RESOURCE_CHAPTER.search(b["chapter"]))
        if unitish and not chapter_is_resource:
            content.append(b)
        else:
            resources.append(b)

    # Blocks that share a chapter become one section with sub-blocks, so the
    # six "Unit N: Presentation Slides" blocks read as a single Slides section.
    grouped, order = {}, []
    for b in resources:
        chapter = b["chapter"]
        group = bool(chapter) and bool(RESOURCE_CHAPTER.search(chapter))
        key = chapter if group else (b["heading"] or chapter)
        if key not in grouped:
            grouped[key] = []
            order.append(key)
        grouped[key].append(b)

    sections = []
    for key in order:
        blocks = grouped[key]
        if len(blocks) == 1:
            b = blocks[0]
            sections.append({"heading": b["heading"] or key, "topics": b["topics"],
                             "items": b["items"], "blocks": None})
        else:
            sections.append({"heading": key, "topics": "", "items": [],
                             "blocks": blocks})
    return content, sections


def read_leftovers(soup, course_dir, captured):
    """Any link the structured pass did not pick up, so nothing is lost.

    The old pages contain hand-built blocks (a centred div of quiz buttons,
    for instance) that match none of the class conventions.
    """
    body = soup.find("main") or soup.body
    items = []
    for a in body.find_all("a"):
        href = (a.get("href") or "").strip()
        if not href or href.startswith("#"):
            continue
        if href in captured:
            continue
        if re.match(r"^\.\./index\.html", href) or href == "index.html":
            continue
        text = clean(a.get_text(" ", strip=True))
        if not text:
            continue
        # a nearby paragraph often explains the link better than its own label
        holder = a.find_parent(["div", "li", "p", "td"])
        note = ""
        if holder:
            prev = holder.find_previous(["p", "h3", "h4"])
            if prev:
                cand = clean(prev.get_text(" ", strip=True))
                if 0 < len(cand) <= 160 and cand != text:
                    note = cand
        dead = not exists(course_dir, href)
        if note and sum(1 for i in items if i["meta"] == note) >= 1:
            note = ""                      # the same blurb above every button
        items.append({
            "title": text, "note": "", "meta": note,
            "links": [{"label": "Open", "raw": text, "href": href,
                       "dead": dead, "ext": href.startswith(("http", "mailto:"))}],
        })
        captured.add(href)
    return items


# --- Writing the new page ------------------------------------------------

def render_entry(item, n):
    links = item["links"]
    primary = next((l for l in links if not l["dead"]), None)
    rest = [l for l in links if l is not primary]

    title = S.esc(item["title"]) if item["title"] else "Untitled"
    if primary:
        rel = ' rel="noopener"' if primary["ext"] else ""
        tgt = ' target="_blank"' if primary["ext"] else ""
        head = (f'<a class="entry__title" href="{S.esc(primary["href"])}"{tgt}{rel}>'
                f'{title}</a>')
    else:
        head = f'<span class="entry__title">{title}</span>'

    acts = []
    for l in rest:
        if l["dead"]:
            acts.append(f'<span class="act" aria-disabled="true" '
                        f'title="Not published yet">{S.esc(l["label"])}</span>')
        else:
            tgt = ' target="_blank" rel="noopener"' if l["ext"] else ""
            acts.append(f'<a class="act" href="{S.esc(l["href"])}"{tgt}>'
                        f'{S.esc(l["label"])}</a>')
    # An item with no links at all is a plain reference (a book, a citation):
    # it is not waiting to be published, so it gets no action marker.

    soon = " entry--soon" if not primary else ""
    note = (f'<span class="entry__note">{S.esc(item["note"])}</span>'
            if item.get("note") else "")
    meta = f'<span class="entry__meta">{S.esc(item["meta"])}</span>' if item["meta"] else ""
    return f"""<li class="entry{soon}">
<span class="entry__no">{n:02d}</span>
<span>{head}{note}{meta}</span>
<span class="entry__acts">{''.join(acts)}</span>
</li>"""


def render_unit(block, n, is_unit=True):
    entries = "\n".join(render_entry(it, i + 1) for i, it in enumerate(block["items"]))
    body = f'<ul class="entries unit__files">\n{entries}\n</ul>' if entries else \
           '<p class="unit__meta">Not published yet.</p>'
    topics = (f'<span class="unit__topics">{S.esc(block["topics"])}</span>'
              if block["topics"] else "")
    count = len(block["items"])
    no = f"{n:02d}" if is_unit else "·"

    # "Unit III: Storage & Indexing (5 Lecture Hours)" -> number in the gutter,
    # name as the title, hours on their own quiet line.
    heading = block["heading"]
    hours = ""
    mh = re.search(r"\s*\(([^)]*\b(?:lecture|lab|contact)\s*hours?)\)\s*$", heading, re.I)
    if mh:
        hours = mh.group(1)
        heading = heading[:mh.start()].strip()

    m = re.match(r"^Unit\s+([IVXLC\d]+)\s*[:–—-]?\s*(.*)$", heading, re.I)
    if m and is_unit:
        rom = m.group(1).upper()
        no = rom if not rom.isdigit() else ROMAN[int(rom) - 1]
        heading = m.group(2) or f"Unit {rom}"

    return f"""<li class="unit">
<span class="unit__no">{no}</span>
<span>
<span class="unit__title">{S.esc(heading)}</span>
{f'<span class="unit__meta">{S.esc(hours)}</span>' if hours else ''}
{topics}

{body}
</span>
</li>"""


def build_course(c):
    src = os.path.join(ROOT, c["dir"], "index.html")
    with open(src, encoding="utf-8", errors="replace") as fh:
        raw = fh.read()

    # This is a one-shot migration tool: it reads the original page and writes
    # the rebuilt one over it. Running it on its own output would flatten the
    # units, so refuse and say how to get the source back.
    if 'class="masthead"' in raw:
        raise SystemExit(
            f'{c["dir"]}/index.html has already been rebuilt.\n'
            f'  Restore the original first:  git checkout -- "{c["dir"]}/index.html"')

    soup = BeautifulSoup(raw, "html.parser")
    for t in soup(["nav", "footer", "script"]):
        t.decompose()

    content, resources = classify(read_blocks(soup, c["dir"]))

    captured = set()
    for b in content + resources:
        for it in b["items"]:
            for l in it["links"]:
                captured.add(l["href"])

    # Hero downloads from the old page (syllabus, course plan)
    actions, hero_hrefs = [], set()
    for a in soup.select("header a, .hero a"):
        href = (a.get("href") or "").strip()
        if not href or href.startswith("#"):
            continue
        if re.search(r"\.(pdf|docx|xlsx)$", href, re.I) and exists(c["dir"], href):
            actions.append((clean(a.get_text(" ", strip=True)) or "Syllabus", href))
            hero_hrefs.add(href)
    for name in sorted(os.listdir(os.path.join(ROOT, c["dir"]))):
        if re.search(r"(syllabus|course.?plan|delivery.?plan).*\.(pdf|docx|xlsx)$", name, re.I):
            if name not in hero_hrefs:
                label = "Syllabus" if "syllabus" in name.lower() else "Course plan"
                actions.append((label, name))
                hero_hrefs.add(name)
    captured |= hero_hrefs

    leftovers = read_leftovers(soup, c["dir"], captured)
    if leftovers:
        resources.append({"heading": "Assessments & other material",
                          "topics": "", "items": leftovers, "blocks": None})

    total = sum(len(b["items"]) for b in content)
    meta = []
    if c["code"]:
        meta.append(c["code"])
    meta.append(c["field"])
    if content:
        meta.append(f"{len(content)} unit{'s' if len(content) != 1 else ''}")
    if total:
        meta.append(f"{total} entries")

    toc = [("content", "Course content")] if content else []
    for i, b in enumerate(resources):
        toc.append((f"res-{i}", b["heading"]))

    parts = [
        S.head(c["title"].replace("&amp;", "&"),
               clean(re.sub("<[^>]+>", "", c["desc"])),
               depth=1, canonical=c["dir"] + "/index.html", og_type="article"),
        S.masthead("courses", 1),
    ]

    act_html = "".join(
        f'<a class="btn" href="{S.esc(h)}" target="_blank" rel="noopener">'
        f'{S.icon("doc")}{S.esc(l)}</a>' for l, h in actions)

    status_cls = "status--current" if c["status"] == "current" else ""
    parts.append(f"""<div class="wrap">
<nav aria-label="Breadcrumb"><ol class="crumbs">
<li><a href="../index.html">Portal</a></li>
<li><a href="../index.html#courses">Courses</a></li>
<li>{c["title"]}</li>
</ol></nav>
<div class="page-head">
<span class="status {status_cls}">{STATUS_LABEL[c["status"]]}</span>
<h1 class="page-head__title">{c["title"]}</h1>
<p class="page-head__meta">{''.join(f'<span>{m}</span>' for m in meta)}</p>
<p class="page-head__lede lede">{c["desc"]}</p>
{f'<div class="page-head__actions">{act_html}</div>' if act_html else ''}
</div>
</div>
""")

    toc_html = "".join(f'<a class="toc__link" href="#{i}">{S.esc(t)}</a>' for i, t in toc)

    body = []
    if content:
        units_html = "\n".join(render_unit(b, i + 1) for i, b in enumerate(content))
        body.append(f"""<section id="content" class="section" style="padding-top:0">
<div class="section-head">
<h2 class="section-head__title">Course content</h2>
<p class="section-head__note">{len(content)} units &middot; {total} entries</p>
</div>
<ul>{units_html}</ul>
</section>""")

    for i, b in enumerate(resources):
        if b["blocks"]:
            n = sum(len(x["items"]) for x in b["blocks"])
            inner = "\n".join(render_unit(x, j + 1, is_unit=False)
                              for j, x in enumerate(b["blocks"]))
            inner = f"<ul>{inner}</ul>"
        else:
            n = len(b["items"])
            entries = "\n".join(render_entry(it, j + 1)
                                for j, it in enumerate(b["items"]))
            inner = f'<ul class="entries">{entries}</ul>'
        topics = (f'<p class="lede" style="margin-bottom:var(--sp-5)">'
                  f'{S.esc(b["topics"])}</p>' if b["topics"] else "")
        body.append(f"""<section id="res-{i}" class="section">
<div class="section-head">
<h2 class="section-head__title">{S.esc(b["heading"])}</h2>
<p class="section-head__note">{n} item{'s' if n != 1 else ''}</p>
</div>
{topics}{inner}
</section>""")

    if not content and not resources:
        body.append("""<section class="section" style="padding-top:0">
<div class="section-head"><h2 class="section-head__title">Course content</h2></div>
<div class="empty">
<p class="empty__title">No material has been published for this subject yet.</p>
<p class="empty__hint">It is listed here because it may be taught again. Use the
search on the <a class="link" href="../index.html">portal home page</a> to find
related material in other courses.</p>
</div>
</section>""")

    aside = f"""<aside class="split__aside">
<p class="label" style="margin-bottom:var(--sp-3)">On this page</p>
<nav class="toc" aria-label="Sections">{toc_html}</nav>
</aside>""" if toc else ""

    parts.append(f"""<div class="wrap split">
{aside}
<div>{''.join(body)}</div>
</div>
""")

    parts.append(S.footer(1))
    S.write(os.path.join(ROOT, c["dir"], "index.html"), parts)
    return total, len(content), len(resources)


GEN1 = ["Devops Overview", "DevOps", "Python Programming", "Database Systems",
        "C Programming", "Object Oriented Programming",
        "Data Structures and Algorithms", "Discrete Mathematics"]

EMPTY = [c["dir"] for c in COURSES if c["status"] == "empty"]


if __name__ == "__main__":
    for d in GEN1 + EMPTY:
        c = COURSE_BY_DIR[d]
        t, u, r = build_course(c)
        print(f"    {d:34} {u} units, {t} entries, {r} resource sections")
