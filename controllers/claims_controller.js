const { createClaim, getAllClaims, updateUserClaim, getClaimsByUser } = require("../services/claim_services")
const { getNotificationsByUser } = require("../services/notification_message_service")


const userClaims = async (req, res) => {
    try {

        const userId = req.user.id
        const { policyId, amount, description } = req.body

        const file = req.file ? req.file.path : null

        console.log("File received:", req.file);
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        const claim = await createClaim(
            userId,
            policyId,
            amount,
            description,
            file
        )




        res.status(201).json({
            success: true,
            message: "claim Submitted Sucessfully",
            data: claim
        })

    } catch (error) {
        if (error.message.includes("file too large")) {
            return res.status(400).json({ message: "File is too large (max 2MB)" })
        }
        res.status(400).json({ mesage: error.message })
    }
}


const getAllUserClaims = async (req, res) => {
    try {

        const claims = await getAllClaims()

        res.status(200).json({
            success: true,
            message: "retrieved successfully",
            data: claims
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const claimUpdate = async (req, res) => {
    try {

        const { status } = req.body

        const claim = await updateUserClaim(req.params.id, status)

        res.json({
            message: `Claim ${status}`,
            claim,
        });


    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const userGetClaims = async (req, res) => {
    try {
        console.log(req.user)
        const userId = req.user.id
        console.log(req.user.id)

        const claims = await getClaimsByUser(userId)

        res.status(200).json({
            success: true,
            message: "successfuuly retrieved",
            data: claims
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user.id
        const notifications = await getNotificationsByUser(userId)

        res.status(200).json({
            success: true,
            data: notifications
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { userClaims, getAllUserClaims, claimUpdate, userGetClaims, getUserNotifications }