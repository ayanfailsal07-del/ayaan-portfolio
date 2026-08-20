const nodemailer = require('nodemailer');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  try {
    const { name, email, subject, message, projectType, budget, timeline } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: 'Name, email and message are required' }) };
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Missing EMAIL_USER or EMAIL_PASS env vars');
      return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: 'Email not configured on server' }) };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailSubject = subject ? `Portfolio: ${subject}` : 'New Portfolio Contact Message';
    const mailText = [
      'New message from your portfolio website',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || '-'}`,
      `Project Type: ${projectType || '-'}`,
      `Budget: ${budget || '-'}`,
      `Timeline: ${timeline || '-'}`,
      '',
      'Message:',
      message,
      '',
      `Sent at: ${new Date().toLocaleString()}`
    ].join('\n');

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `Portfolio <${emailUser}>`,
      to: process.env.EMAIL_TO || emailUser,
      replyTo: email,
      subject: mailSubject,
      text: mailText
    });

    console.log('Email sent successfully to', process.env.EMAIL_TO || emailUser);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Message sent successfully' })
    };

  } catch (err) {
    console.error('Contact function error:', err.message || err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message || 'Failed to send email' })
    };
  }
};
