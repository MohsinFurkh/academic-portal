"""The course catalogue.

Every figure here is taken from the existing pages; nothing is invented.
`units` / `items` are counts of material that actually exists on disk.
`status` is one of: current, completed, archived, empty.
"""

SESSIONS = [
    {
        "key": "current",
        "name": "Current teaching",
        "period": "June – December 2026",
        "quiet": False,
        "note": "Actively taught this semester. Material is added as each lecture is delivered.",
    },
    {
        "key": "previous",
        "name": "Previous session",
        "period": "August 2025 – June 2026",
        "quiet": True,
        "note": "Complete and left online for revision.",
    },
    {
        "key": "archive",
        "name": "Archive",
        "period": "Prior to August 2025",
        "quiet": True,
        "note": "Earlier subjects. Some hold only a few topics; where a subject is "
                "empty it is marked so, rather than hidden.",
    },
]

COURSES = [
    # ---- Current ---------------------------------------------------------
    {
        "dir": "Devops Overview",
        "title": "DevOps Overview",
        "code": "CSDV3016",
        "field": "Software Engineering",
        "session": "current",
        "status": "current",
        "desc": "The evolution from waterfall to agile, the DevOps principles that "
                "followed, the CI/CD toolchain, distributed version control, and "
                "monitoring through to DevSecOps.",
        "meta": ["5 units", "18 lectures", "2 quizzes"],
    },
    {
        "dir": "DevOps",
        "title": "DevOps",
        "code": "CSDV3017",
        "field": "Software Engineering",
        "session": "current",
        "status": "current",
        "desc": "DevOps in depth: business context and team dynamics, adoption and "
                "architecture, core practices, tooling, testing and deployment, and "
                "issue tracking.",
        "meta": ["7 units", "18 lectures", "2 quizzes"],
    },
    {
        "dir": "DevOps Automation",
        "title": "DevOps Automation",
        "code": "CSDV2008",
        "field": "Linux &amp; Automation",
        "session": "current",
        "status": "current",
        "desc": "The software delivery pipeline, Linux automation scenarios, cron "
                "scheduling, the Linux environment, and production-quality shell "
                "scripting. Activity-led, with a terminal open throughout.",
        "meta": ["5 units", "10 lectures", "Syllabus PDF"],
    },
    {
        "dir": "Modeling and Simulation",
        "title": "Modelling and Simulation",
        "code": "CSEG8003",
        "field": "Computational Science",
        "session": "current",
        "status": "current",
        "desc": "Simulation basics and numerical error, agent-based and complex-system "
                "models, parallel and distributed simulation, probability and statistics "
                "for simulation, and results analysis.",
        "meta": ["5 units", "Unit notes", "10 experiments"],
    },
    {
        "dir": "Research Methodology",
        "title": "Research Methodology in CS",
        "code": "CSEG3060",
        "field": "Research Practice",
        "session": "current",
        "status": "current",
        "desc": "Formulating a research problem, research methods in computing science, "
                "literature study and research ethics, technical writing and proposals, "
                "and intellectual property and patents.",
        "meta": ["6 units", "2 unit notes", "5 lecture decks"],
    },

    # ---- Previous session -------------------------------------------------
    {
        "dir": "Python Programming",
        "title": "Python Programming",
        "code": "",
        "field": "Programming",
        "session": "previous",
        "status": "completed",
        "desc": "Python from the interpreter up: collections and functions, files and "
                "exceptions, GUI programming and data connectivity, object orientation, "
                "and data analysis with NumPy and pandas.",
        "meta": ["6 units", "49 lectures", "12 lab experiments"],
    },
    {
        "dir": "Object Oriented Programming",
        "title": "Object Oriented Programming",
        "code": "",
        "field": "Programming",
        "session": "previous",
        "status": "completed",
        "desc": "Object orientation in Java: classes, inheritance, packages and "
                "interfaces, exceptions and threads, generics and lambdas, Swing and "
                "JDBC, collections, and a capstone project.",
        "meta": ["6 units", "Unit I published", "3 slide decks"],
    },
    {
        "dir": "C Programming",
        "title": "C Programming",
        "code": "",
        "field": "Programming",
        "session": "previous",
        "status": "completed",
        "desc": "Computing fundamentals and the C language: control flow, arrays and "
                "functions, structures and pointers, files and memory management, and "
                "the preprocessor and libraries.",
        "meta": ["6 units", "25 lectures", "5 labs · project"],
    },
    {
        "dir": "Database Systems",
        "title": "Database Management Systems",
        "code": "",
        "field": "Data Systems",
        "session": "previous",
        "status": "completed",
        "desc": "Relational databases and SQL, transaction management, storage and "
                "indexing, distributed and NoSQL systems, dimensional design, and case "
                "studies.",
        "meta": ["6 units", "26 lectures", "13 labs"],
    },

    # ---- Archive ----------------------------------------------------------
    {
        "dir": "Data Structures and Algorithms",
        "title": "Data Structures &amp; Algorithms",
        "code": "", "field": "Core CS", "session": "archive", "status": "archived",
        "desc": "Arrays, stacks and queues, and algorithm design techniques are "
                "published; the remaining topics are listed but not yet written.",
        "meta": ["9 topics", "3 published"],
    },
    {
        "dir": "Discrete Mathematics",
        "title": "Discrete Mathematics",
        "code": "", "field": "Core CS", "session": "archive", "status": "archived",
        "desc": "Functions, probability and statistics, mathematical logic, and sets "
                "and relations are published; counting, group theory and graph theory "
                "are listed but not yet written.",
        "meta": ["7 topics", "4 published"],
    },
    {"dir": "Operating Systems", "title": "Operating Systems", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Computer Networks", "title": "Computer Networks", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Computer Architecture", "title": "Computer Architecture", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Compiler Design", "title": "Compiler Design", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Theory of Computation", "title": "Theory of Computation", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Software Engineering", "title": "Software Engineering", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Artificial Intelligence", "title": "Artificial Intelligence", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
    {"dir": "Machine Learning", "title": "Machine Learning", "code": "",
     "field": "Core CS", "session": "archive", "status": "empty",
     "desc": "No material published yet.", "meta": []},
]

STATUS_LABEL = {
    "current": "Current",
    "completed": "Completed",
    "archived": "Archived",
    "empty": "No material",
}


def by_session(key):
    return [c for c in COURSES if c["session"] == key]
