const fs = require('fs');
const path = require('path');

const width = 128;
const height = 128;
const header = Buffer.alloc(54);

// File Header
header.write('BM', 0); // Signature
header.writeUInt32LE(54 + width * height * 3, 2); // File size
header.writeUInt32LE(54, 10); // Pixel data offset

// Info Header
header.writeUInt32LE(40, 14); // Header size
header.writeInt32LE(width, 18); // Width
header.writeInt32LE(height, 22); // Height
header.writeUInt16LE(1, 26); // Planes
header.writeUInt16LE(24, 28); // Bits per pixel (24-bit RGB)
header.writeUInt32LE(0, 30); // Compression (0 = BI_RGB)
header.writeUInt32LE(width * height * 3, 34); // Image size

const pixels = Buffer.alloc(width * height * 3);
for (let i = 0; i < pixels.length; i += 3) {
  // Generate a soft noise value (centered around mid-gray for nice blending)
  const noise = Math.floor(100 + Math.random() * 80);
  pixels[i] = noise;     // B
  pixels[i + 1] = noise; // G
  pixels[i + 2] = noise; // R
}

const fileBuffer = Buffer.concat([header, pixels]);
const outputPath = path.join(__dirname, '..', 'public', 'noise.bmp');
fs.writeFileSync(outputPath, fileBuffer);
console.log('Successfully wrote noise.bmp to ' + outputPath);
