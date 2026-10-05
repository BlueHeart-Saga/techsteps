import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const scriptPath = path.resolve('scripts/azure-server.js');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist! Run astro build first.');
  process.exit(1);
}

// Copy Azure server script
const serverCode = fs.readFileSync(scriptPath, 'utf-8');

fs.writeFileSync(
  path.join(distDir, 'server.js'),
  serverCode,
  'utf-8'
);

fs.writeFileSync(
  path.join(distDir, 'index.js'),
  serverCode,
  'utf-8'
);

// Create production package.json for Azure
const distPkg = {
  name: 'techsteps-azure-production',
  version: '1.0.0',
  main: 'server.js',
  scripts: {
    start: 'node server.js',
  },
  dependencies: {
    dotenv: '^18.0.5',
    nodemailer: '^10.0.14',
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
console.log('  - dotenv and nodemailer dependencies included');