const express = require("express");
const verifyRoutes = express.Router();




const { verifyUser } = require("../controllers/verify_controller");

console.log("VERIFY ROUTE LOADED");

verifyRoutes.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");

  res.json({
    success: true,
    message: "Verify routes working"
  });
});

verifyRoutes.get("/verify/:token", verifyUser);

module.exports = verifyRoutes;