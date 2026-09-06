const fs = require('fs');
const path = require('path');

const cataloguePath = 'c:/Users/samim_40uxmfb/Desktop/deplyed project/Tailor-Masterpiece/apps/web/src/data/catalogue.ts';
const imagesDir = 'c:/Users/samim_40uxmfb/Desktop/deplyed project/Tailor-Masterpiece/apps/web/public/images';
const targetDir = path.join(imagesDir, 'catalogue');

// Create catalogue directory if not exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read catalogue.ts
let content = fs.readFileSync(cataloguePath, 'utf8');

// Match all "/images/xxxx" in the file
const regex = /"\/images\/([^"]+)"/g;
let match;
const movedFiles = new Set();

while ((match = regex.exec(content)) !== null) {
  const filename = match[1];
  // Skip global files
  if (['hero.png', 'hero-mobile.png', 'hands.png', 'tools.png', 'fabric.png', 'shopfront.jpeg', 'shopwithmaster.jpeg'].includes(filename)) {
    continue;
  }
  
  const sourcePath = path.join(imagesDir, filename);
  const destPath = path.join(targetDir, filename);
  
  if (fs.existsSync(sourcePath)) {
    fs.renameSync(sourcePath, destPath);
    movedFiles.add(filename);
    console.log(`Moved: ${filename}`);
  } else {
    // Check if it's already in the targetDir
    if (fs.existsSync(destPath)) {
      movedFiles.add(filename);
      console.log(`Already in destination: ${filename}`);
    } else {
      console.log(`File not found on disk: ${filename}`);
    }
  }
}

// Replace paths in content
const updatedContent = content.replace(/"\/images\/([^"]+)"/g, (match, filename) => {
  if (['hero.png', 'hero-mobile.png', 'hands.png', 'tools.png', 'fabric.png', 'shopfront.jpeg', 'shopwithmaster.jpeg'].includes(filename)) {
    return match;
  }
  return `"/images/catalogue/${filename}"`;
});

fs.writeFileSync(cataloguePath, updatedContent, 'utf8');
console.log('Catalogue updated successfully.');
