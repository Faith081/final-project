require("dotenv").config()
// console.log("FROM SERVER:", process.env.JWT_SECRET_KEY);
const app = require("./app")
const {config} = require("./configs/config")



const PORT = 9000

const startServer = async () =>{
    await config()

    app.listen(PORT, () =>{
        console.log(`app is running on port:${PORT}`)
    })
}

startServer()