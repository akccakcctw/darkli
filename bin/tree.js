const archy = require('archy');

const structure = archy({
  label: 'LightBox.js',
  nodes: [
    {
      label: 'src',
      nodes: ['js', 'sass'],
    },
    {
      label: 'dist',
      nodes: ['js', 'css'],
    },
    {
      label: 'demo',
      nodes: ['index.html'],
    },
    {
      label: 'node_modules',
    },
  ],
});

console.log(structure);
