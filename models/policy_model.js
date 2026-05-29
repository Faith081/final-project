const mongoose = require("mongoose")
const {UserModel} = require("../models/model_user")

const policySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    plan: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Plan",
        required : true
    },
    startDate :{
        type : Date,
        default : Date.now
    },
    endDate :{
        type : Date,
    }, 
    status:{
        type: String,
        enum : ["active", "expired"],
        default : "active"
    }
},

{
    timestamps : true
}

)


module.exports = mongoose.model("Policy", policySchema)

