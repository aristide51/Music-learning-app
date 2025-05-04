const Comment = require('../models/Comment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const commentController = {
  // Créer un commentaire
  async create(req, res) {
    try {
      const { course_id, content, rating } = req.body;
      const user_id = req.user.userId;

      // Vérifier si l'utilisateur est inscrit au cours
      const enrollment = await Enrollment.checkEnrollment(user_id, course_id);
      if (!enrollment) {
        return res.status(403).json({ message: 'Vous devez être inscrit à ce cours pour laisser un commentaire' });
      }

      // Vérifier si l'utilisateur a déjà commenté ce cours
      const existingComment = await Comment.checkUserComment(user_id, course_id);
      if (existingComment) {
        return res.status(400).json({ message: 'Vous avez déjà commenté ce cours' });
      }

      const commentId = await Comment.create({
        user_id,
        course_id,
        content,
        rating
      });

      res.status(201).json({
        message: 'Commentaire ajouté avec succès',
        commentId
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
    }
  },

  // Récupérer les commentaires d'un cours
  async getCourseComments(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      const comments = await Comment.findByCourse(req.params.id);
      const rating = await Comment.getCourseRating(req.params.id);

      res.json({
        comments,
        rating
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
    }
  },

  // Récupérer les commentaires d'un utilisateur
  async getUserComments(req, res) {
    try {
      const comments = await Comment.findByUser(req.user.userId);
      res.json(comments);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
    }
  },

  // Mettre à jour un commentaire
  async update(req, res) {
    try {
      const comment = await Comment.checkUserComment(req.user.userId, req.params.courseId);
      if (!comment) {
        return res.status(404).json({ message: 'Commentaire non trouvé' });
      }

      await Comment.update(comment.id, req.body);
      res.json({ message: 'Commentaire mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du commentaire' });
    }
  },

  // Supprimer un commentaire
  async delete(req, res) {
    try {
      const comment = await Comment.checkUserComment(req.user.userId, req.params.courseId);
      if (!comment) {
        return res.status(404).json({ message: 'Commentaire non trouvé' });
      }

      await Comment.delete(comment.id);
      res.json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression du commentaire' });
    }
  },

  // Récupérer les statistiques des évaluations d'un cours
  async getCourseRating(req, res) {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      const rating = await Comment.getCourseRating(req.params.id);
      res.json(rating);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des statistiques' });
    }
  }
};

module.exports = commentController; 