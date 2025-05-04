const express = require('express');
const router = express.Router();

// Liste des leçons d'un cours
router.get('/course/:courseId', (req, res) => {
  res.json({ message: `Leçons du cours ${req.params.courseId}` });
});

// Détails d'une leçon
router.get('/:id', (req, res) => {
  res.json({ message: `Détails de la leçon ${req.params.id}` });
});

// Créer une leçon
router.post('/course/:courseId', (req, res) => {
  res.json({ message: `Nouvelle leçon créée pour le cours ${req.params.courseId}` });
});

// Mettre à jour une leçon
router.put('/:id', (req, res) => {
  res.json({ message: `Leçon ${req.params.id} mise à jour` });
});

// Supprimer une leçon
router.delete('/:id', (req, res) => {
  res.json({ message: `Leçon ${req.params.id} supprimée` });
});

module.exports = router; 