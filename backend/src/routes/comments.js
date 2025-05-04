const express = require('express');
const router = express.Router();

// Liste des commentaires d'un cours
router.get('/course/:courseId', (req, res) => {
  res.json({ message: `Commentaires du cours ${req.params.courseId}` });
});

// Ajouter un commentaire
router.post('/', (req, res) => {
  res.json({ message: 'Nouveau commentaire ajouté' });
});

// Mettre à jour un commentaire
router.put('/:id', (req, res) => {
  res.json({ message: `Commentaire ${req.params.id} mis à jour` });
});

// Supprimer un commentaire
router.delete('/:id', (req, res) => {
  res.json({ message: `Commentaire ${req.params.id} supprimé` });
});

module.exports = router; 