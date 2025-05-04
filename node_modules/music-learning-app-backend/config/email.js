const nodemailer = require('nodemailer');

// Configuration du transporteur d'email (utilise Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendConfirmationEmail = async (to, paymentDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: 'Confirmation de paiement - Music Learning App',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4CAF50;">Paiement confirmé !</h2>
          <p>Bonjour,</p>
          <p>Votre paiement a été confirmé avec succès.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
            <p><strong>Cours:</strong> ${paymentDetails.course.title}</p>
            <p><strong>Montant:</strong> ${paymentDetails.amount} FCFA</p>
          </div>
          <p>Votre cours est maintenant débloqué. Vous pouvez y accéder depuis votre espace personnel.</p>
          <p>Merci de votre confiance !</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

module.exports = {
  sendConfirmationEmail
}; 