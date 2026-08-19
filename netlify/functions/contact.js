const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success: false, error: 'Method not allowed' }) };
  }

  try {
    const { name, email, subject, message, projectType, budget, timeline } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Name, email and message are required' }) };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
      from: process.env.EMAIL_FROM || `Portfolio <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: mailSubject,
      text: mailText
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully' })
    };

  } catch (err) {
    console.error('Contact function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Failed to send email' })
    };
  }
};
