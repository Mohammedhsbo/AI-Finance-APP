const fs = require('fs');
const path = require('path');

const prismaDir = path.join(__dirname, 'lib', 'generated', 'prisma');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Fix all .js imports to remove .js
  content = content.replace(/'\.\/[^']*\.js'/g, (match) => match.replace('.js', ''));
  content = content.replace(/"\.\/[^"]*\.js"/g, (match) => match.replace('.js', ''));
  fs.writeFileSync(filePath, content);
}

function fixDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fixDirectory(filePath);
    } else if (file.endsWith('.ts')) {
      fixFile(filePath);
    }
  });
}

fixDirectory(prismaDir);

console.log('Prisma imports fixed');