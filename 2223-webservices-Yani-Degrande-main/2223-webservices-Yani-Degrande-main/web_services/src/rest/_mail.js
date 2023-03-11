// ======= Mailer =======
// - function to send mail

// === Imports ===

// - Import nodemailer
const nodemailer = require("nodemailer");
// - Import config
const config = require("config");

// === functions ===

// - Send email
function sendEmail(receiver, date, amount, category) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 25,
      auth: {
        user: config.get("nodemailer.host"),
        pass: config.get("nodemailer.pass"),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: config.get("nodemailer.host"),
      to: receiver,
      subject: `DEGRANDE Farm Reservation - ${date.split("T")[0]} || ${
        date.split("T")[1]
      }`,
      text:
        "Thank you!\nYour reservation has been received succesfully!\nWe are looking forward to seeing you soon!\n\nSincerely,\nDEGRANDE Farm\n\n\nReservation details:\nDate: " +
        date.split("T")[0] +
        " || Time: " +
        date.split("T")[1] +
        " || Number of people: " +
        amount +
        " || Ticket type: " +
        category,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

// - Export functions

module.exports = {
  sendEmail,
};
