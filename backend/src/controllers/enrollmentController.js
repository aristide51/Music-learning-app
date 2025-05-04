const { Enrollment, Payment, Course } = require('../models');
const { Op } = require('sequelize');
const User = require('../models/User');

const enrollmentController = {
  // S'inscrire à un cours
  async enroll(req, res) {
    try {
      console.log('📝 Tentative d\'inscription au cours...');
      const { course_id, payment_method, transaction_id } = req.body;
      const user_id = req.user.id;

      console.log('🔍 Vérification de l\'inscription existante...');
      // Vérifier si l'utilisateur est déjà inscrit
      const existingEnrollment = await Enrollment.findOne({
        where: {
          user_id,
          course_id
        }
      });

      if (existingEnrollment) {
        console.log('❌ L\'utilisateur est déjà inscrit à ce cours');
        return res.status(400).json({ message: 'Vous êtes déjà inscrit à ce cours' });
      }

      console.log('🔍 Récupération du cours...');
      // Récupérer le cours pour obtenir le prix
      const course = await Course.findByPk(course_id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      console.log('💰 Création du paiement...');
      // Créer le paiement
      const payment = await Payment.create({
        user_id,
        course_id,
        amount: course.price,
        payment_method,
        transaction_id,
        status: 'pending'
      });

      console.log('📝 Création de l\'inscription...');
      // Créer l'inscription
      const enrollment = await Enrollment.create({
        user_id,
        course_id,
        status: 'active'
      });

      console.log('✅ Inscription réussie');
      res.status(201).json({
        message: 'Inscription réussie',
        enrollment,
        payment
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        message: 'Erreur lors de l\'inscription',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Récupérer les cours d'un utilisateur
  async getUserCourses(req, res) {
    try {
      console.log('🔍 Récupération des cours de l\'utilisateur...');
      const enrollments = await Enrollment.findAll({
        where: { user_id: req.user.id },
        include: [
          {
            model: Course,
            as: 'course',
            include: [
              {
                model: User,
                as: 'instructor',
                attributes: ['username']
              }
            ]
          }
        ]
      });

      console.log(`✅ ${enrollments.length} cours récupérés`);
      res.json(enrollments);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des cours:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
    }
  },

  // Récupérer les étudiants d'un cours (pour les instructeurs)
  async getCourseStudents(req, res) {
    try {
      console.log('🔍 Récupération des étudiants du cours...');
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.id) {
        console.log('❌ Non autorisé');
        return res.status(403).json({ message: 'Non autorisé' });
      }

      const students = await Enrollment.findAll({
        where: { course_id: req.params.id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email']
          }
        ]
      });

      console.log(`✅ ${students.length} étudiants récupérés`);
      res.json(students);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des étudiants:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des étudiants' });
    }
  },

  // Annuler une inscription
  async cancelEnrollment(req, res) {
    try {
      console.log('🔍 Tentative d\'annulation de l\'inscription...');
      const enrollment = await Enrollment.findOne({
        where: {
          user_id: req.user.id,
          course_id: req.params.id
        }
      });

      if (!enrollment) {
        console.log('❌ Inscription non trouvée');
        return res.status(404).json({ message: 'Inscription non trouvée' });
      }

      await enrollment.update({ status: 'inactive' });
      console.log('✅ Inscription annulée avec succès');
      res.json({ message: 'Inscription annulée avec succès' });
    } catch (error) {
      console.error('❌ Erreur lors de l\'annulation de l\'inscription:', error);
      res.status(500).json({ message: 'Erreur lors de l\'annulation de l\'inscription' });
    }
  },

  // Vérifier le statut d'un paiement
  async checkPaymentStatus(req, res) {
    try {
      console.log('🔍 Vérification du statut du paiement...');
      const payment = await Payment.findOne({
        where: { transaction_id: req.params.transactionId }
      });

      if (!payment) {
        console.log('❌ Paiement non trouvé');
        return res.status(404).json({ message: 'Paiement non trouvé' });
      }

      console.log('✅ Statut du paiement récupéré');
      res.json(payment);
    } catch (error) {
      console.error('❌ Erreur lors de la vérification du paiement:', error);
      res.status(500).json({ message: 'Erreur lors de la vérification du paiement' });
    }
  },

  // Récupérer l'historique des paiements d'un utilisateur
  async getPaymentHistory(req, res) {
    try {
      console.log('🔍 Récupération de l\'historique des paiements...');
      const payments = await Payment.findAll({
        where: { user_id: req.user.id },
        include: [
          {
            model: Course,
            as: 'course',
            attributes: ['title']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      console.log(`✅ ${payments.length} paiements récupérés`);
      res.json(payments);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l\'historique des paiements:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique des paiements' });
    }
  }
};

module.exports = enrollmentController; 