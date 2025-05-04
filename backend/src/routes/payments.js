const express = require('express');
const router = express.Router();

// Route de test pour les paiements
router.get('/', (req, res) => {
  res.json({ message: 'Route des paiements (test)' });
});

module.exports = router;