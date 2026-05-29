const dotenv = require("dotenv").config()
const adminSchema = require("../models/admin_model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { admin } = require("../middlewares/admin_middleware")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const adminRegister = async ({username, email, password}) =>{

    const userCheck = await adminSchema.findOne({email})

    if(userCheck){
        throw new Error("User already exist")
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const userRegister = await adminSchema.create({
         username,
         email, 
         password:hashedPass})

    return userRegister
}


const adminLogin = async (email, password) =>{
    const user = await adminSchema.findOne({email})

    if(!user){
        throw new Error("User does not exist")
    }

    const validate = await bcrypt.compare(password, user.password)
    if(!validate){
        throw new Error("invalid or wrong password")
    }

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role

    }


    const token =  jwt.sign(payload, JWT_SECRET_KEY)
     
    const adminData = {
        username: user.username,
        email: user.email
    }

    return{
        adminData,
        token
    }
}



module.exports = {adminRegister, adminLogin}