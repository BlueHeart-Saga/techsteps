/**
 * Techsteps Mail Service
 * Powered by Hostinger SMTP
 * Handles internal notifications to collection@techsteps.co.uk and customer auto-thanks confirmations.
 * Redesigned to match TechSteps executive email template specification (Ref: media_1793942971339_c03dc313.png).
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
// SHARED EMAIL COMPONENTS (Header, Compliance Badges, Footer)
// =========================================================================

function renderEmailHeader() {
  return `
    <!-- Top Green Accent Line -->
    <tr>
      <td style="background-color:#146B5C; height:4px; font-size:1px; line-height:1px;">&nbsp;</td>
    </tr>
    <!-- Header: Logo & Tagline -->
    <tr>
      <td style="padding:24px 32px 18px 32px; background-color:#FFFFFF;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left" valign="middle">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <img src="https://techsteps.co.uk/images/brand/logo.png" width="34" height="34" alt="Techsteps" style="display:block; border:0; outline:none; text-decoration:none;" />
                  </td>
                  <td valign="middle" style="padding-left:10px;">
                    <div style="font-size:22px; font-weight:800; letter-spacing:-0.03em; line-height:1; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      <span style="color:#146B5C;">Tech</span><span style="color:#0F172A;">steps</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
            <td align="right" valign="middle">
              <div style="font-size:12px; font-weight:700; color:#146B5C; letter-spacing:0.02em; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Sustainable IT Asset Lifecycle &amp; Security
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function renderComplianceAndFooter() {
  return `
    <!-- Guaranteed Compliance & Standards Badges -->
    <tr>
      <td style="padding:0 32px 28px 32px; background-color:#FFFFFF;">
        <div style="text-align:center; font-size:11px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#146B5C; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
          GUARANTEED COMPLIANCE &amp; STANDARDS
        </div>
        <table width="100%" border="0" cellpadding="0" cellspacing="6">
          <tr>
            <td width="25%" align="center" style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:8px; padding:10px 6px;">
              <div style="font-size:11.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">ISO 27001 / 9001</div>
              <div style="font-size:9.5px; color:#64748B; margin-top:2px;">Info Security Certified</div>
            </td>
            <td width="25%" align="center" style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:8px; padding:10px 6px;">
              <div style="font-size:11.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">100% Zero-Landfill</div>
              <div style="font-size:9.5px; color:#64748B; margin-top:2px;">Circular IT Mandate</div>
            </td>
            <td width="25%" align="center" style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:8px; padding:10px 6px;">
              <div style="font-size:11.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">ADISA &amp; GDPR</div>
              <div style="font-size:9.5px; color:#64748B; margin-top:2px;">Auditable Data Erasure</div>
            </td>
            <td width="25%" align="center" style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:8px; padding:10px 6px;">
              <div style="font-size:11.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">GPS Transit</div>
              <div style="font-size:9.5px; color:#64748B; margin-top:2px;">Real-time Chain of Custody</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer: Social, Legal Links & Copyright -->
    <tr>
      <td style="background-color:#FAFCFA; border-top:1px solid #EBF2EC; padding:24px 32px; text-align:center;">
        <!-- Social Icons (Clean, No Twitter/X) -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
          <tr>
            <td style="padding:0 6px;">
              <a href="https://www.facebook.com" target="_blank" style="text-decoration:none; display:inline-block; width:28px; height:28px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:28px; font-size:13px; font-weight:bold; font-family:sans-serif;">f</a>
            </td>
            <td style="padding:0 6px;">
              <a href="https://techsteps.co.uk" target="_blank" style="text-decoration:none; display:inline-block; width:28px; height:28px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:28px; font-size:13px; font-weight:bold; font-family:sans-serif;">&#x1F310;</a>
            </td>
            <td style="padding:0 6px;">
              <a href="https://www.linkedin.com/company/techsteps-uk/" target="_blank" style="text-decoration:none; display:inline-block; width:28px; height:28px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:28px; font-size:12px; font-weight:bold; font-family:sans-serif;">in</a>
            </td>
            <td style="padding:0 6px;">
              <a href="https://www.instagram.com" target="_blank" style="text-decoration:none; display:inline-block; width:28px; height:28px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:28px; font-size:13px; font-weight:bold; font-family:sans-serif;">&#x1F4F7;</a>
            </td>
          </tr>
        </table>

        <!-- Legal Links -->
        <div style="font-size:11.5px; color:#64748B; margin-bottom:8px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
          <a href="https://techsteps.co.uk/privacy-policy" style="color:#64748B; text-decoration:underline;">Privacy Notice</a>
          &nbsp;&bull;&nbsp;
          <a href="https://techsteps.co.uk/terms-and-conditions" style="color:#64748B; text-decoration:underline;">Terms of Collection</a>
          &nbsp;&bull;&nbsp;
          <a href="https://techsteps.co.uk/information-security-policy" style="color:#64748B; text-decoration:underline;">Information Security</a>
        </div>

        <!-- Copyright -->
        <div style="font-size:11px; color:#94A3B8; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
          &copy; 2026 Techsteps UK Limited. All rights reserved.
        </div>
      </td>
    </tr>
  `;
}

// =========================================================================
// HTML TEMPLATE: CUSTOMER AUTO-THANKS CONFIRMATION (CONTACT)
// Re-engineered to EXACTLY match mockup media_1793942971339_c03dc313.png
// =========================================================================
function generateCustomerContactConfirmationHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-ENQ-88219');
  const rawName = (data.name || 'Valued Client').trim();
  const firstName = escapeHtml(rawName.split(' ')[0] || 'there');
  const fullName = escapeHtml(rawName);
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const subject = escapeHtml(data.subject || 'IT Equipment Collection & Data Sanitisation');
  const message = escapeHtml(data.message || '').trim() || 'No specific message text provided.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Techsteps - #${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:660px; background-color:#FFFFFF; border-radius:14px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 6px 24px rgba(15,23,42,0.06);">
          
          ${renderEmailHeader()}

          <!-- Headline & Intro Paragraph -->
          <tr>
            <td style="padding:10px 32px 16px 32px; background-color:#FFFFFF;">
              <h1 style="margin:0 0 10px 0; font-size:26px; font-weight:800; color:#0F172A; line-height:1.25; letter-spacing:-0.02em; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Thank you for contacting Techsteps!
              </h1>
              <p style="margin:0; font-size:14px; color:#475569; line-height:1.6; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                We've received your message and inquiry. A dedicated IT lifecycle and sustainability specialist is reviewing your requirements and will get back to you shortly.
              </p>
            </td>
          </tr>

          <!-- 3-Column Metadata Stat Bar (Ref: Mockup) -->
          <tr>
            <td style="padding:0 32px 20px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; padding:12px 0;">
                <tr>
                  <td width="33%" align="left" valign="top" style="padding:8px 8px 8px 0;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      TICKET REFERENCE
                    </div>
                    <div style="font-size:14px; font-weight:800; color:#0F172A; font-family:Consolas, Monaco, monospace;">
                      #${ref}
                    </div>
                  </td>
                  <td width="34%" align="left" valign="top" style="padding:8px; border-left:1px solid #F1F5F9;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      ESTIMATED RESPONSE
                    </div>
                    <div style="font-size:13px; font-weight:700; color:#146B5C; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      &#x23F1; Within 2 Working Hours
                    </div>
                  </td>
                  <td width="33%" align="left" valign="top" style="padding:8px 0 8px 8px; border-left:1px solid #F1F5F9;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      LOGISTICS DESK
                    </div>
                    <div style="font-size:12.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Dartford Central &amp; UK Nationwide
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Salutation & Context Paragraph -->
          <tr>
            <td style="padding:0 32px 18px 32px; background-color:#FFFFFF;">
              <div style="font-size:15px; font-weight:700; color:#0F172A; margin-bottom:8px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Hi ${firstName},
              </div>
              <p style="margin:0; font-size:13.5px; color:#334155; line-height:1.6; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Thank you for reaching out to <strong style="color:#0F172A;">Techsteps UK</strong>. Whether you have questions regarding our zero-landfill IT asset disposition, secure certified data destruction, or scheduling a free corporate hardware collection, our compliance and operations team is here to assist.
              </p>
            </td>
          </tr>

          <!-- Contact Details & Inquiry Summary Card (Soft Mint) -->
          <tr>
            <td style="padding:0 32px 24px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F0FAF5; border:1px solid #D6EFE5; border-radius:12px; padding:20px;">
                <!-- Card Header -->
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" valign="middle">
                          <div style="width:30px; height:30px; border-radius:8px; background-color:#E1F4EC; color:#146B5C; text-align:center; line-height:30px; font-size:15px; font-weight:bold;">
                            &#x1F4C4;
                          </div>
                        </td>
                        <td valign="middle" style="padding-left:10px;">
                          <div style="font-size:14.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                            Your Contact Details &amp; Inquiry Summary
                          </div>
                          <div style="font-size:11px; color:#64748B; margin-top:1px;">
                            Information submitted via Techsteps Contact Form
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:12px 0 14px 0;">
                    <div style="border-bottom:1px solid #D8EFE4; height:1px; line-height:1px;">&nbsp;</div>
                  </td>
                </tr>

                <!-- 2-Column Fields Grid -->
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:13px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-right:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            FULL NAME
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#0F172A;">
                            ${fullName}
                          </div>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-left:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            ORGANISATION
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#0F172A;">
                            ${company}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-right:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            EMAIL ADDRESS
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A;">
                            ${email}
                          </div>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-left:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            CONTACT PHONE
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A;">
                            ${phone}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" valign="top">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            PRIMARY INTEREST / SERVICE
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#146B5C;">
                            ${subject}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Nested Message Card (White inner card) -->
                <tr>
                  <td style="padding-top:14px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border:1px solid #D4ECE1; border-radius:10px; padding:14px 16px;">
                      <tr>
                        <td>
                          <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:6px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                            &#x1F4AC; YOUR SUBMITTED MESSAGE:
                          </div>
                          <div style="font-size:13px; font-style:italic; color:#334155; line-height:1.6; font-family:Georgia, serif, sans-serif;">
                            &ldquo;${message}&rdquo;
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT? Timeline Section -->
          <tr>
            <td style="padding:0 32px 20px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td align="left" style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                    WHAT HAPPENS NEXT?
                  </td>
                  <td align="right" style="padding-left:12px;">
                    <div style="border-bottom:1px solid #E2E8F0; height:1px; line-height:1px;">&nbsp;</div>
                  </td>
                </tr>
              </table>

              <!-- Step 1 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">1</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Specialist Review <span style="display:inline-block; margin-left:6px; background-color:#D1F3EC; color:#146B5C; font-size:9.5px; font-weight:800; padding:2px 7px; border-radius:9999px; vertical-align:middle; letter-spacing:0.04em;">IN PROGRESS</span>
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Our technical solutions team reviews your project requirements and inventory scope within <strong style="color:#0F172A;">2 working hours</strong>.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">2</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Tailored Proposal or Call
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      A dedicated account manager will reply with your custom proposal, logistics options, or direct scheduling link.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">3</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Fast-Track Free Collection
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Once approved, our satellite-tracked collection vehicles arrive with tamper-evident bins and legal consignment transfer notes.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 4 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">4</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Audit &amp; Compliance Certificates
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Following secure processing, receive certified Certificates of Data Destruction (COD) and Scope 3 carbon offset documentation.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgent Request Box -->
          <tr>
            <td style="padding:0 32px 24px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F0FAF7; border:1px solid #9DE0CF; border-radius:10px; padding:14px 18px; text-align:center;">
                <tr>
                  <td align="center">
                    <div style="font-size:13px; color:#334155; line-height:1.5; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Urgent request or immediate booking? Call our direct logistics desk at <a href="tel:+441784640216" style="color:#146B5C; font-weight:700; text-decoration:none;">+44 1784 640216</a> or reply directly to this email.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${renderComplianceAndFooter()}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =========================================================================
// HTML TEMPLATE: CUSTOMER AUTO-THANKS CONFIRMATION (COLLECTION)
// Re-engineered with identical high-end aesthetic tailored for collections
// =========================================================================
function generateCustomerCollectionConfirmationHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-88219');
  const rawName = (data.name || 'Valued Client').trim();
  const firstName = escapeHtml(rawName.split(' ')[0] || 'there');
  const fullName = escapeHtml(rawName);
  const company = escapeHtml(data.company || 'Not specified');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const address = escapeHtml(data.address || 'Not specified').replace(/\n/g, '<br/>');
  const collectionDate = escapeHtml(data.collectionDate || data.preferredDate || 'Flexible / As soon as possible');
  const serviceType = escapeHtml(data.serviceType || 'IT Asset Collection & Data Sanitisation');
  const outcome = escapeHtml(data.outcome || 'Certified IT Asset Disposal & Recycling');
  const notes = escapeHtml(data.notes || data.message || data.details || '').trim();

  // Summary counts string for quick glance
  const assetCounts = [];
  if (data.laptops && data.laptops !== '0') assetCounts.push(`${data.laptops} Laptops`);
  if (data.computers && data.computers !== '0') assetCounts.push(`${data.computers} PCs`);
  if (data.desktops && data.desktops !== '0') assetCounts.push(`${data.desktops} Desktop PCs`);
  if (data.servers && data.servers !== '0') assetCounts.push(`${data.servers} Servers`);
  if (data.monitors && data.monitors !== '0') assetCounts.push(`${data.monitors} Monitors`);
  if (data.mobilePhones && data.mobilePhones !== '0') assetCounts.push(`${data.mobilePhones} Mobiles`);
  if (data.mobiles && data.mobiles !== '0') assetCounts.push(`${data.mobiles} Mobiles`);
  if (data.tablets && data.tablets !== '0') assetCounts.push(`${data.tablets} Tablets`);
  if (data.printers && data.printers !== '0') assetCounts.push(`${data.printers} Printers`);
  if (data.drives && data.drives !== '0') assetCounts.push(`${data.drives} Hard Drives`);
  if (data.accessories && data.accessories !== '0') assetCounts.push(`Accessories`);
  if (data.boxCount) assetCounts.push(`${data.boxCount}`);
  if (data.details) assetCounts.push(`${data.details}`);

  const assetsSummaryText = assetCounts.length > 0 ? escapeHtml(assetCounts.join(', ')) : 'Corporate hardware & IT equipment';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Booking Your Techsteps Collection - #${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:660px; background-color:#FFFFFF; border-radius:14px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 6px 24px rgba(15,23,42,0.06);">
          
          ${renderEmailHeader()}

          <!-- Headline & Intro Paragraph -->
          <tr>
            <td style="padding:10px 32px 16px 32px; background-color:#FFFFFF;">
              <h1 style="margin:0 0 10px 0; font-size:26px; font-weight:800; color:#0F172A; line-height:1.25; letter-spacing:-0.02em; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Thank you for booking your Techsteps collection!
              </h1>
              <p style="margin:0; font-size:14px; color:#475569; line-height:1.6; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                We've received your collection booking. A dedicated IT logistics and compliance coordinator is reviewing your requirements and will confirm your pickup window shortly.
              </p>
            </td>
          </tr>

          <!-- 3-Column Metadata Stat Bar -->
          <tr>
            <td style="padding:0 32px 20px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top:1px solid #E2E8F0; border-bottom:1px solid #E2E8F0; padding:12px 0;">
                <tr>
                  <td width="33%" align="left" valign="top" style="padding:8px 8px 8px 0;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      BOOKING REFERENCE
                    </div>
                    <div style="font-size:14px; font-weight:800; color:#0F172A; font-family:Consolas, Monaco, monospace;">
                      #${ref}
                    </div>
                  </td>
                  <td width="34%" align="left" valign="top" style="padding:8px; border-left:1px solid #F1F5F9;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      ESTIMATED RESPONSE
                    </div>
                    <div style="font-size:13px; font-weight:700; color:#146B5C; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      &#x23F1; Within 2 Working Hours
                    </div>
                  </td>
                  <td width="33%" align="left" valign="top" style="padding:8px 0 8px 8px; border-left:1px solid #F1F5F9;">
                    <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#64748B; margin-bottom:4px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      LOGISTICS DESK
                    </div>
                    <div style="font-size:12.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      UK Operations (Hainault &amp; Stafford)
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Salutation & Context Paragraph -->
          <tr>
            <td style="padding:0 32px 18px 32px; background-color:#FFFFFF;">
              <div style="font-size:15px; font-weight:700; color:#0F172A; margin-bottom:8px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Hi ${firstName},
              </div>
              <p style="margin:0; font-size:13.5px; color:#334155; line-height:1.6; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Thank you for choosing <strong style="color:#0F172A;">Techsteps UK</strong>. Whether you have redundant laptops, desktop PCs, server infrastructure, or require certified data destruction, our secure logistics team is coordinating your booking.
              </p>
            </td>
          </tr>

          <!-- Booking & Collection Summary Card (Soft Mint) -->
          <tr>
            <td style="padding:0 32px 24px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F0FAF5; border:1px solid #D6EFE5; border-radius:12px; padding:20px;">
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="36" valign="middle">
                          <div style="width:30px; height:30px; border-radius:8px; background-color:#E1F4EC; color:#146B5C; text-align:center; line-height:30px; font-size:15px; font-weight:bold;">
                            &#x1F4E6;
                          </div>
                        </td>
                        <td valign="middle" style="padding-left:10px;">
                          <div style="font-size:14.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                            Your Contact Details &amp; Collection Summary
                          </div>
                          <div style="font-size:11px; color:#64748B; margin-top:1px;">
                            Information submitted via Techsteps Collection Booking Form
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:12px 0 14px 0;">
                    <div style="border-bottom:1px solid #D8EFE4; height:1px; line-height:1px;">&nbsp;</div>
                  </td>
                </tr>

                <!-- 2-Column Fields Grid -->
                <tr>
                  <td>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:13px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-right:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            FULL NAME
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#0F172A;">
                            ${fullName}
                          </div>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-left:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            ORGANISATION
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#0F172A;">
                            ${company}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-right:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            EMAIL ADDRESS
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A;">
                            ${email}
                          </div>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-left:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            CONTACT PHONE
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A;">
                            ${phone}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-right:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            COLLECTION ADDRESS
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A; line-height:1.4;">
                            ${address}
                          </div>
                        </td>
                        <td width="50%" valign="top" style="padding-bottom:14px; padding-left:8px;">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            PREFERRED DATE
                          </div>
                          <div style="font-size:13px; font-weight:600; color:#0F172A;">
                            ${collectionDate}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" valign="top">
                          <div style="font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:3px;">
                            EQUIPMENT / SERVICE SCOPE
                          </div>
                          <div style="font-size:13px; font-weight:700; color:#146B5C;">
                            ${assetsSummaryText}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Notes Card (if provided) -->
                ${notes ? `
                <tr>
                  <td style="padding-top:14px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border:1px solid #D4ECE1; border-radius:10px; padding:14px 16px;">
                      <tr>
                        <td>
                          <div style="font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#64748B; margin-bottom:6px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                            &#x1F4AC; YOUR SUBMITTED NOTES &amp; INSTRUCTIONS:
                          </div>
                          <div style="font-size:13px; font-style:italic; color:#334155; line-height:1.6; font-family:Georgia, serif, sans-serif;">
                            &ldquo;${notes}&rdquo;
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT? Timeline Section -->
          <tr>
            <td style="padding:0 32px 20px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td align="left" style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                    WHAT HAPPENS NEXT?
                  </td>
                  <td align="right" style="padding-left:12px;">
                    <div style="border-bottom:1px solid #E2E8F0; height:1px; line-height:1px;">&nbsp;</div>
                  </td>
                </tr>
              </table>

              <!-- Step 1 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#146B5C; color:#FFFFFF; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">1</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Logistics Review &amp; Routing <span style="display:inline-block; margin-left:6px; background-color:#D1F3EC; color:#146B5C; font-size:9.5px; font-weight:800; padding:2px 7px; border-radius:9999px; vertical-align:middle; letter-spacing:0.04em;">IN PROGRESS</span>
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Our regional transport team reviews your address, site access requirements, and device quantities.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">2</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Pickup Window Confirmation
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      You receive a formal confirmation with your exact arrival window, vetted driver details, and vehicle registration.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">3</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      GPS-Tracked Free Collection
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Directly employed, security-cleared personnel collect your equipment in GPS-tracked vehicles with Duty of Care transfer notes.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Step 4 -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" valign="top" style="padding-right:12px;">
                    <div style="width:24px; height:24px; border-radius:50%; background-color:#E2E8F0; color:#475569; text-align:center; line-height:24px; font-weight:800; font-size:11.5px; font-family:'Segoe UI', sans-serif;">4</div>
                  </td>
                  <td valign="top">
                    <div style="font-size:13.5px; font-weight:700; color:#0F172A; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Certified Destruction &amp; Waste Transfer Audit
                    </div>
                    <div style="font-size:12.5px; color:#475569; line-height:1.5; margin-top:3px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Full itemised audit reports and serialized Certificates of Data Destruction (COD) issued upon completion.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgent Request Box -->
          <tr>
            <td style="padding:0 32px 24px 32px; background-color:#FFFFFF;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F0FAF7; border:1px solid #9DE0CF; border-radius:10px; padding:14px 18px; text-align:center;">
                <tr>
                  <td align="center">
                    <div style="font-size:13px; color:#334155; line-height:1.5; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                      Urgent request or immediate booking? Call our direct logistics desk at <a href="tel:+441784640216" style="color:#146B5C; font-weight:700; text-decoration:none;">+44 1784 640216</a> or reply directly to this email.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${renderComplianceAndFooter()}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =========================================================================
// HTML TEMPLATE: INTERNAL CONTACT ENQUIRY NOTIFICATION
// Dispatched to collection@techsteps.co.uk
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
  <title>TechSteps Contact Enquiry - #${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:660px; background-color:#FFFFFF; border-radius:14px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 6px 24px rgba(15,23,42,0.06);">
          
          ${renderEmailHeader()}

          <!-- Internal Notice Banner -->
          <tr>
            <td style="padding:10px 32px 18px 32px; background-color:#FFFFFF;">
              <div style="background-color:#0F172A; border-radius:10px; padding:16px 20px; color:#FFFFFF;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#B8EC4C;">
                        NEW WEBSITE ENQUIRY
                      </div>
                      <div style="font-size:18px; font-weight:800; color:#FFFFFF; margin-top:2px;">
                        ${subject}
                      </div>
                    </td>
                    <td align="right" valign="top">
                      <div style="display:inline-block; background-color:#1E293B; border:1px solid #334155; border-radius:6px; padding:4px 10px; font-size:12px; font-weight:800; font-family:Consolas, Monaco, monospace; color:#FFFFFF;">
                        #${ref}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Sender Information Table -->
          <tr>
            <td style="padding:0 32px 20px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Sender &amp; Client Details
              </div>
              <table width="100%" border="0" cellpadding="8" cellspacing="0" style="font-size:13.5px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                <tr style="background-color:#F8FAF9;">
                  <td width="35%" style="color:#64748B; font-weight:600;">Full Name:</td>
                  <td width="65%" style="color:#0F172A; font-weight:700;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#64748B; font-weight:600;">Company / Organisation:</td>
                  <td style="color:#0F172A; font-weight:700;">${company}</td>
                </tr>
                <tr style="background-color:#F8FAF9;">
                  <td style="color:#64748B; font-weight:600;">Email Address:</td>
                  <td style="color:#146B5C; font-weight:700;">
                    <a href="mailto:${email}" style="color:#146B5C; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#64748B; font-weight:600;">Phone Number:</td>
                  <td style="color:#0F172A; font-weight:700;">
                    <a href="tel:${phone}" style="color:#0F172A; text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr style="background-color:#F8FAF9;">
                  <td style="color:#64748B; font-weight:600;">Service / Subject:</td>
                  <td style="color:#146B5C; font-weight:800;">${subject}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding:0 32px 28px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Message Content
              </div>
              <div style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:10px; padding:18px 20px; font-size:13.5px; color:#1E293B; line-height:1.65; white-space:pre-line; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                ${message}
              </div>
            </td>
          </tr>

          ${renderComplianceAndFooter()}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// =========================================================================
// HTML TEMPLATE: INTERNAL COLLECTION & BOOKING NOTIFICATION
// Dispatched to collection@techsteps.co.uk
// =========================================================================
function generateCollectionHtml(data) {
  const ref = escapeHtml(data.reference || 'TS-COL-PENDING');
  const serviceType = escapeHtml(data.serviceType || 'IT Asset Collection Booking');
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
  if (data.computers && data.computers !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Desktop PCs &amp; Towers:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.computers)}</td></tr>`);
  if (data.desktops && data.desktops !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Desktop PCs &amp; Towers:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.desktops)}</td></tr>`);
  if (data.laptops && data.laptops !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Laptops / MacBooks:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.laptops)}</td></tr>`);
  if (data.chromebooks && data.chromebooks !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Chromebooks:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.chromebooks)}</td></tr>`);
  if (data.tablets && data.tablets !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Tablets / iPads:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.tablets)}</td></tr>`);
  if (data.servers && data.servers !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Servers &amp; Storage Arrays:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.servers)}</td></tr>`);
  if (data.monitors && data.monitors !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Monitors &amp; Screens:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.monitors)}</td></tr>`);
  if (data.mobilePhones && data.mobilePhones !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Mobile Phones:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.mobilePhones)}</td></tr>`);
  if (data.mobiles && data.mobiles !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Mobile Phones:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.mobiles)}</td></tr>`);
  if (data.printers && data.printers !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Printers / Copiers:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.printers)}</td></tr>`);
  if (data.itAssets && data.itAssets !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">IT Assets / Networking:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.itAssets)}</td></tr>`);
  if (data.accessories && data.accessories !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Accessories / Cabling:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.accessories)}</td></tr>`);
  if (data.drives && data.drives !== '0') assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Hard Drives for Destruction:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.drives)}</td></tr>`);
  if (data.driveCount) assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Drives / SSDs Count:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.driveCount)}</td></tr>`);
  if (data.boxCount) assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Courier Box Count:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.boxCount)}</td></tr>`);
  if (data.disposalMethod) assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Disposal Method / Services:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.disposalMethod)}</td></tr>`);
  if (data.otherText && data.otherText.trim()) assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Other Assets:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.otherText)}</td></tr>`);
  if (data.details && data.details.trim()) assetRows.push(`<tr><td style="color:#64748B; padding:6px 0;">Item Details:</td><td style="font-weight:700; color:#0F172A; padding:6px 0;">${escapeHtml(data.details)}</td></tr>`);

  const assetTableContent = assetRows.length > 0
    ? `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size:13.5px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">${assetRows.join('')}</table>`
    : `<div style="font-size:13px; color:#64748B; font-style:italic;">No specific counts enumerated (see notes below).</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechSteps Collection Request - #${ref}</title>
</head>
<body style="margin:0; padding:0; background-color:#F4F7F4; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#12181A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#F4F7F4; padding:32px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:660px; background-color:#FFFFFF; border-radius:14px; overflow:hidden; border:1px solid #D9E4D9; box-shadow:0 6px 24px rgba(15,23,42,0.06);">
          
          ${renderEmailHeader()}

          <!-- Internal Notice Banner -->
          <tr>
            <td style="padding:10px 32px 18px 32px; background-color:#FFFFFF;">
              <div style="background-color:#0F172A; border-radius:10px; padding:16px 20px; color:#FFFFFF;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#B8EC4C;">
                        COLLECTION BOOKING DISPATCH
                      </div>
                      <div style="font-size:18px; font-weight:800; color:#FFFFFF; margin-top:2px;">
                        ${serviceType}
                      </div>
                    </td>
                    <td align="right" valign="top">
                      <div style="display:inline-block; background-color:#1E293B; border:1px solid #334155; border-radius:6px; padding:4px 10px; font-size:12px; font-weight:800; font-family:Consolas, Monaco, monospace; color:#FFFFFF;">
                        #${ref}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding:0 32px 18px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Client &amp; Contact Information
              </div>
              <table width="100%" border="0" cellpadding="8" cellspacing="0" style="font-size:13.5px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                <tr style="background-color:#F8FAF9;">
                  <td width="35%" style="color:#64748B; font-weight:600;">Full Name:</td>
                  <td width="65%" style="color:#0F172A; font-weight:700;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#64748B; font-weight:600;">Company / Organisation:</td>
                  <td style="color:#0F172A; font-weight:700;">${company}</td>
                </tr>
                <tr style="background-color:#F8FAF9;">
                  <td style="color:#64748B; font-weight:600;">Email Address:</td>
                  <td style="color:#146B5C; font-weight:700;">
                    <a href="mailto:${email}" style="color:#146B5C; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#64748B; font-weight:600;">Telephone:</td>
                  <td style="color:#0F172A; font-weight:700;">
                    <a href="tel:${phone}" style="color:#0F172A; text-decoration:none;">${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Logistics & Scheduling -->
          <tr>
            <td style="padding:0 32px 18px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Logistics &amp; Scheduling
              </div>
              <table width="100%" border="0" cellpadding="8" cellspacing="0" style="font-size:13.5px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                <tr style="background-color:#F8FAF9;">
                  <td width="35%" style="color:#64748B; font-weight:600; vertical-align:top;">Collection Address:</td>
                  <td width="65%" style="color:#0F172A; font-weight:700; vertical-align:top; line-height:1.4;">${address}</td>
                </tr>
                <tr>
                  <td style="color:#64748B; font-weight:600;">Preferred Date:</td>
                  <td style="color:#0F172A; font-weight:700;">${collectionDate}</td>
                </tr>
                <tr style="background-color:#F8FAF9;">
                  <td style="color:#64748B; font-weight:600;">Required Outcome:</td>
                  <td style="color:#146B5C; font-weight:800;">${outcome}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Equipment Breakdown -->
          <tr>
            <td style="padding:0 32px 18px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Hardware &amp; Equipment Specified
              </div>
              <div style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:10px; padding:14px 18px;">
                ${assetTableContent}
              </div>
            </td>
          </tr>

          <!-- Notes -->
          <tr>
            <td style="padding:0 32px 28px 32px; background-color:#FFFFFF;">
              <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:#146B5C; border-bottom:2px solid #E2E8F0; padding-bottom:6px; margin-bottom:14px; font-family:'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
                Special Instructions / Notes
              </div>
              <div style="background-color:#F8FAF9; border:1px solid #E2E8F0; border-radius:10px; padding:16px 18px; font-size:13.5px; color:#1E293B; line-height:1.6; white-space:pre-line;">
                ${notes}
              </div>
            </td>
          </tr>

          ${renderComplianceAndFooter()}

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
    internalSubject = `TechSteps ${serviceTitle} - #${reference} (${data.company || data.name || 'New Client'})`;
    internalHtml = generateCollectionHtml(data);
    internalPlainText = `
Techsteps ${serviceTitle}
Reference: #${reference}

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

    customerSubject = `Thank you for booking your Techsteps collection! [Ref: #${reference}]`;
    customerHtml = generateCustomerCollectionConfirmationHtml(data);
    customerPlainText = `
Thank you for booking your Techsteps collection!
Reference: #${reference}

Dear ${data.name || 'Valued Customer'},

Thank you for choosing Techsteps UK. We have successfully logged your collection booking request in our logistics management system under reference #${reference}.
Our logistics coordination desk will confirm your collection window within 2 working hours.

Collection Address: ${data.address || 'As specified'}
Preferred Date: ${data.collectionDate || data.preferredDate || 'Flexible'}

Urgent request or immediate booking? Call our direct logistics desk at +44 1784 640216 or reply directly to this email.

Techsteps UK
    `.trim();

  } else {
    const sub = data.subject || 'General Website Enquiry';
    internalSubject = `Techsteps Contact Enquiry - ${sub} [Ref: #${reference}] (${data.name || 'Website Visitor'})`;
    internalHtml = generateContactHtml(data);
    internalPlainText = `
Techsteps Website Contact Enquiry
Reference: #${reference}

Name: ${data.name || ''}
Company: ${data.company || ''}
Email: ${data.email || ''}
Phone: ${data.phone || ''}
Subject: ${sub}

Message:
${data.message || ''}
    `.trim();

    customerSubject = `Thank you for contacting Techsteps! [Ref: #${reference}]`;
    customerHtml = generateCustomerContactConfirmationHtml(data);
    customerPlainText = `
Thank you for contacting Techsteps!
Reference: #${reference}

Dear ${data.name || 'Valued Customer'},

Thank you for reaching out to Techsteps UK regarding ${sub}. We have received your enquiry and our team will get back to you within 2 working hours.

Urgent request or immediate booking? Call our direct logistics desk at +44 1784 640216 or reply directly to this email.

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

  // 2. Dispatch Customer Auto-Thanks Confirmation (if customer provided a valid email address)
  let customerResult = null;
  if (data.email && data.email.includes('@') && !data.email.endsWith('@example.com')) {
    console.log(`[Techsteps Mail] Sending auto-thanks confirmation to customer: ${data.email}...`);
    try {
      customerResult = await transporter.sendMail({
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
  } else {
    console.log(`[Techsteps Mail] Customer confirmation skipped (test or omitted email: ${data.email})`);
  }

  return {
    success: true,
    reference: reference,
    messageId: internalResult.messageId,
    customerMessageId: customerResult ? customerResult.messageId : null,
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
