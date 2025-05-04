const express = require('express');
const router = express.Router();

// Liste des cours
router.get('/', (req, res) => {
  res.json({ message: 'Liste des cours' });
});

// Détails d'un cours
router.get('/:id', (req, res) => {
  res.json({ message: `Détails du cours ${req.params.id}` });
});

// Leçons d'un cours
router.get('/:id/lessons', (req, res) => {
  res.json({ message: `Leçons du cours ${req.params.id}` });
});

// Créer un cours
router.post('/', (req, res) => {
  res.json({ message: 'Nouveau cours créé' });
});

// Mettre à jour un cours
router.put('/:id', (req, res) => {
  res.json({ message: `Cours ${req.params.id} mis à jour` });
});

// Supprimer un cours
router.delete('/:id', (req, res) => {
  res.json({ message: `Cours ${req.params.id} supprimé` });
});

module.exports = router; 