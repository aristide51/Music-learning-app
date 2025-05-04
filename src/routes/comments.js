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

module.exports = router; 