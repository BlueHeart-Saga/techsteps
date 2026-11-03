const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465');
  const user = process.env.SMTP_USER || 'collection@techsteps.co.uk';
  const pass = process.env.SMTP_PASS || '';
  const receiver = process.env.FORM_RECEIVER_EMAIL || 'collection@techsteps.co.uk';

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    await transporter.verify();
    console.log('Transporter verified successfully!');

    const info = await transporter.sendMail({
      from: `"Techsteps" <${user}>`,
      to: receiver,
      subject: 'Techsteps Hostinger SMTP Verification',
      text: 'Hostinger SMTP setup is working successfully for Techsteps website forms.',
      html: '<h3>Techsteps Hostinger SMTP Verification</h3><p>Hostinger SMTP setup is working successfully for all Techsteps website forms.</p>',
    });

    console.log('SUCCESS: Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Email failed:', error);
  }
}

sendTestEmail();