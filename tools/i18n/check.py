#!/usr/bin/env python3
"""Check translated pages against their English source.

Usage:
  python3 tools/i18n/check.py                 # all locales, all pages
  python3 tools/i18n/check.py es              # one locale
  python3 tools/i18n/check.py es getting-started/fees   # one page

Checks: same HTML tags in the same order, same links, same emails, same
prices (₩ / $ / USD / EUR amounts) and percentages, same heading count,
same frontmatter except the translatable fields, no em dashes.
Exit code 1 if anything fails.
"""
import re
import sys
from collections import Counter
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "src" / "content" / "docs"
LOCALES = ["es", "ja", "zh-cn", "pt-br", "fr", "de"]
TRANSLATABLE = {"title", "description", "hero"}


def split(text):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        return None, text
    return yaml.safe_load(m.group(1)) or {}, m.group(2)


def tags(body):
    return re.findall(r"</?([a-zA-Z][a-zA-Z0-9]*)\b", body)


def links(body):
    md = re.findall(r"\]\(([^)\s]+)", body)
    html = re.findall(r'href="([^"]+)"', body)
    return Counter(md + html)


def emails(body):
    return Counter(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", body))


MONEY = re.compile(r"(?:₩|\\?\$|USD\s?|EUR\s?)\s?\d[\d,.]*|\d[\d,.]*\s?%")


def money(body):
    out = Counter()
    for m in MONEY.findall(body):
        out[re.sub(r"[\s\\]", "", m).rstrip(".,")] += 1
    return out


def headings(body):
    return len(re.findall(r"^#{1,6} ", body, re.M))


def check(locale, rel):
    errs = []
    src = DOCS / f"{rel}.md"
    dst = DOCS / locale / f"{rel}.md"
    if not dst.exists():
        return ["missing"]
    sfm, sbody = split(src.read_text(encoding="utf-8"))
    try:
        dfm, dbody = split(dst.read_text(encoding="utf-8"))
    except yaml.YAMLError as e:
        return [f"frontmatter is not valid YAML: {e}"]
    if dfm is None:
        return ["no frontmatter"]
    if not dfm.get("title"):
        errs.append("no title")
    for k in set(sfm) | set(dfm):
        if k in TRANSLATABLE:
            continue
        if sfm.get(k) != dfm.get(k):
            errs.append(f"frontmatter '{k}' differs from English")
    if "hero" in sfm:
        sh, dh = sfm["hero"], dfm.get("hero") or {}
        sa, da = sh.get("actions", []), dh.get("actions", [])
        if [(a.get("link"), a.get("variant")) for a in sa] != [(a.get("link"), a.get("variant")) for a in da]:
            errs.append("hero action links differ")
    if tags(sbody) != tags(dbody):
        st, dt = tags(sbody), tags(dbody)
        i = next((i for i, (a, b) in enumerate(zip(st, dt)) if a != b), min(len(st), len(dt)))
        errs.append(f"HTML tags differ (English {len(st)}, translation {len(dt)}, first difference at tag #{i + 1})")
    for name, fn in (("links", links), ("emails", emails), ("prices/percentages", money)):
        a, b = fn(sbody), fn(dbody)
        if a != b:
            missing = a - b
            extra = b - a
            errs.append(f"{name} differ: missing {dict(missing)} extra {dict(extra)}")
    if headings(sbody) != headings(dbody):
        errs.append(f"heading count differs ({headings(sbody)} vs {headings(dbody)})")
    full = dst.read_text(encoding="utf-8")
    if "—" in full or "――" in full:
        errs.append("contains an em dash")
    return errs


def english_pages():
    for p in sorted(DOCS.rglob("*.md")):
        rel = p.relative_to(DOCS)
        if rel.parts[0] in LOCALES:
            continue
        yield str(rel.with_suffix(""))


if __name__ == "__main__":
    locales = [sys.argv[1]] if len(sys.argv) > 1 else LOCALES
    pages = [sys.argv[2]] if len(sys.argv) > 2 else list(english_pages())
    bad = 0
    missing = 0
    for loc in locales:
        for rel in pages:
            errs = check(loc, rel)
            if errs == ["missing"]:
                missing += 1
                if len(pages) == 1:
                    print(f"{loc}/{rel}: missing")
                continue
            if errs:
                bad += 1
                for e in errs:
                    print(f"{loc}/{rel}: {e}")
    print(f"checked {len(locales)} locale(s) x {len(pages)} page(s): {bad} with problems, {missing} missing")
    sys.exit(1 if bad else 0)
