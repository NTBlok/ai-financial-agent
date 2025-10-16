const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon sizes and colors
const sizes = [16, 32, 48, 128];
const colors = {
  background: '#4a6cf7',
  text: '#ffffff'
};

// Generate each icon size
sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, size, size);
  
  // Draw text (AI)
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Adjust font size based on icon size
  const fontSize = Math.floor(size * 0.6);
  ctx.font = `bold ${fontSize}px Arial`;
  
  // Center the text
  ctx.fillText('AI', size / 2, size / 2);
  
  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), buffer);
});

console.log(`Generated icons in ${iconsDir}`);
