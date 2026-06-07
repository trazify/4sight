const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'images', '4sight-logo.png');
const outputPath = path.join(__dirname, 'public', 'images', '4sight-logo.svg');

const params = {
  threshold: 128,
  turdSize: 2,
  optCurve: true,
  optTolerance: 0.2,
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
  color: 'currentColor',
  background: 'transparent',
};

potrace.trace(inputPath, params, function(err, svg) {
  if (err) {
    console.error('Error tracing:', err);
    process.exit(1);
  }
  fs.writeFileSync(outputPath, svg, 'utf-8');
  console.log('SVG written to:', outputPath);
  console.log('SVG size:', (Buffer.byteLength(svg) / 1024).toFixed(1), 'KB');
});
