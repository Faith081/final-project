const mongoose = require("mongoose")

const userClaimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  receipt: {
    type: String
  }
},

  {
    timestamps: true
  }

)


module.exports = mongoose.model("Claim", userClaimSchema)

