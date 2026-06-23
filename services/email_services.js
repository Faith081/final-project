const dotenv = require("dotenv").config()



const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }

})


const sendEmail = async ({ to, subject, html }) => {


  const info = await transporter.sendMail({
    from: `"INSURANCE APP" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  })



  console.log("Email Send", info.response)
  return info
}


module.exports = sendEmail