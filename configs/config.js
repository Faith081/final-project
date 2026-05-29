const mongoose = require("mongoose")



const config = async () => {
    try {

        await mongoose.connect("mongodb://Faith:Faith123@ac-ojy59xm-shard-00-00.2n6pt2u.mongodb.net:27017,ac-ojy59xm-shard-00-01.2n6pt2u.mongodb.net:27017,ac-ojy59xm-shard-00-02.2n6pt2u.mongodb.net:27017/myDatabase?ssl=true&authSource=admin&retryWrites=true&w=majority")
        console.log("Database connected successfully")


    } catch (error) {
        console.log(error.message)
    }

}


module.exports = { config }