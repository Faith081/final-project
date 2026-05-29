const {adminRegister, adminLogin} = require("../services/addAdmin_services")

const registerAdmin = async (req, res) => {
 try {
   const {username, email, password} = req.body

   const user = await adminRegister({username, email, password})
   console.log("User created:", user);

   return res.status(201).json({success:true, message:"user created successfully", data: user})

 } catch (error) {
   res.status(400).json({message:error.message})
 }

}


const loginAdmin = async (req, res) =>{
      const {email, password} = req.body
    const adminData =  await adminLogin(email, password)

    return res.status(200).json({
        success:true,
        message:"logged in sucessfully",
        token : adminData.token,
        user : {
          username: adminData.username,
          email : adminData.email
        }
})
}



module.exports = {registerAdmin, loginAdmin}