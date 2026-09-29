// 1. Wraps every table in <div class="kh-table-wrap"> so the border and sideways
//    scrolling live on the wrapper and the table itself can fill the full width.
// 2. Adds data-label="<column header>" to every cell so tables can collapse into
//    stacked cards on small screens (see src/styles/custom.css).
function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(text).join('');
}
function find(node, tag, out = []) {
  if (node.type === 'element' && node.tagName === tag) out.push(node);
  for (const c of node.children || []) find(c, tag, out);
  return out;
}
function labelTable(table) {
  const labels = find(table, 'th').map((th) => text(th).trim());
  table.properties = table.properties || {};
  const cls = table.properties.className || [];
  table.properties.className = [...cls, 'kh-table', `kh-cols-${labels.length}`];
  const tbody = find(table, 'tbody')[0];
  if (!tbody) return;
  for (const tr of find(tbody, 'tr')) {
    find(tr, 'td').forEach((td, i) => {
      td.properties = td.properties || {};
      td.properties.dataLabel = labels[i] || '';
    });
  }
}
function walk(node) {
  const kids = node.children || [];
  for (let i = 0; i < kids.length; i++) {
    const child = kids[i];
    if (child.type === 'element' && child.tagName === 'table') {
      labelTable(child);
      kids[i] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['kh-table-wrap'] },
        children: [child],
      };
    } else {
      walk(child);
    }
  }
}
export default function rehypeTableLabels() {
  return (tree) => walk(tree);
}
