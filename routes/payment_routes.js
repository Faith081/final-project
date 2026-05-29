const express = require("express")
const paymentRouter = express.Router()
const paymentController = require("../controllers/payment_controller")

paymentRouter.post("/pay", paymentController.startPayment)
paymentRouter.get("/verify/:reference", paymentController.verifyPayment)



module.exports = paymentRouter