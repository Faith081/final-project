const Notification = require("../models/notification_model")

const createNotification = async ({ userId, message, type = "claim", relatedClaim = null }) => {
  const notification = await Notification.create({
    user: userId,
    message,
    type,
    relatedClaim
  })

  return notification
}

const getNotificationsByUser = async (userId) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 })
}

module.exports = { createNotification, getNotificationsByUser }
