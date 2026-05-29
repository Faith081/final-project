const express = require("express")
const planRouter = express.Router()
const {auth} = require("../middlewares/auth_middleware")
const {admin} = require("../middlewares/admin_middleware")
const {newPlanCreated, getPlan} = require("../controllers/plan_controller")


planRouter.post("/plan", auth, admin, newPlanCreated)
planRouter.get("/plan", getPlan)




module.exports = {planRouter}
