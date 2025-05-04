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

module.exports = router; 