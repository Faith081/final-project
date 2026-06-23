require("dotenv").config()


const express = require("express")
const path = require("path")
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
const { passwordRouter } = require("./routes/password_routes")


app.use(cors())
app.use(express.json())

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")))



app.use("/api", planRouter)
app.use("/api", userRouter)
app.use("/api", policyRouter)
app.use("/api", claimRouter)
app.use("/uploads/", express.static(__dirname + "uploads"))
app.use("/api/", verifyRoutes)
app.use("/api", paymentRouter)
app.use("/api/admin", addAminRouter)
app.use("/api", passwordRouter)



module.exports = app


