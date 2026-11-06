const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'email');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'icon-facebook.png': `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="#146B5C"/>
  <path d="M35.6 33.6L36.4 28.4H31.4V25C31.4 23.57 32.1 22.18 34.33 22.18H36.6V17.76C35.25 17.54 33.91 17.41 32.55 17.43C28.46 17.43 25.8 19.91 25.8 24.39V28.4H21.2V33.6H25.8V46H31.4V33.6H35.6Z" fill="#FFFFFF"/>
</svg>
  `.trim(),
  'icon-website.png': `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="#146B5C"/>
  <path d="M32 18C24.27 18 18 24.27 18 32C18 39.73 24.27 46 32 46C39.73 46 46 39.73 46 32C46 24.27 39.73 18 32 18ZM32 20.8C33.68 20.8 35.33 23.95 36.14 28.5H27.86C28.67 23.95 30.32 20.8 32 20.8ZM26.4 28.5C25.75 25.4 24.47 23.01 22.95 21.68C21.03 23.36 19.67 25.76 19.16 28.5H26.4ZM19.16 35.5C19.67 38.24 21.03 40.64 22.95 42.32C24.47 40.99 25.75 38.6 26.4 35.5H19.16ZM32 43.2C30.32 43.2 28.67 40.05 27.86 35.5H36.14C35.33 40.05 33.68 43.2 32 43.2ZM37.6 35.5C38.25 38.6 39.53 40.99 41.05 42.32C42.97 40.64 44.33 38.24 44.84 35.5H37.6ZM44.84 28.5C44.33 25.76 42.97 23.36 41.05 21.68C39.53 23.01 38.25 25.4 37.6 28.5H44.84Z" fill="#FFFFFF"/>
</svg>
  `.trim(),
  'icon-linkedin.png': `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="#146B5C"/>
  <path d="M22 26.2H27V42H22V26.2ZM24.5 18C22.9 18 21.6 19.3 21.6 20.9C21.6 22.5 22.9 23.8 24.5 23.8C26.1 23.8 27.4 22.5 27.4 20.9C27.4 19.3 26.1 18 24.5 18ZM30 26.2H34.8V28.4H34.9C35.6 27.1 37.3 25.7 39.8 25.7C45 25.7 46 29.1 46 33.6V42H41V34.2C41 32.3 40.9 29.9 38.3 29.9C35.6 29.9 35.2 32 35.2 34.1V42H30.2L30 26.2Z" fill="#FFFFFF"/>
</svg>
  `.trim(),
  'icon-instagram.png': `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="32" fill="#146B5C"/>
  <path d="M38.5 19H25.5C21.9 19 19 21.9 19 25.5V38.5C19 42.1 21.9 45 25.5 45H38.5C42.1 45 45 42.1 45 38.5V25.5C45 21.9 42.1 19 38.5 19ZM42.5 38.5C42.5 40.7 40.7 42.5 38.5 42.5H25.5C23.3 42.5 21.5 40.7 21.5 38.5V25.5C21.5 23.3 23.3 21.5 25.5 21.5H38.5C40.7 21.5 42.5 23.3 42.5 25.5V38.5Z" fill="#FFFFFF"/>
  <path d="M32 25.5C28.4 25.5 25.5 28.4 25.5 32C25.5 35.6 28.4 38.5 32 38.5C35.6 38.5 38.5 35.6 38.5 32C38.5 28.4 35.6 25.5 32 25.5ZM32 36C29.8 36 28 34.2 28 32C28 29.8 29.8 28 32 28C34.2 28 36 29.8 36 32C36 34.2 34.2 36 32 36Z" fill="#FFFFFF"/>
  <circle cx="38.8" cy="25.2" r="1.5" fill="#FFFFFF"/>
</svg>
  `.trim()
};

async function generate() {
  for (const [filename, svg] of Object.entries(svgs)) {
    const filePath = path.join(dir, filename);
    await sharp(Buffer.from(svg))
      .png({ quality: 100 })
      .toFile(filePath);
    console.log(`Generated: ${filePath}`);
  }
}

generate().then(() => console.log('All icons generated successfully!'));
