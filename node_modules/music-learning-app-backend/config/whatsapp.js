const axios = require('axios');

const sendWhatsAppMessage = async (to, message) => {
  try {
    // Formatage du numéro de téléphone (ajout du préfixe +225 si nécessaire)
    const formattedNumber = to.startsWith('+') ? to : `+225${to}`;

    // Envoi du message via l'API WhatsApp Business
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: formattedNumber,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
    throw error;
  }
};

module.exports = {
  sendWhatsAppMessage
}; 