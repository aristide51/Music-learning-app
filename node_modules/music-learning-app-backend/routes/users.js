const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { User, Course, Lesson } = require('../models');

// Récupérer le profil de l'utilisateur connecté
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Course,
          as: 'courses',
          attributes: ['id', 'title', 'category'],
          through: { attributes: [] }
        }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
});

// Mettre à jour le profil de l'utilisateur
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Mise à jour non autorisée' });
    }

    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
});

// Récupérer les cours de l'utilisateur
router.get('/me/courses', authMiddleware, async (req, res) => {
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
      ],
      where: {
        '$UserCourses.UserId$': req.user.id
      }
    });
    
    res.json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
  }
});

// Mettre à jour la progression d'une leçon
router.post('/me/progress/:courseId/:lessonId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courseProgress = user.progress.find(p => p.courseId.toString() === req.params.courseId);

    if (!courseProgress) {
      user.progress.push({
        courseId: req.params.courseId,
        completedLessons: [req.params.lessonId],
        score: 0
      });
    } else if (!courseProgress.completedLessons.includes(req.params.lessonId)) {
      courseProgress.completedLessons.push(req.params.lessonId);
    }

    await user.save();
    res.json({ message: 'Progression mise à jour' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la progression' });
  }
});

// Récupérer tous les utilisateurs (admin uniquement)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

module.exports = router; 