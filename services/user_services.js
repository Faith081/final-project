const dotenv = require("dotenv").config()
const userSchema = require("../models/model_user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const crypto = require("crypto")
const sendMail = require("./email_services")

const register = async ({ username, email, password }) => {

    const userCheck = await userSchema.findOne({ email })

    if (userCheck) {
        throw new Error("User already exist")
    }

    const hashedPass = await bcrypt.hash(password, 10)

    // this help me to generate the verification token
    const token = crypto.randomBytes(32).toString("hex")

    const userRegister = await userSchema.create({
        username,
        email,
        password: hashedPass,
        verificationToken: token,
        verificationTokenExpires: Date.now() + 3600000
    })

    // helps to create the verification link
    const verificationLink = `${process.env.BASE_URL}/verify.html?token=${token}`


    //this send the verification email
    try {

        await sendMail({
            to: userRegister.email,
            subject: "verify your email",
            html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email below:</p>
        <a href = "${verificationLink}">Verify Account</a>
        `
        })

    } catch (error) {
        console.log("Email failed but user was creaetd:", error.message)
    }


    return userRegister
}


const userLogin = async (email, password) => {
    const user = await userSchema.findOne({ email })

    if (!user) {
        throw new Error("User does not exist")
    }

    const validate = await bcrypt.compare(password, user.password)
    if (!validate) {
        throw new Error("invalid or wrong password")
    }

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }


    const token = jwt.sign(payload, JWT_SECRET_KEY)

    const userData = {
        username: user.username,
        email: user.email
    }

    return {
        userData,
        token
    }
}



module.exports = { register, userLogin }