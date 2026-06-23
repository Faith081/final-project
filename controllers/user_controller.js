const { register, userLogin } = require("../services/user_services")

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const user = await register({ username, email, password })


    return res.status(201).json({
      success: true,
      message: "user created successfully, click your email to verify",
      data: user
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }

}


const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userData = await userLogin(email, password)

    return res.status(200).json({
      success: true,
      message: "logged in sucessfully",
      token: userData.token,
      user: {
        username: userData.userData.username,
        email: userData.userData.email
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}



module.exports = { registerUser, login }



