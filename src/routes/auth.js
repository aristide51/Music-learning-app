const express = require('express');
const router = express.Router();

// Inscription
router.post('/register', (req, res) => {
  res.json({ message: 'Inscription utilisateur' });
});

// Connexion
router.post('/login', (req, res) => {
  res.json({ message: 'Connexion utilisateur' });
});

// Déconnexion
router.post('/logout', (req, res) => {
  res.json({ message: 'Déconnexion utilisateur' });
});

module.exports = router; 