import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const scriptPath = path.resolve('scripts/azure-server.js');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run astro build first.');
  process.exit(1);
}

// 1. Copy server script to dist/server.js and dist/index.js (Azure looks for server.js and index.js)
const serverCode = fs.readFileSync(scriptPath, 'utf-8');
fs.writeFileSync(path.join(distDir, 'server.js'), serverCode, 'utf-8');
fs.writeFileSync(path.join(distDir, 'index.js'), serverCode, 'utf-8');

// 2. Create minimal package.json in dist
const distPkg = {
  name: 'techsteps-azure-production',
  version: '1.0.0',
  type: 'module',
  main: 'server.js',
  scripts: {
    start: 'node server.js',
  },
};

fs.writeFileSync(
  path.join(distDir, 'package.json'),
  JSON.stringify(distPkg, null, 2),
  'utf-8'
);

console.log('✓ Successfully prepared Azure App Service Linux runner in dist/');
console.log('  - dist/server.js');
console.log('  - dist/index.js');
console.log('  - dist/package.json');
