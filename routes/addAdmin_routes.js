const express = require("express")
const addAminRouter = express.Router()
const {registerAdmin, loginAdmin} = require("../controllers/addAdmin_controllers")

addAminRouter.post("/register", registerAdmin)
addAminRouter.post("/login", loginAdmin)



module.exports = {addAminRouter}