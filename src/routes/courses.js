const express = require('express');
const router = express.Router();

// Liste tous les cours
router.get('/', (req, res) => {
  res.json({ message: 'Liste des cours' });
});

// Détails d'un cours
router.get('/:id', (req, res) => {
  res.json({ message: `Détails du cours ${req.params.id}` });
});

module.exports = router; 