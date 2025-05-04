const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { Course, User, Lesson } = require('../models');

// Récupérer tous les cours
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'username']
        },
        {
          model: Lesson,
          attributes: ['id', 'title', 'duration']
        }
      ]
    });
    res.json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
  }
});

// Récupérer un cours par ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['id', 'username']
        },
        {
          model: Lesson,
          attributes: ['id', 'title', 'duration', 'order']
        }
      ]
    });
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du cours' });
  }
});

// Créer un nouveau cours
router.post('/', authMiddleware, async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructorId: req.user.id
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(400).json({ message: 'Erreur lors de la création du cours' });
  }
});

// Mettre à jour un cours
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du cours' });
  }
});

// Supprimer un cours
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    // Supprimer également toutes les leçons associées
    await Lesson.destroy({ where: { courseId: req.params.id } });
    await course.destroy();

    res.json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
  }
});

// S'inscrire à un cours
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    // Vérifier si l'utilisateur est déjà inscrit
    const isEnrolled = await course.hasUser(req.user.id);
    if (isEnrolled) {
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à ce cours' });
    }

    // Ajouter l'utilisateur au cours
    await course.addUser(req.user.id);

    res.json({ message: 'Inscription au cours réussie' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription au cours:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription au cours' });
  }
});

module.exports = router; 