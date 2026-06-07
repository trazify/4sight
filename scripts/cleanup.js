const fs = require('fs');
const path = require('path');

const lettersDir = path.join(__dirname, '..', 'public', 'assets', 'letters');

// Delete debug path files
if (fs.existsSync(lettersDir)) {
  const files = fs.readdirSync(lettersDir);
  files.forEach(file => {
    if (file.startsWith('debug-path-')) {
      fs.unlinkSync(path.join(lettersDir, file));
    }
  });
}

// Delete debug scripts
const debugPathsScript = path.join(__dirname, 'debug_paths.js');
if (fs.existsSync(debugPathsScript)) {
  fs.unlinkSync(debugPathsScript);
}

const printBoundsScript = path.join(__dirname, 'print_bounds.js');
if (fs.existsSync(printBoundsScript)) {
  fs.unlinkSync(printBoundsScript);
}

console.log("Cleanup completed successfully!");
