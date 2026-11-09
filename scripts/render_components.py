#!/usr/bin/env python3
"""Render the shared nav and footer from components.js into each HTML page.

Search engines see these links in the raw HTML instead of waiting for
JavaScript. components.js stays the single source of truth: edit the nav
or footer there, then run this script from the repo root:

    python3 scripts/render_components.py
"""
import datetime
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
JS = (ROOT / "components.js").read_text(encoding="utf-8")


def template(name):
    m = re.search(r"const %s = `(.*?)`;" % name, JS, re.S)
    if not m:
        raise SystemExit("Template %s not found in components.js" % name)
    return m.group(1).strip("\n")


NAV = template("navHTML")
FOOTER = template("footerHTML")
YEAR = str(datetime.date.today().year)

BLOCKS = {
    "nav": (NAV, '<div id="nav-placeholder"></div>'),
    "footer": (FOOTER, '<div id="footer-placeholder"></div>'),
}


def render(tpl, root):
    out = tpl.replace("${root}", root)
    out = out.replace("${new Date().getFullYear()}", '<span data-year>%s</span>' % YEAR)
    if "${" in out:
        raise SystemExit("Unhandled template expression in components.js")
    return out


def page_root(path):
    if path.name == "404.html":
        return "/"  # GitHub Pages serves 404.html at any depth
    return "../" * (len(path.relative_to(ROOT).parts) - 1)


changed = 0
for path in sorted(ROOT.rglob("*.html")):
    if "scripts" in path.parts:
        continue
    html = path.read_text(encoding="utf-8")
    original = html
    root = page_root(path)
    for key, (tpl, placeholder) in BLOCKS.items():
        start, end = "<!-- oa:%s:start -->" % key, "<!-- oa:%s:end -->" % key
        block = "%s\n%s\n%s" % (start, render(tpl, root), end)
        if start in html:
            html = re.sub(re.escape(start) + r".*?" + re.escape(end),
                          lambda _: block, html, flags=re.S)
        elif placeholder in html:
            html = html.replace(placeholder, block)
    if html != original:
        path.write_text(html, encoding="utf-8")
        changed += 1
        print("rendered", path.relative_to(ROOT))
print("%d file(s) updated" % changed)
