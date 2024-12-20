import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ user: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ user: userId }, { read: true });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong in getNotificationsController" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ user: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong in deleteNotificationsController",
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;
    const notification = await Notification.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this notification" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong in deleteNotification Controller",
    });
  }
};
