const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });
    return response;
  } catch (error) {
    console.error('Erreur Twilio:', error);
    throw error;
  }
};

module.exports = {
  twilioClient,
  sendWhatsAppMessage
}; 