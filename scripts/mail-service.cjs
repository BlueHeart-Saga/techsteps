/**
 * Techsteps Mail Service
 * Powered by Hostinger SMTP
 * Handles internal notifications to collection@techsteps.co.uk and customer auto-thanks confirmations.
 */
const nodemailer = require('nodemailer');
require('dotenv').config();

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'collection@techsteps.co.uk';
  const pass = process.env.SMTP_PASS || '';
  const from = process.env.SMTP_FROM || `"Techsteps" <${user}>`;
  const receiver = process.env.FORM_RECEIVER_EMAIL || 'collection@techsteps.co.uk';

  return { host, port, secure, user, pass, from, receiver };
}

function createTransporter() {
  const config = getSmtpConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

// =========================================================================
// HTML TEMPLATE: INTERNAL COLLECTION & BOOKING NOTIFICATION
// =========================================================================
function generateCollectionHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-PENDING');
  const serviceType = escapeHtml(data.serviceType || 'IT Asset Collection');
  const name = escapeHtml(data.name || 'Not provided');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const address = escapeHtml(data.address || 'Not provided').replace(/\n/g, '<br/>');
  const outcome = escapeHtml(data.outcome || 'Not specified');
  const collectionDate = escapeHtml(data.collectionDate || data.preferredDate || 'Flexible / As soon as possible');
  const notes = escapeHtml(data.notes || data.message || data.details || '').trim() || 'None provided';

  // Build hardware/asset table rows based on what fields are present
  const assetRows = [];

  if (data.laptops && data.laptops !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Laptops / MacBooks:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.laptops)}</td></tr>`);
  if (data.desktops && data.desktops !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Desktop PCs &amp; Towers:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.desktops)}</td></tr>`);
  if (data.chromebooks && data.chromebooks !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Chromebooks:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.chromebooks)}</td></tr>`);
  if (data.tablets && data.tablets !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Tablets / iPads:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.tablets)}</td></tr>`);
  if (data.servers && data.servers !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Servers &amp; Storage Arrays:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.servers)}</td></tr>`);
  if (data.monitors && data.monitors !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Monitors &amp; Screens:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.monitors)}</td></tr>`);
  if (data.mobiles && data.mobiles !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Mobile Phones:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.mobiles)}</td></tr>`);
  if (data.printers && data.printers !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Printers / Copiers:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.printers)}</td></tr>`);
  if (data.itAssets && data.itAssets !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">IT Assets / Networking:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.itAssets)}</td></tr>`);
  if (data.accessories && data.accessories !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Accessories / Cabling:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.accessories)}</td></tr>`);
  if (data.drives && data.drives !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Hard Drives for Destruction:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.drives)}</td></tr>`);
  if (data.tapes && data.tapes !== '0') assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Backup Tapes / Media:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.tapes)}</td></tr>`);
  if (data.boxCount) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Courier Box Count:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.boxCount)}</td></tr>`);
  if (data.deviceTypes) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Box Device Types:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.deviceTypes)}</td></tr>`);
  if (data.disposalMethod) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Disposal Method:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.disposalMethod)}</td></tr>`);
  if (data.witness) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Witnessing Preference:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.witness)}</td></tr>`);
  if (data.otherText && data.otherText.trim()) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Other Assets:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.otherText)}</td></tr>`);
  if (data.details && data.details.trim()) assetRows.push(`<tr><td style="color:#5C6B62; padding:4px 0;">Items to Collect:</td><td style="font-weight:700; color:#12181A; padding:4px 0;">${escapeHtml(data.details)}</td></tr>`);

  const assetTableContent = assetRows.length > 0
    ? `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:14px;">${assetRows.join('')}</table>`
    : `<div style="font-size:13px; color:#5C6B62; font-style:italic;">No specific counts enumerated (see notes below).</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechSteps Collection Request - ${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#B8EC4C;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      ${serviceType} Booking
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      Hostinger SMTP Live Form Dispatch
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reference Highlight Box -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px;">
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

          <!-- Customer Details -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Contact Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; font-weight:500;">Full Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Email:</td>
                  <td style="color:#0F623A; font-weight:600;">
                    <a href="mailto:${email}" style="color:#0F623A; text-decoration:none; font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Telephone:</td>
                  <td style="color:#12181A; font-weight:600;">
                    <a href="tel:${phone}" style="color:#12181A; text-decoration:none; font-weight:600;">${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Collection Logistics -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Logistics &amp; Scheduling
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; font-weight:500; vertical-align:top;">Address / Postcode:</td>
                  <td width="65%" style="color:#12181A; font-weight:600; vertical-align:top; line-height:1.5;">${address}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Preferred Date:</td>
                  <td style="color:#12181A; font-weight:600;">${collectionDate}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Preferred Outcome:</td>
                  <td style="color:#0F623A; font-weight:700;">${outcome}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Assets Breakdown -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Hardware &amp; Equipment Specified
              </div>
              ${assetTableContent}
            </td>
          </tr>

          <!-- Notes -->
          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Instructions / Notes
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:14px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${notes}
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A;">Techsteps IT Lifecycle &amp; Collection Services</div>
              <div style="font-size:11px; color:#6B7B70; margin-top:6px;">This notification was automatically dispatched from the Techsteps website via Hostinger SMTP.</div>
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
// HTML TEMPLATE: CUSTOMER AUTO-THANKS CONFIRMATION (COLLECTION)
// =========================================================================
function generateCustomerCollectionConfirmationHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-PENDING');
  const serviceType = escapeHtml(data.serviceType || 'IT Asset Collection');
  const name = escapeHtml(data.name || 'Valued Customer');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || '');
  const phone = escapeHtml(data.phone || 'Not provided');
  const address = escapeHtml(data.address || 'Not provided').replace(/\n/g, '<br/>');
  const collectionDate = escapeHtml(data.collectionDate || data.preferredDate || 'Flexible / As soon as possible');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Techsteps Collection Booking Confirmed - ${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <!-- Corporate Header -->
          <tr>
            <td style="background-color:#0F623A; padding:28px 32px; text-align:left;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em; line-height:1.2;">
                      Tech<span style="color:#B8EC4C;">steps</span>
                    </div>
                    <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                      Thank You — Collection Request Received
                    </div>
                    <div style="font-size:13px; font-weight:400; color:#D1EAD9; letter-spacing:0.02em; margin-top:2px;">
                      Your reference number: <strong style="color:#FFFFFF; font-family:monospace;">${ref}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting & Intro -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <div style="font-size:16px; font-weight:600; color:#12181A; margin-bottom:8px;">
                Dear ${name},
              </div>
              <p style="font-size:14px; color:#47564D; line-height:1.6; margin:0 0 16px 0;">
                Thank you for choosing Techsteps for your <strong>${serviceType}</strong>. We have successfully logged your booking request in our logistics management system.
              </p>
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#0F5A47;">
                      OFFICIAL BOOKING REFERENCE
                    </div>
                    <div style="font-size:22px; font-weight:800; color:#0F623A; font-family:Consolas, Monaco, monospace; letter-spacing:0.04em; margin-top:4px;">
                      ${ref}
                    </div>
                    <div style="font-size:12px; color:#47564D; margin-top:4px;">
                      Please quote this reference in any correspondence with our operations desk.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Request Summary -->
          <tr>
            <td style="padding:10px 32px 20px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Your Booking Details
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; font-weight:500;">Service Requested:</td>
                  <td width="65%" style="color:#12181A; font-weight:600;">${serviceType}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Company / Organisation:</td>
                  <td style="color:#12181A; font-weight:600;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Collection Address:</td>
                  <td style="color:#12181A; font-weight:600; line-height:1.5;">${address}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Preferred Date:</td>
                  <td style="color:#12181A; font-weight:600;">${collectionDate}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Contact Phone:</td>
                  <td style="color:#12181A; font-weight:600;">${phone}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Happens Next Timeline -->
          <tr>
            <td style="padding:10px 32px 24px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                What Happens Next?
              </div>
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px; padding-bottom:16px;">
                    <div style="width:28px; height:28px; border-radius:50%; background-color:#0F623A; color:#FFFFFF; text-align:center; line-height:28px; font-weight:700; font-size:13px;">1</div>
                  </td>
                  <td valign="top" style="padding-bottom:16px;">
                    <div style="font-size:14px; font-weight:700; color:#12181A;">Logistics &amp; Booking Review</div>
                    <div style="font-size:13px; color:#5C6B62; line-height:1.5; margin-top:2px;">
                      Our regional routing coordinators review your access instructions, hardware specifications, and location.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="36" valign="top" style="padding-right:12px; padding-bottom:16px;">
                    <div style="width:28px; height:28px; border-radius:50%; background-color:#0F623A; color:#FFFFFF; text-align:center; line-height:28px; font-weight:700; font-size:13px;">2</div>
                  </td>
                  <td valign="top" style="padding-bottom:16px;">
                    <div style="font-size:14px; font-weight:700; color:#12181A;">Time Slot &amp; Driver Allocation</div>
                    <div style="font-size:13px; color:#5C6B62; line-height:1.5; margin-top:2px;">
                      We contact you via email or phone to confirm the exact collection window, vehicle arrival time, and assigned vetted driver.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="36" valign="top" style="padding-right:12px; padding-bottom:16px;">
                    <div style="width:28px; height:28px; border-radius:50%; background-color:#0F623A; color:#FFFFFF; text-align:center; line-height:28px; font-weight:700; font-size:13px;">3</div>
                  </td>
                  <td valign="top" style="padding-bottom:16px;">
                    <div style="font-size:14px; font-weight:700; color:#12181A;">Secure Collection &amp; Chain-of-Custody</div>
                    <div style="font-size:13px; color:#5C6B62; line-height:1.5; margin-top:2px;">
                      Upon collection, our security-cleared personnel issue a signed transfer manifest and Duty of Care transfer note.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:28px; height:28px; border-radius:50%; background-color:#0F623A; color:#FFFFFF; text-align:center; line-height:28px; font-weight:700; font-size:13px;">4</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:14px; font-weight:700; color:#12181A;">Asset Audit &amp; Certificate of Destruction</div>
                    <div style="font-size:13px; color:#5C6B62; line-height:1.5; margin-top:2px;">
                      After high-security processing at our accredited facility, you receive a complete itemised audit report and legally certified destruction documentation.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact / Questions Callout -->
          <tr>
            <td style="padding:0 32px 28px 32px;">
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:8px; padding:16px 20px; font-size:13px; color:#47564D; line-height:1.5;">
                <strong>Need to modify your request or have urgent requirements?</strong><br/>
                Simply reply directly to this email or contact our support desk at <a href="mailto:collection@techsteps.co.uk" style="color:#0F623A; font-weight:600; text-decoration:none;">collection@techsteps.co.uk</a> quoting reference <strong>${ref}</strong>.
              </div>
            </td>
          </tr>

          <!-- Corporate Footer -->
          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A;">Techsteps IT Lifecycle &amp; Collection Services</div>
              <div style="font-size:11px; color:#6B7B70; margin-top:6px;">This is an automated confirmation email sent to ${escapeHtml(email)}.</div>
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
// HTML TEMPLATE: INTERNAL CONTACT ENQUIRY NOTIFICATION
// =========================================================================
function generateContactHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-ENQ-PENDING');
  const name = escapeHtml(data.name || 'Not provided');
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const subject = escapeHtml(data.subject || 'General Website Enquiry');
  const message = escapeHtml(data.message || 'No message content provided');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechSteps Contact Enquiry - ${subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <tr style="background-color:#0F623A;">
            <td style="padding:28px 32px; text-align:left;">
              <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em;">
                Tech<span style="color:#B8EC4C;">steps</span>
              </div>
              <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                Website Contact Enquiry
              </div>
              <div style="font-size:13px; color:#D1EAD9; margin-top:2px;">
                Ref: ${ref} &bull; Service: ${subject}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 32px 16px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Sender Information
              </div>
              <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td width="35%" style="color:#5C6B62; font-weight:500;">Full Name:</td>
                  <td width="65%" style="color:#12181A; font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Company:</td>
                  <td style="color:#12181A; font-weight:600;">${company}</td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Email:</td>
                  <td style="color:#0F623A; font-weight:600;">
                    <a href="mailto:${email}" style="color:#0F623A; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Telephone:</td>
                  <td style="color:#12181A; font-weight:600;">
                    <a href="tel:${phone}" style="color:#12181A; text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#5C6B62; font-weight:500;">Subject / Service:</td>
                  <td style="color:#0F623A; font-weight:700;">${subject}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 32px 28px 32px;">
              <div style="font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:#0F5A47; border-bottom:2px solid #EAEFEA; padding-bottom:6px; margin-bottom:14px;">
                Message Content
              </div>
              <div style="background-color:#F8FAF8; border:1px solid #E5EBE5; border-radius:6px; padding:16px 18px; font-size:14px; color:#12181A; line-height:1.6; white-space:pre-line;">
                ${message}
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:20px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A;">Techsteps Corporate Communications</div>
              <div style="font-size:11px; color:#6B7B70; margin-top:4px;">Dispatched securely via Hostinger SMTP</div>
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
// HTML TEMPLATE: CUSTOMER AUTO-THANKS CONFIRMATION (CONTACT)
// =========================================================================
function generateCustomerContactConfirmationHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-ENQ-PENDING');
  const name = escapeHtml(data.name || 'Valued Customer');
  const subject = escapeHtml(data.subject || 'General Enquiry');
  const email = escapeHtml(data.email || '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Techsteps</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px; background-color:#FFFFFF; border-radius:12px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
          
          <tr style="background-color:#0F623A;">
            <td style="padding:28px 32px; text-align:left;">
              <div style="font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:-0.02em;">
                Tech<span style="color:#B8EC4C;">steps</span>
              </div>
              <div style="font-size:18px; font-weight:600; color:#FFFFFF; margin-top:8px;">
                Thank You for Getting in Touch
              </div>
              <div style="font-size:13px; color:#D1EAD9; margin-top:2px;">
                Reference: <strong style="color:#FFFFFF; font-family:monospace;">${ref}</strong>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 20px 32px;">
              <div style="font-size:16px; font-weight:600; color:#12181A; margin-bottom:8px;">
                Dear ${name},
              </div>
              <p style="font-size:14px; color:#47564D; line-height:1.6; margin:0 0 16px 0;">
                Thank you for contacting Techsteps regarding <strong>${subject}</strong>. Your enquiry has been received by our UK support team.
              </p>
              
              <div style="background-color:#EBF5F0; border-left:5px solid #0F623A; border-radius:6px; padding:16px 20px; margin-bottom:20px;">
                <div style="font-size:14px; font-weight:700; color:#0F623A; margin-bottom:4px;">
                  What Happens Next?
                </div>
                <div style="font-size:13px; color:#47564D; line-height:1.5;">
                  A specialist from our UK commercial &amp; logistics desk will review your details and respond within <strong>2 to 4 business hours</strong>.
                </div>
              </div>

              <p style="font-size:13px; color:#6B7B70; line-height:1.5; margin:0;">
                If your requirement is urgent, or you would like to speak to an advisor right away, please call our UK operations desk on <strong style="color:#12181A;">0800 123 4567</strong> quoting reference <strong>${ref}</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color:#F4F7F4; border-top:1px solid #D9E4D9; padding:22px 32px; text-align:center;">
              <div style="font-size:13px; font-weight:700; color:#0F623A;">Techsteps IT Lifecycle, Document &amp; Relocation Services</div>
              <div style="font-size:11px; color:#6B7B70; margin-top:6px;">This confirmation was automatically generated for ${escapeHtml(email)}.</div>
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
// EMAIL DISPATCH ORCHESTRATION
// =========================================================================
async function sendContactEmail(data) {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  // Verify SMTP connection
  try {
    await transporter.verify();
    console.log('[Techsteps Mail] Hostinger SMTP connection verified successfully');
  } catch (err) {
    console.error('[Techsteps Mail] SMTP verification warning:', err.message);
  }

  const isCollection = data.formType === 'collection';
  const reference = data.reference || (isCollection ? `TS-COL-${Math.floor(1000 + Math.random() * 9000)}` : `TS-ENQ-${Math.floor(1000 + Math.random() * 9000)}`);
  data.reference = reference;

  let internalSubject;
  let internalHtml;
  let internalPlainText;

  let customerSubject;
  let customerHtml;
  let customerPlainText;

  if (isCollection) {
    const serviceTitle = data.serviceType || 'IT Asset Collection Request';
    internalSubject = `TechSteps ${serviceTitle} - ${reference} (${data.company || data.name || 'New Client'})`;
    internalHtml = generateCollectionHtml(data);
    internalPlainText = `
Techsteps ${serviceTitle}
Reference: ${reference}

Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}
Address: ${data.address || ''}
Preferred Date: ${data.collectionDate || data.preferredDate || 'Flexible'}
Outcome: ${data.outcome || ''}

Notes / Items:
${data.notes || data.message || data.details || 'None provided'}
    `.trim();

    customerSubject = `Techsteps Collection Request Received - ${reference}`;
    customerHtml = generateCustomerCollectionConfirmationHtml(data);
    customerPlainText = `
Techsteps Collection Request Received
Reference: ${reference}

Dear ${data.name || 'Valued Customer'},

Thank you for your IT collection booking. We have successfully logged your request under reference ${reference}.
Our logistics coordination desk will confirm your collection window within two working days.

Collection Address: ${data.address || ''}
Preferred Date: ${data.collectionDate || data.preferredDate || 'Flexible'}

If you need assistance, please reply directly to this email quoting reference ${reference}.

Techsteps UK
    `.trim();

  } else {
    const sub = data.subject || 'General Enquiry';
    internalSubject = `Techsteps Contact Enquiry - ${sub} (${data.name || 'Website Visitor'})`;
    internalHtml = generateContactHtml(data);
    internalPlainText = `
Techsteps Website Contact Enquiry
Reference: ${reference}

Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}
Subject: ${sub}

Message:
${data.message || ''}
    `.trim();

    customerSubject = `Thank you for contacting Techsteps [Ref: ${reference}]`;
    customerHtml = generateCustomerContactConfirmationHtml(data);
    customerPlainText = `
Thank You for Contacting Techsteps
Reference: ${reference}

Dear ${data.name || 'Valued Customer'},

Thank you for getting in touch regarding ${sub}. Our team has received your message and will reply within 2 to 4 business hours.

Techsteps UK
    `.trim();
  }

  // 1. Dispatch Internal Notification to collection@techsteps.co.uk
  console.log(`[Techsteps Mail] Sending internal notification to ${config.receiver}...`);
  const internalResult = await transporter.sendMail({
    from: `"Techsteps Notifications" <${config.user}>`,
    to: config.receiver,
    replyTo: data.email || config.receiver,
    subject: internalSubject,
    text: internalPlainText,
    html: internalHtml,
  });
  console.log(`[Techsteps Mail] Internal notification sent! Message ID: ${internalResult.messageId}`);

  // 2. Dispatch Customer Auto-Thanks Confirmation (if customer provided an email address)
  if (data.email && data.email.includes('@')) {
    console.log(`[Techsteps Mail] Sending auto-thanks confirmation to customer: ${data.email}...`);
    try {
      const customerResult = await transporter.sendMail({
        from: config.from,
        to: data.email,
        replyTo: config.receiver,
        subject: customerSubject,
        text: customerPlainText,
        html: customerHtml,
      });
      console.log(`[Techsteps Mail] Customer confirmation sent! Message ID: ${customerResult.messageId}`);
    } catch (custErr) {
      console.error(`[Techsteps Mail] Customer confirmation email warning (internal email was delivered):`, custErr.message);
    }
  }

  return {
    success: true,
    reference: reference,
    messageId: internalResult.messageId,
  };
}

module.exports = {
  getSmtpConfig,
  createTransporter,
  generateCollectionHtml,
  generateCustomerCollectionConfirmationHtml,
  generateContactHtml,
  generateCustomerContactConfirmationHtml,
  sendContactEmail,
};
