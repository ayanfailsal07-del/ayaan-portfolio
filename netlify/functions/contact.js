exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, subject, message, projectType, budget, timeline } = data;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Name, email and message are required' })
      };
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_TO = process.env.EMAIL_TO || 'gt.ayaan@gmail.com';

    if (!RESEND_API_KEY) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Email service not configured' })
      };
    }

    const emailSubject = subject ? `Portfolio: ${subject}` : 'New Portfolio Contact Message';
    const emailText = [
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

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [EMAIL_TO],
        reply_to: email,
        subject: emailSubject,
        text: emailText
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('Resend error:', res.status, errBody);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'Email sending failed' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Message sent successfully' })
    };

  } catch (err) {
    console.error('Contact function error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Server error' })
    };
  }
};
