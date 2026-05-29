const mongoose = require("mongoose")
const {UserModel} = require("../models/model_user")



const planSchema = new mongoose.Schema({
     name:{
        type:String,
        required: true
     },
     description: String,
     coverage: String,
     plan : String,
     duration : String,
     price:{
        type:Number,
        required:true
     },
     createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "UserModel",
     },
},

{
    timestamps : true
}
)


module.exports = mongoose.model("Plan", planSchema)
