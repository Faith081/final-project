const nodemailer = require("nodemailer")


const mailTransporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user: process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})

async function sendEmail(to, subject, text){
    await mailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    })
}


module.exports = {sendEmail}