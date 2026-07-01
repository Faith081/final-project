const nodemailer = require("nodemailer")
require("dotenv").config()


const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

async function sendEmail(to, subject, text){
    await mailTransporter.sendMail({
        from: `"INSURANCE APP" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text
    })
}


module.exports = {sendEmail}
