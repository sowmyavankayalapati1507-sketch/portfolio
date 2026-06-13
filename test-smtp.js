const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sowmyavankayalapati.1507@gmail.com",
    pass: "lqxg uxff fzmh sivz",
  },
});

console.log("Attempting to send email directly...");

const mailOptions = {
  from: `"Test User" <testuser@example.com>`,
  to: "sowmyavankayalapati.1507@gmail.com",
  subject: "SMTP Test from Portfolio Site with Custom From",
  text: "If you receive this, SMTP config supports arbitrary from!",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Failed to send test mail:", err);
  } else {
    console.log("Test mail sent successfully:", info.messageId);
    console.log("Response envelope:", info.envelope);
  }
  process.exit(err ? 1 : 0);
});
