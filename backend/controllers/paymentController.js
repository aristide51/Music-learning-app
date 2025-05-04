const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Créer un nouveau paiement
exports.createPayment = async (req, res) => {
  try {
    const {
      courseId,
      amount,
      firstName,
      lastName,
      email,
      whatsapp
    } = req.body;

    // Vérifier si le cours existe
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }

    // Vérifier si le montant correspond au prix du cours
    if (amount !== course.price) {
      return res.status(400).json({ message: 'Le montant ne correspond pas au prix du cours' });
    }

    // Créer le paiement
    const payment = new Payment({
      userId: req.user._id,
      courseId,
      amount,
      firstName,
      lastName,
      email,
      whatsapp,
      transactionId: uuidv4(),
      status: 'pending'
    });

    await payment.save();

    // Retourner les informations nécessaires pour le paiement
    res.status(201).json({
      message: 'Paiement en attente de confirmation',
      paymentId: payment._id,
      transactionId: payment.transactionId,
      paymentDetails: {
        amount: amount,
        whatsapp: whatsapp,
        courseTitle: course.title
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    res.status(500).json({ message: 'Erreur lors de la création du paiement' });
  }
};

// Confirmer un paiement (à appeler manuellement après réception du paiement)
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    // Mettre à jour le statut du paiement
    payment.status = 'completed';
    await payment.save();

    // Débloquer le cours pour l'utilisateur
    await User.findByIdAndUpdate(payment.userId, {
      $addToSet: { enrolledCourses: payment.courseId }
    });

    // Retourner les informations pour le message WhatsApp
    const course = await Course.findById(payment.courseId);
    res.json({
      message: 'Paiement confirmé avec succès',
      whatsappInfo: {
        number: payment.whatsapp,
        message: `🎵 *Confirmation de paiement - Music Learning App* 🎵\n\n` +
          `Bonjour ${payment.firstName},\n\n` +
          `Votre paiement a été confirmé avec succès !\n\n` +
          `📝 *Détails de la transaction :*\n` +
          `• Transaction ID: ${payment.transactionId}\n` +
          `• Cours: ${course.title}\n` +
          `• Montant: ${payment.amount} FCFA\n\n` +
          `✅ Votre cours est maintenant débloqué !\n` +
          `Vous pouvez y accéder depuis votre espace personnel.\n\n` +
          `Merci de votre confiance ! 🎸`
      }
    });
  } catch (error) {
    console.error('Erreur lors de la confirmation du paiement:', error);
    res.status(500).json({ message: 'Erreur lors de la confirmation du paiement' });
  }
};

// Obtenir les détails d'un paiement
exports.getPaymentDetails = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .populate('courseId', 'title')
      .populate('userId', 'firstName lastName');

    if (!payment) {
      return res.status(404).json({ message: 'Paiement non trouvé' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du paiement:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des détails du paiement' });
  }
}; 