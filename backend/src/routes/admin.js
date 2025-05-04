const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth');
const { User, Course, Payment } = require('../models');
const { Op } = require('sequelize');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

// Récupérer tous les utilisateurs
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('🔍 Tentative de récupération des utilisateurs...');
    console.log('👤 Utilisateur connecté:', {
      userId: req.user.id,
      role: req.user.role
    });

    console.log('📝 Requête SQL en cours...');
    const users = await User.findAll({
      attributes: [
        'id',
        'username',
        'email',
        'role',
        'isAdmin',
        'createdAt'
      ],
      order: [['createdAt', 'DESC']]
    });
    console.log('✅ Requête SQL terminée');

    console.log('✅ Utilisateurs récupérés avec succès:', users.length);
    console.log('📊 Données des utilisateurs:', users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    })));
    
    // Transformation des données pour le frontend
    const formattedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    }));

    console.log('✅ Données formatées pour le frontend');
    res.json(formattedUsers);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error);
    console.error('Stack trace:', error.stack);
    console.error('Détails de l\'erreur:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    res.status(500).json({
      message: 'Erreur lors de la récupération des utilisateurs',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Récupérer un utilisateur spécifique
router.get('/users/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
});

// Mettre à jour un utilisateur
router.put('/users/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
});

// Supprimer un utilisateur
router.delete('/users/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

// Récupérer les statistiques
router.get('/stats', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('📊 Récupération des statistiques...');
    
    // Récupérer le nombre total d'utilisateurs
    const totalUsers = await User.count();
    
    // Récupérer le nombre total de cours
    const totalCourses = await Course.count();
    
    // Récupérer le nombre total de paiements
    const totalPayments = await Payment.count();
    
    // Récupérer les paiements récents
    const recentPayments = await Payment.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Course,
          as: 'course',
          attributes: ['title']
        }
      ]
    });

    // Formater les paiements récents
    const formattedPayments = recentPayments.map(payment => ({
      id: payment.id,
      user: payment.user.username,
      course: payment.course.title,
      amount: payment.amount,
      date: payment.createdAt,
      isUnlocked: payment.is_unlocked
    }));

    const stats = {
      totalUsers,
      totalCourses,
      totalPayments,
      recentPayments: formattedPayments
    };

    console.log('✅ Statistiques récupérées avec succès');
    res.json(stats);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des statistiques',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Routes pour la gestion des cours
router.get('/courses', authMiddleware, isAdmin, async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'instructor',
          attributes: ['username']
        }
      ]
    });
    res.json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
  }
});

router.post('/courses', authMiddleware, isAdmin, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(500).json({ message: 'Erreur lors de la création du cours' });
  }
});

router.put('/courses/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du cours:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
  }
});

router.delete('/courses/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    await course.destroy();
    res.json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du cours:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
  }
});

// Routes pour la gestion des paiements
router.get('/payments', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('🔍 Tentative de récupération des paiements...');
    console.log('👤 Utilisateur connecté:', {
      userId: req.user.id,
      role: req.user.role
    });

    console.log('📝 Requête SQL en cours...');
    const payments = await Payment.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Course,
          as: 'course',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    console.log('✅ Requête SQL terminée');

    console.log('✅ Paiements récupérés avec succès:', payments.length);
    console.log('📊 Données des paiements:', payments.map(payment => ({
      id: payment.id,
      userId: payment.user_id,
      courseId: payment.course_id,
      amount: payment.amount,
      status: payment.status,
      isUnlocked: payment.is_unlocked
    })));

    res.json(payments);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des paiements:', error);
    console.error('Stack trace:', error.stack);
    console.error('Détails de l\'erreur:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    res.status(500).json({
      message: 'Erreur lors de la récupération des paiements',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.put('/payments/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('🔍 Tentative de mise à jour du paiement:', req.params.id);
    console.log('📝 Données de mise à jour:', req.body);
    console.log('👤 Utilisateur connecté:', {
      userId: req.user.id,
      role: req.user.role
    });

    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      console.log('❌ Paiement non trouvé:', req.params.id);
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    console.log('📝 Mise à jour du paiement en cours...');
    await payment.update(req.body);
    console.log('✅ Paiement mis à jour avec succès');

    // Récupérer le paiement mis à jour avec les relations
    const updatedPayment = await Payment.findByPk(payment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username']
        },
        {
          model: Course,
          as: 'course',
          attributes: ['title']
        }
      ]
    });

    console.log('📊 Données du paiement mis à jour:', {
      id: updatedPayment.id,
      userId: updatedPayment.user_id,
      courseId: updatedPayment.course_id,
      amount: updatedPayment.amount,
      status: updatedPayment.status,
      isUnlocked: updatedPayment.is_unlocked
    });

    res.json(updatedPayment);
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du paiement:', error);
    console.error('Stack trace:', error.stack);
    console.error('Détails de l\'erreur:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    res.status(500).json({
      message: 'Erreur lors de la mise à jour du paiement',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route pour l'export des paiements en CSV
router.get('/payments/export', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('📊 Exportation des paiements en CSV...');
    
    const payments = await Payment.findAll({
      include: [
        { 
          model: User,
          as: 'user',
          attributes: ['username', 'email']
        },
        { 
          model: Course,
          as: 'course',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log(`✅ ${payments.length} paiements récupérés pour l'export`);

    const fields = [
      'id',
      'amount',
      'status',
      'payment_method',
      'createdAt',
      'user.username',
      'user.email',
      'course.title'
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(payments);

    res.header('Content-Type', 'text/csv');
    res.attachment('paiements.csv');
    return res.send(csv);
  } catch (error) {
    console.error('❌ Erreur lors de l\'export des paiements:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Erreur lors de l\'export des paiements',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route pour la génération du rapport PDF
router.get('/payments/report', authMiddleware, isAdmin, async (req, res) => {
  try {
    console.log('📊 Génération du rapport PDF...');
    
    const payments = await Payment.findAll({
      include: [
        { 
          model: User,
          as: 'user',
          attributes: ['username', 'email']
        },
        { 
          model: Course,
          as: 'course',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log(`✅ ${payments.length} paiements récupérés`);

    const doc = new PDFDocument();
    res.header('Content-Type', 'application/pdf');
    res.attachment('rapport_paiements.pdf');
    doc.pipe(res);

    // En-tête du rapport
    doc.fontSize(20).text('Rapport des Paiements', { align: 'center' });
    doc.moveDown();

    // Statistiques
    const totalAmount = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const completedPayments = payments.filter(p => p.status === 'completed').length;
    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const failedPayments = payments.filter(p => p.status === 'failed').length;

    doc.fontSize(14).text('Statistiques', { underline: true });
    doc.fontSize(12)
      .text(`Nombre total de paiements: ${payments.length}`)
      .text(`Montant total: ${totalAmount.toFixed(2)} FCFA`)
      .text(`Paiements complétés: ${completedPayments}`)
      .text(`Paiements en attente: ${pendingPayments}`)
      .text(`Paiements échoués: ${failedPayments}`);
    doc.moveDown();

    // Liste des paiements
    doc.fontSize(14).text('Détail des Paiements', { underline: true });
    payments.forEach(payment => {
      doc.fontSize(10)
        .text(`ID: ${payment.id}`)
        .text(`Utilisateur: ${payment.user.username} (${payment.user.email})`)
        .text(`Cours: ${payment.course.title}`)
        .text(`Montant: ${payment.amount} FCFA`)
        .text(`Statut: ${payment.status}`)
        .text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`)
        .moveDown();
    });

    console.log('✅ Rapport PDF généré avec succès');
    doc.end();
  } catch (error) {
    console.error('❌ Erreur lors de la génération du rapport:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Erreur lors de la génération du rapport',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router; 