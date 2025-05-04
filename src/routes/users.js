const express = require('express');
const router = express.Router();

// Profil utilisateur
router.get('/profile', (req, res) => {
  res.json({ message: 'Profil utilisateur' });
});

// Mise à jour du profil
router.put('/profile', (req, res) => {
  res.json({ message: 'Mise à jour du profil' });
});

module.exports = router; 