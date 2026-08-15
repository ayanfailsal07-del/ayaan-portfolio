const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server', '.env') });
const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.error('DNS override failed:', e.message);
}
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  console.error('IPv4-first DNS failed:', e.message);
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Message = require('./server/models/Message');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const PUBLIC_DIR = __dirname;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: (Number(process.env.EMAIL_PORT) || 465) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendContactEmail(data) {
  const subject = data.subject ? `Portfolio: ${data.subject}` : 'New Portfolio Contact Message';
  const body = [
    'You received a new message from your portfolio.',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject || '-'}`,
    `Project Type: ${data.projectType || '-'}`,
    `Budget: ${data.budget || '-'}`,
    `Timeline: ${data.timeline || '-'}`,
    '',
    'Message:',
    data.message,
    '',
    `Sent at: ${new Date().toLocaleString()}`
  ].join('\n');

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject,
    text: body
  });
}

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(express.static(PUBLIC_DIR));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio contact backend is running.' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, projectType, budget, timeline } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'name, email and message are required' });
    }

    const saved = await Message.create({
      name,
      email,
      subject: subject || '',
      message,
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || ''
    });

    let emailSent = false;
    try {
      await sendContactEmail({
        name,
        email,
        subject: subject || '',
        projectType: projectType || '',
        budget: budget || '',
        timeline: timeline || '',
        message
      });
      emailSent = true;
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    res.status(201).json({ success: true, id: saved._id, emailSent });
  } catch (err) {
    console.error('Contact save error:', err);
    res.status(500).json({ success: false, error: 'Failed to save message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, messages });
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));
} else {
  console.error('MONGODB_URI is missing. Contact form storage/email will be limited.');
}
