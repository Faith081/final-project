const express = require("express");
const verifyRoutes = express.Router();


const { verifyUser } = require("../controllers/verify_controller");




verifyRoutes.get("/auth/verify/:token", verifyUser);

module.exports = verifyRoutes;