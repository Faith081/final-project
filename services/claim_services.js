const policySchema = require("../models/policy_model")
const userClaimSchema = require("../models/claims_model")
const { sendEmail } = require("./notification_services")
const { createNotification } = require("./notification_message_service")


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


    const claims = await userClaimSchema.findById(claimId).populate("user", "name email")

    if (!claims) {
        throw new Error("claim not Found")
    }

    claims.status = status

    await claims.save()

    if (status === "approved" && claims.user?.email) {
        try {
            await createNotification({
                userId: claims.user._id,
                message: `Your claim has been approved.`,
                type: "claim",
                relatedClaim: claims._id
            })

            await sendEmail(
                claims.user.email,
                "Claim approved",
                `Hello ${claims.user.name || "there"}, your claim has been approved. Please check your account for details.`
            )
        } catch (emailError) {
            console.error("Failed to send claim approval email:", emailError)
        }
    }

    return claims


}




const getClaimsByUser = async (userId) => {
    const claim = await userClaimSchema.find({ user: userId })
        .populate("policy")

    return claim
}

module.exports = { createClaim, getAllClaims, updateUserClaim, getClaimsByUser }