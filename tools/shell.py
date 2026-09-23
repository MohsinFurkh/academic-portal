"""Shared page chrome for the academic portal.

The site has no build step: these helpers are used once by the page
generators in this folder to emit plain, self-contained HTML that can
afterwards be edited by hand like any other file in the repo.
"""

import html

SITE_URL = "https://mohsinfurkh.github.io/academic-portal/"
AUTHOR = "Mohsin Furkh Dar"
ROLE = "Assistant Professor"
SCHOOL = "School of Computer Science"
UNIVERSITY = "UPES"
EMAIL = "mohsin.dar@ddn.upes.ac.in"

SCHOLAR = "https://scholar.google.com/citations?user=DGm9l2wAAAAJ&hl=en"
LINKEDIN = "https://www.linkedin.com/in/mohsinfurkh/"
GITHUB = "https://github.com/mohsinfurkh"
RESEARCHGATE = "https://www.researchgate.net/profile/Mohsin-Furkh"
ORCID = "https://orcid.org/0000-0003-1756-9087"
PORTFOLIO = "https://mohsinfurkh.github.io/"

NAV = [
    ("courses", "Courses", "index.html#courses"),
    ("research", "Research", "research.html"),
    ("blog", "Blog", "blog/index.html"),
    ("about", "About", "about.html"),
]

# Inline, render-blocking on purpose: it must run before first paint so the
# chosen theme never flashes. Kept to the minimum that requires.
THEME_BOOT = (
    '<script>(function(){try{var t=localStorage.getItem("portal-theme");'
    'if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";'
    'document.documentElement.setAttribute("data-theme",t);}catch(e){}})();</script>'
)

ICONS = {
    "search": '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
    "close": '<path d="m6 6 12 12M18 6 6 18"/>',
    "menu": '<path d="M3 6h18M3 12h18M3 18h18"/>',
    "sun": ('<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4'
            'm11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"/>'),
    "moon": '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    "arrow": '<path d="M5 12h13m-5-6 6 6-6 6"/>',
    "out": '<path d="M13 5h6v6M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>',
    "doc": '<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7Zm0 0v4h4M9 13h6M9 17h6"/>',
    "deck": '<path d="M3 4h18v11H3Zm9 11v5m-4 0h8"/>',
}


def icon(name, cls="", size=None):
    extra = f' class="{cls}"' if cls else ""
    return (
        f'<svg{extra} viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        f'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" '
        f'aria-hidden="true">{ICONS[name]}</svg>'
    )


def esc(s):
    return html.escape(str(s), quote=True)


def head(title, description, depth=0, canonical="", extra_head="", og_type="website"):
    """<head> plus the opening of <body>. `depth` is folders below the root."""
    base = "../" * depth
    canon = SITE_URL + canonical.lstrip("/")
    full_title = title if title.endswith(AUTHOR) else f"{title} · {AUTHOR}"
    return f"""<!DOCTYPE html>
<html lang="en" data-base="{base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(full_title)}</title>
<meta name="description" content="{esc(description)}">
<meta name="author" content="{AUTHOR}">
<link rel="canonical" href="{esc(canon)}">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="{AUTHOR} — Academic Portal">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{esc(canon)}">
<meta property="og:image" content="{SITE_URL}images/profile_pic.jpg">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#faf8f5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131211" media="(prefers-color-scheme: dark)">
<link rel="icon" href="{base}images/icon.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap">
<link rel="stylesheet" href="{base}assets/portal.css">
{THEME_BOOT}{extra_head}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
"""


def masthead(active="", depth=0):
    base = "../" * depth
    links = []
    for key, text, href in NAV:
        cur = ' aria-current="page"' if key == active else ""
        links.append(f'<li><a class="nav__link" href="{base}{href}"{cur}>{text}</a></li>')
    return f"""<header class="masthead">
<div class="wrap masthead__inner">
<a class="brand" href="{base}index.html">
<span class="brand__name">{AUTHOR}</span>
<span class="brand__role">{ROLE} &middot; {UNIVERSITY}</span>
</a>
<nav id="site-nav" class="nav" data-open="false" aria-label="Main">
<ul style="display:contents">{''.join(links)}</ul>
</nav>
<div class="masthead__tools">
<button class="icon-btn search-toggle" type="button" aria-expanded="false"
        aria-controls="masthead-search" aria-label="Search the portal">{icon('search')}</button>
<button class="icon-btn theme-toggle" type="button" aria-label="Switch theme">
{icon('sun', 'icon-sun')}{icon('moon', 'icon-moon')}
</button>
<button class="icon-btn nav-toggle" type="button" aria-expanded="false"
        aria-controls="site-nav" aria-label="Menu">{icon('menu')}</button>
</div>
</div>
<div class="masthead__search" id="masthead-search" data-open="false">
<div class="wrap">{search("nav")}</div>
</div>
</header>
<main id="main">
"""


def search(uid="main", placeholder="Search courses, topics and resources"):
    """The search component. `uid` keeps ids unique when a page has two."""
    return f"""<div class="search" data-search data-open="false" data-has-query="false">
<div class="search__field">
{icon('search', 'search__icon')}
<input class="search__input" type="search" id="portal-search-{uid}" role="combobox"
       aria-expanded="false" aria-controls="portal-results-{uid}" aria-autocomplete="list"
       autocomplete="off" spellcheck="false"
       placeholder="{esc(placeholder)}" aria-label="{esc(placeholder)}">
<button class="search__clear" type="button" aria-label="Clear search">{icon('close')}</button>
<kbd class="search__hint">/</kbd>
</div>
<div class="search__panel" id="portal-results-{uid}" role="listbox" aria-label="Search results"></div>
</div>
"""


def footer(depth=0):
    base = "../" * depth
    return f"""</main>
<footer class="site-footer">
<div class="wrap">
<div class="site-footer__grid">
<div>
<p class="site-footer__name">{AUTHOR}</p>
<p class="site-footer__role">{ROLE}<br>{SCHOOL}, {UNIVERSITY}</p>
</div>
<div>
<p class="site-footer__col-head">Portal</p>
<div class="site-footer__links">
<a href="{base}index.html#courses">Courses</a>
<a href="{base}research.html">Research</a>
<a href="{base}blog/index.html">Blog</a>
<a href="{base}about.html">About</a>
<a href="{base}quiz/index.html">Live quiz</a>
<a href="{base}exam/index.html">Class test</a>
</div>
</div>
<div>
<p class="site-footer__col-head">Elsewhere</p>
<div class="site-footer__links">
<a href="mailto:{EMAIL}">Email</a>
<a href="{SCHOLAR}" rel="noopener">Google Scholar</a>
<a href="{ORCID}" rel="noopener">ORCID</a>
<a href="{LINKEDIN}" rel="noopener">LinkedIn</a>
<a href="{GITHUB}" rel="noopener">GitHub</a>
<a href="{PORTFOLIO}" rel="noopener">Portfolio</a>
</div>
</div>
</div>
<div class="site-footer__base">
<span>&copy; 2026 {AUTHOR}</span>
<span>{SCHOOL} &middot; {UNIVERSITY}</span>
</div>
</div>
</footer>
<script src="{base}assets/portal.js" defer></script>
</body>
</html>
"""


def write(path, parts):
    with open(path, "w", encoding="utf-8") as fh:
        fh.write("".join(parts))
    print(f"  wrote {path}")
