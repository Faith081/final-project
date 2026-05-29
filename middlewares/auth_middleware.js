const dotenv = require("dotenv")
dotenv.config()


const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY 


const auth = (req, res, next) =>{

const authorization = req.headers.authorization

if(!authorization){
    return res.status(404).json({message:"Token must be provided"})
}


try {

const token = req.headers.authorization.split(" ")[1]

const decoded = jwt.verify(token, JWT_SECRET_KEY)

req.user = decoded


next()

} catch (error) {
     return res.status(401).json({message: error.message})
}


}


module.exports = {auth}