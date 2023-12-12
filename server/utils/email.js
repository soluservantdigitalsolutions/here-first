const nodemailer = require("nodemailer");

async function sendEmail(email, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // use 'gmail' or any other service you prefer
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_ADDRESS, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
}

module.exports = {
  sendEmail,
};
