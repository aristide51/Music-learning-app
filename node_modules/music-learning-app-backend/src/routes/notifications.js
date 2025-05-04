const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(authMiddleware);

// Créer une nouvelle notification
router.post('/', notificationController.create);

// Récupérer toutes les notifications d'un utilisateur
router.get('/user/:userId', notificationController.findByUser);

// Récupérer les notifications non lues d'un utilisateur
router.get('/user/:userId/unread', notificationController.findUnreadByUser);

// Marquer une notification comme lue
router.put('/:id/read', notificationController.markAsRead);

// Marquer toutes les notifications comme lues
router.put('/user/:userId/read-all', notificationController.markAllAsRead);

// Supprimer une notification
router.delete('/:id', notificationController.delete);

// Supprimer toutes les notifications d'un utilisateur
router.delete('/user/:userId', notificationController.deleteAllByUser);

module.exports = router; 