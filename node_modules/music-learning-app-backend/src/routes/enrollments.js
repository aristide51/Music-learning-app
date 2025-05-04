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

// Liste des cours de l'utilisateur
router.get('/my-courses', (req, res) => {
  res.json({ message: 'Liste des cours de l\'utilisateur' });
});

// Annuler une inscription
router.delete('/:id', (req, res) => {
  res.json({ message: `Inscription ${req.params.id} annulée` });
});

module.exports = router; 