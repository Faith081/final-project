const { string, required } = require("joi")
const mongoose = require("mongoose")
const { timeStamp } = require("node:console")
const { type } = require("node:os")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date
},
    {
        timestamps: true
    }

)



module.exports = mongoose.model("User", userSchema)

