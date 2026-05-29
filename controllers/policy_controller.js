const {buyPolicyPlan, getPolicies} = require("../services/policy_services")

const policyPlan = async (req, res) =>{
    try {
      
     const userId = req.user.id
     console.log("USER:", req.user);
    const {planId} = req.body
    const policy = await buyPolicyPlan(userId, planId)

    res.status(201).json({
        success : true,
        message : "Plan Purchased Sucessfully",
        data : policy
    })

    } catch (error) {
        res.status(400).json({message:error.message})
    }
   
}


const getUserPolicies = async (req, res) =>{
    try {

        const userId = req.user.id
        const policies = await getPolicies(userId)

        res.status(200).json({
            success : true,
            message: "policies retrieved sucessfully",
            data : policies
        })


    } catch (error) {
         res.status(500).json({ message: error.message });

    }
}


module.exports = {policyPlan, getUserPolicies}