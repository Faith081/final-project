const express = require("express")
const passwordRouter = express.Router()
const { forgotPasswordController, resetPasswordController } = require("../controllers/password_controller")

passwordRouter.post("/forgot-password", forgotPasswordController)
passwordRouter.post("/reset-password/:token", resetPasswordController)

module.exports = { passwordRouter }
