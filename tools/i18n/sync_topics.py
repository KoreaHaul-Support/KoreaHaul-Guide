#!/usr/bin/env python3
"""Make the translated topic list pages (docs/<locale>/topics/*.md) use each
linked page's translated title and description, so they always match.
Run after translating or updating pages:  python3 tools/i18n/sync_topics.py
"""
import html
import json
import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "src" / "content" / "docs"
LOCALES = ["es", "ja", "zh-cn", "pt-br", "fr", "de"]
ITEM = re.compile(
    r'(<a class="kh-item" href="/([^"]+?)/?"><span class="kh-item-title">)(.*?)(</span><span class="kh-item-desc">)(.*?)(</span></a>)'
)


def front(path):
    m = re.match(r"^---\n(.*?)\n---\n", path.read_text(encoding="utf-8"), re.S)
    return yaml.safe_load(m.group(1)) if m else {}


changed = 0
for loc in LOCALES:
    titles = json.loads((ROOT / "tools" / "i18n" / "titles" / f"{loc}.json").read_text(encoding="utf-8"))
    for page in sorted((DOCS / loc / "topics").glob("*.md")):
        text = page.read_text(encoding="utf-8")

        def fix(m):
            slug = m.group(2)
            target = DOCS / loc / f"{slug}.md"
            if not target.exists():
                target = DOCS / loc / slug / "index.md"
            key = slug if (DOCS / f"{slug}.md").exists() else f"{slug}/index"
            title = titles.get(key, m.group(3))
            desc = m.group(5)
            if target.exists():
                desc = html.escape(front(target).get("description", desc), quote=False)
            return f"{m.group(1)}{html.escape(title, quote=False)}{m.group(4)}{desc}{m.group(6)}"

        new = ITEM.sub(fix, text)
        if new != text:
            page.write_text(new, encoding="utf-8")
            changed += 1
print(f"topic pages updated: {changed}")
