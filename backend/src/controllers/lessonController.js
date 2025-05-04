const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const lessonController = {
  // Créer une nouvelle leçon
  async create(req, res) {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      const lessonId = await Lesson.create({
        course_id: req.params.courseId,
        ...req.body
      });

      res.status(201).json({
        message: 'Leçon créée avec succès',
        lessonId
      });
    } catch (error) {
      console.error('Erreur lors de la création de la leçon:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la leçon' });
    }
  },

  // Récupérer une leçon
  async getById(req, res) {
    try {
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: 'Leçon non trouvée' });
      }

      // Vérifier si l'utilisateur est inscrit au cours
      const enrollment = await Enrollment.checkEnrollment(req.user.userId, lesson.course_id);
      if (!enrollment) {
        return res.status(403).json({ message: 'Vous devez être inscrit à ce cours' });
      }

      res.json(lesson);
    } catch (error) {
      console.error('Erreur lors de la récupération de la leçon:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la leçon' });
    }
  },

  // Mettre à jour une leçon
  async update(req, res) {
    try {
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: 'Leçon non trouvée' });
      }

      const course = await Course.findById(lesson.course_id);
      if (course.instructor_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await Lesson.update(req.params.id, req.body);
      res.json({ message: 'Leçon mise à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la leçon:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la leçon' });
    }
  },

  // Supprimer une leçon
  async delete(req, res) {
    try {
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: 'Leçon non trouvée' });
      }

      const course = await Course.findById(lesson.course_id);
      if (course.instructor_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await Lesson.delete(req.params.id);
      res.json({ message: 'Leçon supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la leçon:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de la leçon' });
    }
  },

  // Mettre à jour l'ordre des leçons
  async updateOrder(req, res) {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.userId) {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await Lesson.updateOrder(req.params.courseId, req.body.lessons);
      res.json({ message: 'Ordre des leçons mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'ordre des leçons:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'ordre des leçons' });
    }
  },

  // Marquer une leçon comme terminée
  async markAsCompleted(req, res) {
    try {
      const lesson = await Lesson.findById(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: 'Leçon non trouvée' });
      }

      // Vérifier si l'utilisateur est inscrit au cours
      const enrollment = await Enrollment.checkEnrollment(req.user.userId, lesson.course_id);
      if (!enrollment) {
        return res.status(403).json({ message: 'Vous devez être inscrit à ce cours' });
      }

      await Progress.markLessonCompleted(req.user.userId, req.params.id);
      res.json({ message: 'Leçon marquée comme terminée' });
    } catch (error) {
      console.error('Erreur lors du marquage de la leçon comme terminée:', error);
      res.status(500).json({ message: 'Erreur lors du marquage de la leçon comme terminée' });
    }
  },

  // Récupérer la progression d'un cours
  async getCourseProgress(req, res) {
    try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      // Vérifier si l'utilisateur est inscrit au cours
      const enrollment = await Enrollment.checkEnrollment(req.user.userId, course.id);
      if (!enrollment) {
        return res.status(403).json({ message: 'Vous devez être inscrit à ce cours' });
      }

      const progress = await Progress.getCourseProgress(req.user.userId, req.params.courseId);
      res.json(progress);
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la progression' });
    }
  },

  // Récupérer la progression globale
  async getOverallProgress(req, res) {
    try {
      const progress = await Progress.getOverallProgress(req.user.userId);
      res.json(progress);
    } catch (error) {
      console.error('Erreur lors de la récupération de la progression globale:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de la progression globale' });
    }
  }
};

module.exports = lessonController; 