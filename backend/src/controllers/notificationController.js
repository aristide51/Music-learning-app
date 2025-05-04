const Notification = require('../models/Notification');

const notificationController = {
  // Créer une nouvelle notification
  async create(req, res) {
    try {
      const notification = await Notification.create(req.body);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Récupérer toutes les notifications d'un utilisateur
  async findByUser(req, res) {
    try {
      const notifications = await Notification.find({ user_id: req.params.userId })
        .sort({ createdAt: -1 });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Récupérer les notifications non lues d'un utilisateur
  async findUnreadByUser(req, res) {
    try {
      const notifications = await Notification.find({
        user_id: req.params.userId,
        is_read: false
      }).sort({ createdAt: -1 });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Marquer une notification comme lue
  async markAsRead(req, res) {
    try {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { is_read: true },
        { new: true }
      );
      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead(req, res) {
    try {
      await Notification.updateMany(
        { user_id: req.params.userId, is_read: false },
        { is_read: true }
      );
      res.json({ message: 'Toutes les notifications ont été marquées comme lues' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Supprimer une notification
  async delete(req, res) {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.json({ message: 'Notification supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Supprimer toutes les notifications d'un utilisateur
  async deleteAllByUser(req, res) {
    try {
      await Notification.deleteMany({ user_id: req.params.userId });
      res.json({ message: 'Toutes les notifications ont été supprimées' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = notificationController; 