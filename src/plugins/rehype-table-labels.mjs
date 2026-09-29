// Adds data-label="<column header>" to every table cell so tables can
// collapse into stacked cards on small screens (see src/styles/custom.css).
function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(text).join('');
}
function find(node, tag, out = []) {
  if (node.type === 'element' && node.tagName === tag) out.push(node);
  for (const c of node.children || []) find(c, tag, out);
  return out;
}
export default function rehypeTableLabels() {
  return (tree) => {
    for (const table of find(tree, 'table')) {
      const labels = find(table, 'th').map((th) => text(th).trim());
      table.properties = table.properties || {};
      const cls = table.properties.className || [];
      table.properties.className = [...cls, 'kh-table', `kh-cols-${labels.length}`];
      const tbody = find(table, 'tbody')[0];
      if (!tbody) continue;
      for (const tr of find(tbody, 'tr')) {
        find(tr, 'td').forEach((td, i) => {
          td.properties = td.properties || {};
          td.properties.dataLabel = labels[i] || '';
        });
      }
    }
  };
}
