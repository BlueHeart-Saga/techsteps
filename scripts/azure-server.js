require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const nodemailer = require('nodemailer');

const DIST_DIR = __dirname;
const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};

const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/css; charset=utf-8',
  'application/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml',
  'application/xml; charset=utf-8',
  'application/manifest+json',
  'text/plain; charset=utf-8',
]);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// =========================================================================
// HTML TEMPLATE GENERATORS: INTERNAL TECHSTEPS NOTIFICATIONS
// =========================================================================

function generateCollectionHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-PENDING');
  const name = escapeHtml(data.name || 'Not provided');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const address = escapeHtml(data.address || 'Not provided').replace(/\n/g, '<br/>');
  const outcome = escapeHtml(data.outcome || 'Not specified');
  const collectionDate = escapeHtml(data.collectionDate || 'Flexible');
  const laptops = escapeHtml(data.laptops || '0');
  const chromebooks = escapeHtml(data.chromebooks || '0');
  const tablets = escapeHtml(data.tablets || '0');
  const itAssets = escapeHtml(data.itAssets || '0');
  const accessories = escapeHtml(data.accessories || '0');
  const otherText = escapeHtml(data.otherText || '').trim() || 'None specified';
  const notes = escapeHtml(data.notes || '').trim() || 'None provided';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechSteps Collection Request - ${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:8px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#A3D9BE;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      Collection Request
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      New IT Asset Collection Booking
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Prominent Reference Highlight Box -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px; box-sizing:border-box;">
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#0F5A47;">
                      BOOKING REFERENCE
                    </div>
                    <div style="font-size:22px; font-weight:800; color:#0F623A; font-family:Consolas, Monaco, monospace; letter-spacing:0.04em; margin-top:4px;">
                      ${ref}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Customer Details -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Customer Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; vertical-align:top; font-weight:500;">Full Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Email:</td>
                  <td style="color:#0F623A; font-weight:600; vertical-align:top;">
                    <a href="mailto:${email}" style="color:#0F623A; text-decoration:none; font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Telephone:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">
                    <a href="tel:${phone}" style="color:#12181A; text-decoration:none; font-weight:600;">${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Collection Details -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Collection Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; vertical-align:top; font-weight:500;">Collection Address:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top; line-height:1.5;">${address}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Preferred Outcome:</td>
                  <td style="color:#0F623A; font-weight:700; vertical-align:top;">${outcome}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Preferred Date:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${collectionDate}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Devices & IT Assets -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Devices &amp; IT Assets
              </div>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F8FAF8; border-radius:6px; border:1px solid #E5EBE5; overflow:hidden; font-size:14px;">
                <thead>
                  <tr style="background-color:#EBF3ED;">
                    <th align="left" style="padding:10px 16px; font-weight:700; color:#0F5A47; font-size:13px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid #DCE6DC;">Asset</th>
                    <th align="right" style="padding:10px 16px; font-weight:700; color:#0F5A47; font-size:13px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid #DCE6DC;">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Laptops</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${laptops}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Chromebooks</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${chromebooks}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Tablets</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${tablets}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">IT Assets (Desktops / Servers / Networking)</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${itAssets}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Chargers &amp; Accessories</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${accessories}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500;">Other Assets</td>
                    <td align="right" style="padding:10px 16px; font-weight:600; color:#12181A;">${otherText}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Section: Notes / Instructions -->
          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Notes / Instructions
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:16px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${notes}
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A; letter-spacing:0.02em;">
                Techsteps
              </div>
              <div style="font-size:12px; font-weight:600; color:#47564D; margin-top:2px;">
                IT Asset Collection &amp; Lifecycle Services
              </div>
              <div style="font-size:11px; color:#6B7B70; margin-top:8px; line-height:1.4;">
                Please review the collection details and contact the customer to confirm the collection window.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateContactHtml(data) {
  const name = escapeHtml(data.name || 'Not provided');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const subject = escapeHtml(data.subject || 'General Enquiry');
  const message = escapeHtml(data.message || 'No message provided').replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Techsteps Contact Enquiry - ${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:8px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#A3D9BE;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      Contact Enquiry
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      New Website Enquiry
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Highlighted Subject Box -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px; box-sizing:border-box;">
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#0F5A47;">
                      SERVICE REQUIRED / SUBJECT
                    </div>
                    <div style="font-size:18px; font-weight:700; color:#0F623A; margin-top:4px;">
                      ${subject}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Customer Details -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Customer Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; vertical-align:top; font-weight:500;">Full Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Email:</td>
                  <td style="color:#0F623A; font-weight:600; vertical-align:top;">
                    <a href="mailto:${email}" style="color:#0F623A; text-decoration:none; font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Telephone:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">
                    <a href="tel:${phone}" style="color:#12181A; text-decoration:none; font-weight:600;">${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Enquiry Message -->
          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Enquiry Message
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:16px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${message}
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A; letter-spacing:0.02em;">
                Techsteps
              </div>
              <div style="font-size:12px; font-weight:600; color:#47564D; margin-top:2px;">
                Secure IT, Document &amp; Business Services
              </div>
              <div style="font-size:11px; color:#6B7B70; margin-top:8px; line-height:1.4;">
                This enquiry was submitted via the Techsteps corporate website contact form.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =========================================================================
// HTML TEMPLATE GENERATORS: CUSTOMER CONFIRMATION EMAILS
// =========================================================================

function generateCustomerCollectionConfirmationHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-PENDING');
  const name = escapeHtml(data.name || 'Valued Customer');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || '');
  const phone = escapeHtml(data.phone || 'Not provided');
  const address = escapeHtml(data.address || 'Not provided').replace(/\n/g, '<br/>');
  const outcome = escapeHtml(data.outcome || 'Not specified');
  const collectionDate = escapeHtml(data.collectionDate || 'Flexible');
  const laptops = escapeHtml(data.laptops || '0');
  const chromebooks = escapeHtml(data.chromebooks || '0');
  const tablets = escapeHtml(data.tablets || '0');
  const itAssets = escapeHtml(data.itAssets || '0');
  const accessories = escapeHtml(data.accessories || '0');
  const otherText = escapeHtml(data.otherText || '').trim() || 'None specified';
  const notes = escapeHtml(data.notes || '').trim() || 'None provided';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Techsteps Collection Request Received - ${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:8px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#A3D9BE;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      Collection Request Received
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      Thank you for contacting Techsteps. We have received your collection request.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Prominent Reference Highlight Box -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px; box-sizing:border-box;">
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#0F5A47;">
                      BOOKING REFERENCE
                    </div>
                    <div style="font-size:22px; font-weight:800; color:#0F623A; font-family:Consolas, Monaco, monospace; letter-spacing:0.04em; margin-top:4px;">
                      ${ref}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Intro Message -->
          <tr>
            <td style="padding:8px 32px 18px 32px; font-size:15px; color:#22332B; line-height:1.6;">
              <p style="margin:0 0 12px 0;">Dear <strong>${name}</strong>,</p>
              <p style="margin:0;">
                Thank you for submitting your IT asset collection request. Our logistics team will review the information provided and contact you with a formal confirmation and collection window within two working days.
              </p>
            </td>
          </tr>

          <!-- Section: Collection Details -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Collection Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; vertical-align:top; font-weight:500;">Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Collection Address:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top; line-height:1.5;">${address}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Preferred Outcome:</td>
                  <td style="color:#0F623A; font-weight:700; vertical-align:top;">${outcome}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Preferred Date:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${collectionDate}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Devices & IT Assets -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Devices &amp; IT Assets
              </div>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F8FAF8; border-radius:6px; border:1px solid #E5EBE5; overflow:hidden; font-size:14px;">
                <thead>
                  <tr style="background-color:#EBF3ED;">
                    <th align="left" style="padding:10px 16px; font-weight:700; color:#0F5A47; font-size:13px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid #DCE6DC;">Asset</th>
                    <th align="right" style="padding:10px 16px; font-weight:700; color:#0F5A47; font-size:13px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid #DCE6DC;">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Laptops</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${laptops}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Chromebooks</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${chromebooks}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Tablets</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${tablets}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">IT Assets (Desktops / Servers / Networking)</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${itAssets}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500; border-bottom:1px solid #E5EBE5;">Chargers &amp; Accessories</td>
                    <td align="right" style="padding:10px 16px; font-weight:800; color:#0F623A; font-size:15px; border-bottom:1px solid #E5EBE5;">${accessories}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 16px; color:#47564D; font-weight:500;">Other Assets</td>
                    <td align="right" style="padding:10px 16px; font-weight:600; color:#12181A;">${otherText}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Section: Notes / Instructions -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Notes / Instructions
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:16px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${notes}
              </div>
            </td>
          </tr>

          <!-- Section: What Happens Next -->
          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="background-color:#EBF5F0; border-radius:6px; border:1px solid #D6E8DE; padding:18px 22px;">
                <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; margin-bottom:10px;">
                  What happens next?
                </div>
                <table width="100%" border="0" cellpadding="4" cellspacing="0" style="font-size:14px; color:#22332B; line-height:1.5;">
                  <tr>
                    <td width="24" style="vertical-align:top; font-weight:700; color:#0F623A;">1.</td>
                    <td style="vertical-align:top;">Our logistics team reviews your request.</td>
                  </tr>
                  <tr>
                    <td width="24" style="vertical-align:top; font-weight:700; color:#0F623A;">2.</td>
                    <td style="vertical-align:top;">We confirm the collection requirements and availability.</td>
                  </tr>
                  <tr>
                    <td width="24" style="vertical-align:top; font-weight:700; color:#0F623A;">3.</td>
                    <td style="vertical-align:top;">We contact you with your collection window.</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A; letter-spacing:0.02em;">
                Techsteps
              </div>
              <div style="font-size:12px; font-weight:600; color:#47564D; margin-top:2px;">
                IT Asset Collection &amp; Lifecycle Services
              </div>
              <div style="font-size:11px; color:#6B7B70; margin-top:8px; line-height:1.4;">
                This is an automated confirmation email. Please reply to this email if you need to provide additional information.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function generateCustomerContactConfirmationHtml(data) {
  const name = escapeHtml(data.name || 'Valued Customer');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const subject = escapeHtml(data.subject || 'General Enquiry');
  const message = escapeHtml(data.message || 'No message provided').replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting Techsteps</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Content Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:8px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#A3D9BE;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      Thank You for Contacting Us
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      We've received your enquiry.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Intro Message -->
          <tr>
            <td style="padding:24px 32px 16px 32px; font-size:15px; color:#22332B; line-height:1.6;">
              <p style="margin:0 0 12px 0;">Dear <strong>${name}</strong>,</p>
              <p style="margin:0;">
                Thank you for getting in touch with Techsteps. Your enquiry has been received by our team and will be reviewed shortly.
              </p>
            </td>
          </tr>

          <!-- Section: Your Enquiry -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Your Enquiry
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; vertical-align:top; font-weight:500;">Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Email:</td>
                  <td style="color:#0F623A; font-weight:600; vertical-align:top;">${email}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Telephone:</td>
                  <td style="color:#12181A; font-weight:600; vertical-align:top;">${phone}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; vertical-align:top; font-weight:500;">Service Required / Subject:</td>
                  <td style="color:#0F623A; font-weight:700; vertical-align:top;">${subject}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Section: Message -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Message
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:16px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${message}
              </div>
            </td>
          </tr>

          <!-- Section: What Happens Next -->
          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="background-color:#EBF5F0; border-radius:6px; border:1px solid #D6E8DE; padding:18px 22px;">
                <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; margin-bottom:8px;">
                  What happens next?
                </div>
                <div style="font-size:14px; color:#22332B; line-height:1.5;">
                  Our team will review your enquiry and get back to you as soon as possible.
                </div>
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A; letter-spacing:0.02em;">
                Techsteps
              </div>
              <div style="font-size:12px; font-weight:600; color:#47564D; margin-top:2px;">
                IT Asset Collection &amp; Lifecycle Services
              </div>
              <div style="font-size:11px; color:#6B7B70; margin-top:8px; line-height:1.4;">
                This is an automated confirmation email. Please reply to this email if you need to provide additional information.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =========================================================================
// EMAIL DISPATCH HELPER FUNCTIONS
// =========================================================================

async function sendInternalCollectionEmail(transporter, data) {
  const plainText = `
New Collection Booking Request

Reference Number: ${data.reference || ''}

Contact Details:
Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Telephone: ${data.phone || ''}

Collection Details:
Collection Address: ${data.address || ''}
Preferred Outcome: ${data.outcome || ''}
Preferred Collection Date: ${data.collectionDate || 'Flexible'}

Devices & IT Assets:
Laptops: ${data.laptops || '0'}
Chromebooks: ${data.chromebooks || '0'}
Tablets: ${data.tablets || '0'}
IT Assets (Desktops / Servers / Networking): ${data.itAssets || '0'}
Chargers & Accessories: ${data.accessories || '0'}
Other Assets: ${data.otherText || 'None specified'}

Notes / Instructions:
${data.notes || 'None provided'}
  `.trim();

  const html = generateCollectionHtml(data);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.FORM_RECEIVER_EMAIL,
    replyTo: data.email,
    subject: `TechSteps Collection Request - ${data.reference}`,
    text: plainText,
    html: html,
  });
}

async function sendCustomerCollectionConfirmation(transporter, data) {
  const plainText = `
Techsteps Collection Request Received

Booking Reference: ${data.reference || ''}

Thank you for submitting your IT asset collection request. Our logistics team will review the information provided and contact you with a formal confirmation and collection window within two working days.

Collection Details:
Name: ${data.name || ''}
Company: ${data.company || ''}
Collection Address: ${data.address || ''}
Preferred Outcome: ${data.outcome || ''}
Preferred Collection Date: ${data.collectionDate || 'Flexible'}

Devices & IT Assets:
Laptops: ${data.laptops || '0'}
Chromebooks: ${data.chromebooks || '0'}
Tablets: ${data.tablets || '0'}
IT Assets (Desktops / Servers / Networking): ${data.itAssets || '0'}
Chargers & Accessories: ${data.accessories || '0'}
Other Assets: ${data.otherText || 'None specified'}

Notes / Instructions:
${data.notes || 'None provided'}

What happens next?
1. Our logistics team reviews your request.
2. We confirm the collection requirements and availability.
3. We contact you with your collection window.

Techsteps
IT Asset Collection & Lifecycle Services
This is an automated confirmation email. Please reply to this email if you need to provide additional information.
  `.trim();

  const html = generateCustomerCollectionConfirmationHtml(data);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.email,
    replyTo: process.env.FORM_RECEIVER_EMAIL,
    subject: `Techsteps Collection Request Received - ${data.reference}`,
    text: plainText,
    html: html,
  });
}

async function sendInternalContactEmail(transporter, data) {
  const plainText = `
New Contact Enquiry

Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Telephone: ${data.phone || ''}
Service Required: ${data.subject || 'General Enquiry'}

Message:
${data.message || ''}
  `.trim();

  const html = generateContactHtml(data);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.FORM_RECEIVER_EMAIL,
    replyTo: data.email,
    subject: `Techsteps Contact Enquiry - ${data.subject || 'General Enquiry'}`,
    text: plainText,
    html: html,
  });
}

async function sendCustomerContactConfirmation(transporter, data) {
  const plainText = `
Thank You for Contacting Techsteps

Dear ${data.name || 'Valued Customer'},

Thank you for getting in touch with Techsteps. Your enquiry has been received by our team and will be reviewed shortly.

Your Enquiry:
Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Telephone: ${data.phone || ''}
Service Required / Subject: ${data.subject || 'General Enquiry'}

Message:
${data.message || ''}

What happens next?
Our team will review your enquiry and get back to you as soon as possible.

Techsteps
IT Asset Collection & Lifecycle Services
This is an automated confirmation email. Please reply to this email if you need to provide additional information.
  `.trim();

  const html = generateCustomerContactConfirmationHtml(data);

  console.log('==========================================');
  console.log('CUSTOMER CONFIRMATION EMAIL');
  console.log('To:', data.email);
  console.log('From:', process.env.GMAIL_USER);
  console.log('==========================================');

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: data.email,
    replyTo: process.env.FORM_RECEIVER_EMAIL,
    subject: 'Thank you for contacting Techsteps',
    text: plainText,
    html: html,
  });

  console.log(`Customer confirmation email sent to ${data.email}`);
}

async function sendContactEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  try {
    await transporter.verify();
    console.log('Gmail transporter verification successful');
  } catch (err) {
    console.error('Gmail transporter verification failed:', err);
  }

  const isCollection = data.formType === 'collection';

  if (isCollection) {
    // 1. Send internal notification email to Techsteps
    await sendInternalCollectionEmail(transporter, data);

    // 2. Send confirmation email to the customer
    if (data.email) {
      try {
        await sendCustomerCollectionConfirmation(transporter, data);
      } catch (err) {
        console.error('Customer collection confirmation email error:', err);
        console.error('Customer email:', data.email);

        // Do not fail the collection request if confirmation email fails
      }
    }
  } else {
    // 1. Send internal notification email to Techsteps
    await sendInternalContactEmail(transporter, data);

    // 2. Send confirmation email to the customer
    if (data.email) {
      try {
        await sendCustomerContactConfirmation(transporter, data);
      } catch (err) {
        console.error('Customer contact confirmation email error:', err);
        console.error('Customer email:', data.email);

        // Do not fail the form submission if only the confirmation email fails
        console.error(`Internal contact email was sent successfully, but customer confirmation failed for: ${data.email}`);
      }
    }
  }
}

function resolveFilePath(reqUrl) {
  try {
    const parsedUrl = new URL(reqUrl, `http://localhost:${PORT}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Security: prevent directory traversal
    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    let targetPath = path.join(DIST_DIR, safePath);

    // 1. If path exists
    if (fs.existsSync(targetPath)) {
      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        const indexPath = path.join(targetPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      } else {
        return targetPath;
      }
    }

    // 2. Check path + .html (clean URL)
    const htmlPath = targetPath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      return htmlPath;
    }

    // 3. Check path / index.html (in case URL was /about-us without trailing slash)
    const nestedIndexPath = path.join(targetPath, 'index.html');
    if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
      return nestedIndexPath;
    }

    // 4. SPA Fallback for Sanity Studio (/admin or /studio)
    if (
      pathname === '/admin' || pathname.startsWith('/admin/') ||
      pathname === '/studio' || pathname.startsWith('/studio/')
    ) {
      const adminIndexPath = path.join(DIST_DIR, 'admin', 'index.html');
      if (fs.existsSync(adminIndexPath)) {
        return adminIndexPath;
      }
      const adminHtmlPath = path.join(DIST_DIR, 'admin.html');
      if (fs.existsSync(adminHtmlPath)) {
        return adminHtmlPath;
      }
    }
  } catch (err) {
    console.error('Error resolving file path:', err);
  }

  return null;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();

      // Prevent excessively large requests
      if (body.length > 100000) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });

    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer((req, res) => {
  let pathname = '';
  try {
    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch {
    pathname = req.url || '';
  }

  // =========================================================================
  // API: /api/contact (Supports both Contact Enquiry & Collection Request)
  // =========================================================================
  if (pathname === '/api/contact' || pathname === '/api/contact/' || req.url === '/api/contact') {
    // 1. Handle CORS preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    // 2. Handle POST request
    if (req.method === 'POST') {
      (async () => {
        try {
          const body = await readRequestBody(req);
          let data;
          try {
            data = JSON.parse(body);
          } catch {
            res.writeHead(400, {
              ...CORS_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify({
              success: false,
              message: 'Invalid JSON body.',
            }));
            return;
          }

          const isCollection = data.formType === 'collection';

          // Validation
          if (isCollection) {
            if (!data.name || !data.email || !data.phone || !data.address) {
              res.writeHead(400, {
                ...CORS_HEADERS,
                'Content-Type': 'application/json; charset=utf-8',
              });
              res.end(JSON.stringify({
                success: false,
                message: 'Please complete all required fields (Name, Email, Phone, Collection Address).',
              }));
              return;
            }
          } else {
            if (!data.name || !data.email || !data.phone || (!data.subject && !data.message)) {
              res.writeHead(400, {
                ...CORS_HEADERS,
                'Content-Type': 'application/json; charset=utf-8',
              });
              res.end(JSON.stringify({
                success: false,
                message: 'Please complete all required fields.',
              }));
              return;
            }
          }

          await sendContactEmail(data);

          res.writeHead(200, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });

          res.end(JSON.stringify({
            success: true,
            message: isCollection
              ? 'Your collection request has been sent successfully.'
              : 'Your enquiry has been sent successfully.',
            reference: data.reference || undefined,
          }));
        } catch (error) {
          console.error('Contact API error:', error);
          console.error('Error message:', error?.message);
          console.error('Error stack:', error?.stack);

          res.writeHead(500, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });

          res.end(JSON.stringify({
            success: false,
            message: error?.message || 'Unable to send your request right now.',
          }));
        }
      })();
      return;
    }

    // Reject other HTTP methods on /api/contact with JSON error
    res.writeHead(405, {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(JSON.stringify({
      success: false,
      message: 'Method Not Allowed. Please use POST.',
    }));
    return;
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  // Only allow GET and HEAD for static assets
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  let filePath = resolveFilePath(req.url);
  let statusCode = 200;

  if (!filePath) {
    const notFoundPath = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      filePath = notFoundPath;
      statusCode = 404;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const headers = {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  // Cache headers
  if (req.url.startsWith('/_astro/') || req.url.startsWith('/images/')) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  } else if (contentType.startsWith('text/html')) {
    headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
  } else {
    headers['Cache-Control'] = 'public, max-age=86400';
  }

  // Compression
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canCompress = COMPRESSIBLE.has(contentType);

  if (canCompress && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(statusCode, headers);
    if (req.method === 'HEAD') {
      res.end();
    }
    const rawStream = fs.createReadStream(filePath);
    const gzip = zlib.createGzip();
    rawStream.pipe(gzip).pipe(res);
  } else {
    const stat = fs.statSync(filePath);
    headers['Content-Length'] = stat.size;
    res.writeHead(statusCode, headers);
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Techsteps Azure production server listening on 0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
