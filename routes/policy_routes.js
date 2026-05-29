const express = require("express")
const policyRouter = express.Router()
const {policyPlan, getUserPolicies} = require("../controllers/policy_controller")
const {auth} = require("../middlewares/auth_middleware")
const {admin} = require("../middlewares/admin_middleware")

policyRouter.post("/policy", auth, policyPlan)
policyRouter.get("/policy", auth, getUserPolicies)







module.exports = {policyRouter}