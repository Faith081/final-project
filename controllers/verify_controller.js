const { verifyUserService } = require("../services/verify_services")


const verifyUser = async (req, res) => {
  try {
    console.log(req.params);
    const { token } = req.params


    const user = await verifyUserService(token)


    res.status(200).json({
      success: true,
      message: "Account Verified Successfully",
      data: {
        user: user.email,
        isverified: user.isVerified
      }
    })

  } catch (error) {
    console.log("VERIFY ERROR:", error.message)

    res.status(404).json({
      success: false,
      error: error.message || error
    })
  }
}


module.exports = { verifyUser }