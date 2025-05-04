const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// Créer un nouveau paiement
router.post('/', auth, paymentController.createPayment);

// Confirmer un paiement (route protégée pour l'administrateur)
router.post('/:paymentId/confirm', auth, paymentController.confirmPayment);

// Obtenir les détails d'un paiement
router.get('/:paymentId', auth, paymentController.getPaymentDetails);

module.exports = router; 