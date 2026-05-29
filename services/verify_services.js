const userSchema = require("../models/model_user")



const verifyUserService = async (token) => {


  const user = await userSchema.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }
  })

  if (!user) {
    throw new Error("Invalid or Expired")
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined



  await user.save()

  return user
}


module.exports = { verifyUserService }