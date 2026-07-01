const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const userSchema = require("../models/model_user")
const adminSchema = require("../models/admin_model")
const sendEmail = require("./email_services")

const forgotPassword = async (email) => {
    const normalizedEmail = (email || "").trim().toLowerCase()

    // Check user model first, then admin model
    let account = await userSchema.findOne({ email: normalizedEmail })
    if (!account) {
        account = await adminSchema.findOne({ email: normalizedEmail })
    }

    if (!account) {
        throw new Error("No account found with that email address")
    }

    const token = crypto.randomBytes(32).toString("hex")
    account.resetPasswordToken = token
    account.resetPasswordExpires = Date.now() + 3600000 // 1 hour
    await account.save()

    const resetLink = `${process.env.BASE_URL}/reset-password.html?token=${token}`

    await sendEmail({
        to: normalizedEmail,
        subject: "Password Reset Request",
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset for your InsureNow account.</p>
            <p>Click the link below to set a new password. This link expires in <strong>1 hour</strong>.</p>
            <a href="${resetLink}" style="display:inline-block;background:#1a3060;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Reset My Password</a>
            <p style="margin-top:16px;color:#6b7280;font-size:14px;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
        `
    })

    return { message: "Password reset link sent to your email" }
}

const resetPassword = async (token, newPassword) => {
    // Check both models for the token
    let account = await userSchema.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if (!account) {
        account = await adminSchema.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })
    }

    if (!account) {
        throw new Error("Password reset link is invalid or has expired")
    }

    account.password = await bcrypt.hash(newPassword, 10)
    account.resetPasswordToken = undefined
    account.resetPasswordExpires = undefined
    await account.save()

    return { message: "Password reset successfully" }
}



module.exports = { forgotPassword, resetPassword }
