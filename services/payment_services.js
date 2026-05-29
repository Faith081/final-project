const dotenv = require("dotenv")
dotenv.config()


const axios = require("axios")

const paystack = axios.create({
    baseURL: "https://api.paystack.co",
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content_Type": "application/json",
    }
})

async function initializeTrasaction(email, amount) {
    return paystack.post("/transaction/initialize", {
        email,
        amount: amount * 100,
        currency: "NGN"
    })
}


async function verifyTransaction(reference) {
    return paystack.get(`/transaction/verify/${reference}`)
}


module.exports = { initializeTrasaction, verifyTransaction }