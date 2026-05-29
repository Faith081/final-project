require("dotenv").config()


const express = require("express")
const app = express()
const cors = require("cors")
const { logger } = require("./middlewares/middleware_logger")
const { planRouter } = require("./routes/plan_routes")
const { userRouter } = require("./routes/user_routes")
const { policyRouter } = require("./routes/policy_routes")
const { claimRouter } = require("./routes/claim_routes")
const paymentRouter = require("./routes/payment_routes")
const { addAminRouter } = require("./routes/addAdmin_routes")
const verifyRoutes = require("./routes/verify_routes")


app.use(express.json())



app.use("/api", planRouter)
app.use("/api", userRouter)
app.use("/api", policyRouter)
app.use("/api", claimRouter)
app.use("/uploads/", express.static(__dirname + "uploads"))
app.use("/api", paymentRouter)
app.use("/api/", verifyRoutes)
app.use("/api/admin", addAminRouter)



module.exports = app
