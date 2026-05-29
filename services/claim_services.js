const policySchema = require("../models/policy_model")
const userClaimSchema = require("../models/claims_model")


const createClaim = async (userId, policyId, amount, description, file) => {
    const policy = await policySchema.findById(policyId)

    if (!policy) {
        throw new Error("ploicy not found")
    }
    const claims = await userClaimSchema.create({
        user: userId,
        policy: policyId,
        amount,
        description,
        receipt: file
    })



    return claims
}



const getAllClaims = async () => {
    const claims = await userClaimSchema.find()
        .populate("user", "name email")
        .populate("policy")

    return claims
}




const updateUserClaim = async (claimId, status) => {

    if (!["approved", "rejected"].includes(status)) {
        throw new Error("invalid Status")
    }


    const claims = await userClaimSchema.findById(claimId)

    if (!claims) {
        throw new Error("claim not Found")
    }

    claims.status = status

    await claims.save()
    return claims


}




const getClaimsByUser = async (userId) => {
    const claim = await userClaimSchema.find({ user: userId })
        .populate("policy")

    return claim
}

module.exports = { createClaim, getAllClaims, updateUserClaim, getClaimsByUser }