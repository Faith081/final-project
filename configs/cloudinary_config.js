const cloudinary = require("cloudinary")


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key :process.env.CLOUD_NAME_API_KEY,
    api_secret_key : process.env.CLOUD_NAME_API_SECRET_KEY
})


module.exports = {cloudinary}