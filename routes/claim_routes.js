const express = require("express")
const claimRouter = express.Router()
const { userClaims, getAllUserClaims, claimUpdate, userGetClaims } = require("../controllers/claims_controller")
const { auth } = require("../middlewares/auth_middleware")
const { admin } = require("../middlewares/admin_middleware")
const { uploadDisk } = require("../middlewares/uploadfile_middleware")


claimRouter.post("/claims", auth, uploadDisk.single("receipt"), userClaims)
claimRouter.put("/claims/:id", auth, admin, claimUpdate)
claimRouter.get("/claims/all", auth, admin, getAllUserClaims)
claimRouter.get("/claims", auth, userGetClaims)



module.exports = { claimRouter }