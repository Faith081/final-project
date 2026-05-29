const Joi = require("joi")
const  planSchema = require("../models/planModel")
const policySchema = require("../models/policy_model")

const  buyPolicyPlan = async (userId, planId) =>{
       
    const plan = await planSchema.findById(planId)

    if(!plan){
      throw new Error("Plan not found")
    }

    // this code is getting the current year and adding 1 year to the curent year
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);



const policy = await policySchema.create({
    user : userId,
    plan : planId,
    endDate
}) 

return policy

}



const getPolicies = async (userId) =>{
    const policy = await policySchema.find({user: userId})
    .populate("plan")
    return policy
}

module.exports = {buyPolicyPlan, getPolicies}