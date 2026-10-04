#!/usr/bin/env python3
"""Convert Notion page copies (raw/*.txt) into the site's Markdown pages.

How to update the site after editing Notion:
  1. Copy the changed Notion page into raw/<slug>.txt (slugs are listed in tree.json).
     Format: "TITLE: ...", "EDITED: <ISO date>", then the page body between <content> and </content>.
  2. Run:  python3 tools/notion-sync/convert.py
  3. Commit and push. Cloudflare rebuilds the site.

New Notion page? Add it to tree.json (title, path, order, notion id, section) and to the
sidebar in astro.config.mjs.
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
OUT = ROOT.parent.parent / "src" / "content" / "docs"
TREE = json.loads((ROOT / "tree.json").read_text())
BY_ID = {v["notion"]: v for v in TREE.values()}

CALLOUT_KIND = {"yellow_bg": "caution", "orange_bg": "caution", "red_bg": "danger",
                "blue_bg": "note", "green_bg": "tip", "purple_bg": "tip"}
FOOTER_RE = re.compile(r"\n(?:---\n)?## Ready to start\?\n.*\Z", re.S)

HOME_DESC = "How KoreaHaul works: buying, receiving and shipping Korean products worldwide, with fees, carriers, customs and country guides."


def url_for(path):
    path = re.sub(r"(^|/)index$", "", path)
    return "/" + (path + "/" if path else "")


def notion_target(url):
    m = re.search(r"([0-9a-f]{32})", url.replace("-", ""))
    return BY_ID.get(m.group(1)) if m else None


def dedent_tabs(block):
    lines = block.split("\n")
    ind = [len(l) - len(l.lstrip("\t")) for l in lines if l.strip()]
    n = min(ind) if ind else 0
    return "\n".join(l[n:] if l.startswith("\t" * n) else l for l in lines)


def conv_columns(m):
    inner = re.sub(r"</?column[^>]*>|<empty-block/>", "", m.group(1))
    return "\n" + dedent_tabs(inner.strip("\n")) + "\n"


def conv_table(m):
    rows = re.findall(r"<tr>(.*?)</tr>", m.group(0), re.S)
    out = []
    for i, r in enumerate(rows):
        cells = [re.sub(r"\s*\n\s*", " ", c.strip()).replace("|", "\\|")
                 for c in re.findall(r"<td>(.*?)</td>", r, re.S)]
        cells = [re.sub(r"^•\s*", "", c) for c in cells]
        out.append("| " + " | ".join(cells) + " |")
        if i == 0:
            out.append("| " + " | ".join(["---"] * len(cells)) + " |")
    return "\n\n" + "\n".join(out) + "\n\n"


def conv_callout(m):
    attrs, body = m.group(1), m.group(2)
    color = re.search(r'color="([^"]+)"', attrs)
    kind = CALLOUT_KIND.get(color.group(1) if color else "", "note")
    text = dedent_tabs(body.strip("\n")).strip()
    title = ""
    mt = re.match(r"\*\*([^*\n]{1,60}[:?!])\*\*\s*(.*)", text, re.S)
    if mt:
        title, text = mt.group(1).rstrip(":"), mt.group(2).strip()
    head = f'<p class="kh-callout-title">{title}</p>\n\n' if title else ""
    return f'\n\n<div class="kh-callout kh-callout--{kind}">\n\n{head}{text}\n\n</div>\n\n'


def conv_details(m):
    summary = re.sub(r"^\*\*(.*)\*\*$", r"\1", m.group(1).strip())
    body = dedent_tabs(m.group(2).strip("\n")).strip()
    return f"\n\n<details>\n<summary>{summary}</summary>\n\n{body}\n\n</details>\n\n"


def conv_page(m):
    t = notion_target(m.group(1))
    title = m.group(2).strip()
    return f"- [{title}]({url_for(t['path'])})" if t else f"- {title}"


def conv_mention(m):
    t = notion_target(m.group(1))
    return f"[{t['title']}]({url_for(t['path'])})" if t else ""


def conv_mdlink(m):
    t = notion_target(m.group(2))
    return f"[{m.group(1)}]({url_for(t['path'])})" if t else m.group(0)


def layout(body):
    """Notion gives one block per line. Put blank lines between blocks, keep lists and tables tight."""
    out, in_code = [], False
    def kind(ln):
        if re.match(r"^\s*([-*+]|\d+\.) ", ln): return "list"
        if ln.startswith("    ") and ln.strip(): return "cont"
        if ln.startswith("|"): return "table"
        return "block"
    prev = None
    for ln in body.split("\n"):
        if ln.startswith("```"):
            if not in_code and out and out[-1] != "": out.append("")
            out.append(ln); in_code = not in_code
            if not in_code: out.append(""); prev = None
            continue
        if in_code: out.append(ln); continue
        if not ln.strip():
            if out and out[-1] != "": out.append("")
            prev = None; continue
        k = kind(ln)
        tight = (prev == "table" and k == "table") or (prev in ("list", "cont") and k in ("list", "cont"))
        if prev and not tight and out[-1] != "": out.append("")
        out.append(ln); prev = k
    return "\n".join(out)


def chips(body):
    """A list made only of links to guide pages becomes a grid of tappable chips."""
    out, buf = [], []
    def flush():
        if len(buf) >= 2:
            items = "".join(f'<a class="kh-chip" href="{h}">{t}</a>' for t, h in buf)
            out.append(f'<div class="kh-chips not-content">{items}</div>')
        else:
            out.extend(f"- [{t}]({h})" for t, h in buf)
        buf.clear()
    for ln in body.split("\n"):
        m = re.fullmatch(r"- \[([^\]]+)\]\((/[^)]*)\)", ln)
        if m:
            buf.append((m.group(1), m.group(2))); continue
        if buf and ln.strip() == "":
            continue
        if buf:
            flush(); out.append("")
        out.append(ln)
    if buf: flush()
    return "\n".join(out)


DESC = {}


def convert(slug):
    meta = TREE[slug]
    raw = (RAW / f"{slug}.txt").read_text(encoding="utf-8")
    title = meta["title"] if slug == "index" else re.search(r"^TITLE: (.*)$", raw, re.M).group(1).strip()
    edited = re.search(r"^EDITED: (\d{4}-\d{2}-\d{2})", raw, re.M).group(1)
    body = re.search(r"<content>\n(.*)\n</content>", raw, re.S).group(1)

    body = FOOTER_RE.sub("\n", body)
    # In-page "Last updated ..." lines always show the Notion edit date of the page
    import datetime as _dt
    _d = _dt.date.fromisoformat(edited)
    body = re.sub(r"^\*Last updated [^*\n]+\*$", f"*Last updated {_d.day} {_d.strftime('%B')} {_d.year}*", body, flags=re.M)
    # Notion leftovers around the "Import charges may include..." note on country pages
    body = re.sub(r"^\*?\\*\*? ?(Import charges may include[^\n]*?)\\?\*?$", r"\1", body, flags=re.M)
    body = re.sub(r"<columns>(.*?)</columns>", conv_columns, body, flags=re.S)
    body = body.replace("<empty-block/>", "")
    body = re.sub(r"<colgroup>.*?</colgroup>", "", body, flags=re.S)
    body = re.sub(r"<table[^>]*>.*?</table>", conv_table, body, flags=re.S)
    body = re.sub(r"<callout([^>]*)>(.*?)</callout>", conv_callout, body, flags=re.S)
    body = re.sub(r"<details>\s*<summary>(.*?)</summary>(.*?)</details>", conv_details, body, flags=re.S)
    body = re.sub(r'<page url="([^"]+)">(.*?)</page>', conv_page, body)
    body = re.sub(r'<mention-page url="([^"]+)"\s*/>', conv_mention, body)
    body = re.sub(r"\[([^\]]+)\]\((https://(?:app\.notion\.com|www\.notion\.so|notion\.so)/[^)]+)\)", conv_mdlink, body)
    body = re.sub(r"!\[([^\]]*)\]\(https://[^)]+\)",
                  "<!-- IMAGE: Enuri search result screenshot (스크린샷_2026-09-17_14.49.59.png). "
                  "Put it in src/assets/ and replace this comment with ![Enuri search result](../../../assets/enuri-result.png) -->",
                  body)
    body = body.replace("```javascript", "```text")
    body = body.replace("\\$", "$").replace("—", "-").replace("–", "-")
    body = re.sub(r"^(\t+)", lambda m: "    " * len(m.group(1)), body, flags=re.M)
    body = layout(body)
    body = chips(body)
    body = re.sub(r"(:::\w+(?:\[[^\]]*\])?)\n\n", r"\1\n", body)
    body = re.sub(r"\n\n(:::)\n", r"\n\1\n", body)
    body = re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"

    if slug == "index":
        desc = HOME_DESC
    elif meta.get("desc"):
        desc = meta["desc"]
    else:
        first = next((l for l in body.split("\n") if l.strip()
                      and not re.match(r"^(:::|#|-|\||<|\*|\[|>|\d+\.|```)", l)), title)
        desc = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", first)
        desc = re.sub(r"[*`_]", "", desc).strip()
        if len(desc) > 160:
            desc = desc[:157].rsplit(" ", 1)[0] + "..."
    desc = desc.replace('"', "'")
    DESC[slug] = desc
    fm = ["---", f'title: "{title}"', f'description: "{desc}"', f"lastUpdated: {edited}"]
    if slug != "index":
        fm += ["sidebar:", f"  order: {meta['order']}"]
    fm.append("---")
    return "\n".join(fm) + "\n\n" + body



def link(slug):
    return url_for(TREE[slug]["path"])


def in_section(section):
    return sorted([k for k, v in TREE.items() if v["section"] == section], key=lambda k: TREE[k]["order"])


TOPICS = [
    ("news", "News & Updates",
     "Holiday schedules, pricing changes, and new customs rules.",
     in_section("news")[:4], None,
     [(None, in_section("news"))]),
    # key, title, description, card links, all-articles link, groups for the topic page
    ("getting-started", "Getting Started & Services",
     "How our services work, what they cost, how to pay, and what happens at the warehouse.",
     ["getting-started", "buy-for-me", "receive-for-me", "fees"], None,
     [(None, in_section("getting-started"))]),
    ("shipping", "International Shipping Tips",
     "Carriers and rates, duties and taxes, HS codes, and insurance.",
     ["carriers-and-rates", "duty-and-tax-calculation", "hs-codes-for-common-items", "insurance-and-claims"], None,
     [(None, in_section("shipping"))]),
    ("country-guide", "Country Guide",
     "Delivery options, customs rules, and cost examples for 25 destinations.",
     ["united-states", "united-kingdom", "australia", "european-union"], "/country-guide/", None),
    ("shopping-tips", "Shopping Tips",
     "Spend less on shipping, compare prices, and shop Korea's popular stores.",
     ["how-to-spend-less-on-shipping", "price-comparison", "shop-from-popular-stores", "secondhand-and-resale-platforms"], None,
     [(None, in_section("shopping-tips")), ("Popular stores", in_section("stores"))]),
    ("what-to-buy", "What to Buy",
     "Tips for K-beauty, K-pop, fashion, snacks, LEGO, and more.",
     ["k-beauty", "k-pop-md", "k-fashion", "lego"], None,
     [(None, in_section("what-to-buy"))]),
]


def count(topic):
    key = topic[0]
    if key == "country-guide":
        return len([k for k, v in TREE.items() if v["section"].startswith("country-guide/")])
    return sum(len(g[1]) for g in topic[5])


def topic_url(topic):
    return topic[4] or f"/topics/{topic[0]}/"


def home_page():
    raw = (RAW / "index.txt").read_text(encoding="utf-8")
    body = re.search(r"<content>\n(.*)\n</content>", raw, re.S).group(1)
    faqs = re.findall(r"<details>\s*<summary>(.*?)</summary>(.*?)</details>", body, re.S)
    edited = re.search(r"^EDITED: (\d{4}-\d{2}-\d{2})", raw, re.M).group(1)

    cards = []
    for t in TOPICS:
        links = "".join(f'<li><a href="{link(s)}">{TREE[s]["title"]}</a></li>' for s in t[3])
        cards.append(
            f'<div class="kh-cat"><div class="kh-cat-head"><h2 class="kh-cat-title"><a href="{topic_url(t)}">{t[1]}</a></h2>'
            f'<p class="kh-cat-desc">{t[2]}</p></div><ul class="kh-cat-links">{links}</ul>'
            f'<a class="kh-cat-all" href="{topic_url(t)}">All {count(t)} articles <span aria-hidden="true">&rarr;</span></a></div>')

    faq_md = []
    for q, a in faqs:
        q = re.sub(r"^\*\*(.*)\*\*$", r"\1", q.strip())
        a = dedent_tabs(a.strip("\n")).strip().replace("—", "-")
        faq_md.append(f"<details>\n<summary>{q}</summary>\n\n{a}\n\n</details>")

    fm = f"""---
title: "KoreaHaul Guide"
description: "{HOME_DESC}"
lastUpdated: {edited}
template: doc
hero:
  title: "How can we help?"
  tagline: "Welcome to KoreaHaul. This guide covers everything you need to get started and make the most of our services."
  actions:
    - text: "Create a request"
      link: "https://www.koreahaul.com/"
      variant: primary
    - text: "Contact support"
      link: "mailto:support@koreahaul.com"
      variant: minimal
---
"""
    help_box = ('<div class="kh-help not-content"><div><h2>Still need help?</h2>'
                '<p>If you have any questions about our services, please email '
                '<a href="mailto:support@koreahaul.com">support@koreahaul.com</a> or reach out to us on WhatsApp: '
                '<a href="https://wa.me/821057251222">+82-10-5725-1222</a></p>'
                '<p class="kh-help-social">Follow us on <a href="https://www.instagram.com/koreahaulofficial/">Instagram</a> and '
                '<a href="https://www.tiktok.com/@koreahaulofficial">TikTok</a></p></div>'
                '<a class="kh-btn kh-btn-dark" href="mailto:support@koreahaul.com">Email support</a></div>')
    return (fm + "\n" + f'<div class="kh-cats not-content">{"".join(cards)}</div>\n\n'
            + "## Frequently asked questions\n\n" + "\n\n".join(faq_md) + "\n\n" + help_box + "\n")


def topic_page(t):
    parts = []
    for heading, slugs in t[5]:
        if heading:
            parts.append(f"## {heading}\n")
        items = "".join(
            f'<a class="kh-item" href="{link(s)}"><span class="kh-item-title">{TREE[s]["title"]}</span>'
            f'<span class="kh-item-desc">{DESC.get(s, "")}</span></a>' for s in slugs)
        parts.append(f'<div class="kh-list not-content">{items}</div>\n')
    fm = f'---\ntitle: "{t[1]}"\ndescription: "{t[2]}"\n---\n\n'
    return fm + "\n".join(parts)


if __name__ == "__main__":
    import shutil
    # Clear the English pages, but keep the translations in docs/<locale>/
    LOCALE_DIRS = {"es", "ja", "zh-cn", "pt-br", "fr", "de"}
    if OUT.exists():
        for p in OUT.iterdir():
            if p.name in LOCALE_DIRS:
                continue
            shutil.rmtree(p) if p.is_dir() else p.unlink()
    for slug, meta in TREE.items():
        dest = OUT / f"{meta['path']}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(convert(slug), encoding="utf-8")
    (OUT / "index.md").write_text(home_page(), encoding="utf-8")
    n = 0
    for t in TOPICS:
        if t[5] is None:
            continue
        d = OUT / "topics" / f"{t[0]}.md"
        d.parent.mkdir(parents=True, exist_ok=True)
        d.write_text(topic_page(t), encoding="utf-8")
        n += 1
    print("wrote", len(TREE), "pages +", n, "topic pages")
