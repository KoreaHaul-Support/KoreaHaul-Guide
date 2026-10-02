#!/usr/bin/env python3
"""Which translations are out of date?

The manifest (tools/i18n/manifest.json) stores a fingerprint of each English
page as it was when the translations were last made.

  python3 tools/i18n/status.py              # list English pages changed since translation
  python3 tools/i18n/status.py --mark PATH  # after re-translating PATH in all languages
  python3 tools/i18n/status.py --mark-all   # mark every page as up to date

The fingerprint ignores the lastUpdated date, so a date bump alone does not
count as a change.
"""
import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "src" / "content" / "docs"
MANIFEST = ROOT / "tools" / "i18n" / "manifest.json"
LOCALES = ["es", "ja", "zh-cn", "pt-br", "fr", "de"]


def english_pages():
    for p in sorted(DOCS.rglob("*.md")):
        rel = p.relative_to(DOCS)
        if rel.parts[0] not in LOCALES:
            yield str(rel.with_suffix(""))


def fingerprint(rel):
    text = (DOCS / f"{rel}.md").read_text(encoding="utf-8")
    text = re.sub(r"^lastUpdated:.*$", "", text, flags=re.M)
    return hashlib.sha256(text.encode()).hexdigest()[:16]


def load():
    return json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}


def save(m):
    MANIFEST.write_text(json.dumps(dict(sorted(m.items())), indent=1) + "\n")


if __name__ == "__main__":
    m = load()
    args = sys.argv[1:]
    if args[:1] == ["--mark-all"]:
        save({p: fingerprint(p) for p in english_pages()})
        print("all pages marked up to date")
    elif args[:1] == ["--mark"]:
        for p in args[1:]:
            m[p] = fingerprint(p)
        save(m)
        print("marked:", ", ".join(args[1:]))
    else:
        stale = [p for p in english_pages() if m.get(p) != fingerprint(p)]
        missing = [f"{l}/{p}" for p in english_pages() for l in LOCALES if not (DOCS / l / f"{p}.md").exists()]
        gone = [p for p in m if not (DOCS / f"{p}.md").exists()]
        print(f"English pages changed since translation: {len(stale)}")
        for p in stale:
            print("  ", p)
        if missing:
            print(f"Missing translations: {len(missing)}")
            for p in missing:
                print("  ", p)
        if gone:
            print(f"Pages removed in English (delete their translations): {', '.join(gone)}")
