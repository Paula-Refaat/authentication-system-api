const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    sender: {
      name: process.env.EMAIL_FROM, // Custom sender name
    },
  });

  const mailOptions = {
    from: {
      name: process.env.EMAIL_FROM, // Custom sender name
      address: process.env.EMAIL_USER, // Actual sender email address
    },
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
