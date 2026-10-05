const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.FORM_RECEIVER_EMAIL,
            subject: 'Techsteps Email Test',
            text: 'This is a test email from the Techsteps website email setup.',
        });

        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('Email failed:', error);
    }
}

sendTestEmail();