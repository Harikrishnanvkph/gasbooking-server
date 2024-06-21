const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service : "gmail",
  host: "smtp.gmail.com", // Correct host for Gmail
  port: 587, // SMTP port for Gmail
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL, // Your Gmail email address
    pass: process.env.MAIL_KEY, // Your Gmail app-specific password
  },
});

// Define the main function to send emails
async function main(mail,pin) {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name : "HARI GAS BOOKING",
        address : process.env.MAIL
      }, // Sender address
      to: mail, // Receiver address
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // Plain text body
      html: `<div>Welcome to HARI GAS BOOKING!🎉👏 <div>
      <div>Your Pin Code to Verify your account is <b>${pin} 📌</b><div>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    return false;
  }
}

// Function to initialize and send email
async function sendEmail(mail,pin) {
  return await main(mail,pin); // Call the main function to send email
}

module.exports = { sendEmail };
