const { forgotPassword, resetPassword } = require("../services/password_services")

const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body

        if (!email || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({ message: "Email address is required" })
        }

        const result = await forgotPassword(email)
        res.status(200).json({ success: true, message: result.message })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const result = await resetPassword(token, password)
        res.status(200).json({ success: true, message: result.message })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { forgotPasswordController, resetPasswordController }
