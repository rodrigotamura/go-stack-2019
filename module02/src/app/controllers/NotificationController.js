import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  /**
   * This Notification is used only by providers
   */
  async index(req, res) {
    // checking if user is a provider
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkIsProvider) {
      return res
        .status(400)
        .json({ error: 'Only providers can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // setting notification as READ
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // returning into notification var the new content
    );

    return res.json(notification);
  }
}

export default new NotificationController();
