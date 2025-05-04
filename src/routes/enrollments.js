const express = require('express');
const router = express.Router();

// Liste des inscriptions d'un utilisateur
router.get('/user/:userId', (req, res) => {
  res.json({ message: `Inscriptions de l'utilisateur ${req.params.userId}` });
});

// S'inscrire à un cours
router.post('/course/:courseId', (req, res) => {
  res.json({ message: `Inscription au cours ${req.params.courseId}` });
});

module.exports = router; 