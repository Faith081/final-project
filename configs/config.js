const mongoose = require("mongoose")



const config = async () => {
    try {

        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected successfully")


    } catch (error) {

        console.log(error.message)
    }

}


module.exports = { config }