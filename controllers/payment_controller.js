const { sendEmail } = require("../services/notification_services")
const { initializeTrasaction, verifyTransaction } = require("../services/payment_services")


exports.startPayment = async (req, res) => {
    try {
        const { email, amount } = req.body
        const response = await initializeTrasaction(email, amount)

        res.json(response.data)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { reference } = req.params
        const response = await verifyTransaction(reference)

        if (response.data.data.status === "success") {

            try {
                await sendEmail(
                    response.data.data.customer.email,
                    "Payment Confirmed",
                    `your payment with reference ${reference}`
                )
            } catch (emailError) {
                console.log("Payment confirmed but email failed:", emailError.message)
            }

            res.json({ message: "payment successfully", data: response.data.data })
        } else {
            res.json({ message: "payment failed", data: response.data.data })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
