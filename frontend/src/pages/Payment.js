import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    courseId: course?.id || '',
    amount: course?.price || 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod: 'orange_money'
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Envoyer un message WhatsApp de confirmation
        await sendWhatsAppConfirmation(formData.whatsapp, data.transactionId);
        // Rediriger vers la page de confirmation
        navigate('/payment-confirmation', { state: { paymentId: data.paymentId } });
      } else {
        throw new Error('Erreur lors du paiement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Une erreur est survenue lors du paiement. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsAppConfirmation = async (whatsappNumber, transactionId) => {
    try {
      await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: whatsappNumber,
          message: `Votre paiement a été confirmé ! Transaction ID: ${transactionId}. Votre cours est maintenant débloqué.`
        })
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!course) {
    return <div className="text-center py-8">Cours non trouvé</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paiement pour {course.title}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro WhatsApp</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            placeholder="+225 07XXXXXXXX"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Détails du cours</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Cours: {course.title}</p>
            <p className="text-gray-600">Prix: {course.price} FCFA</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Traitement en cours...' : 'Effectuer le transfert d\'argent'}
        </button>
      </form>
    </div>
  );
};

export default Payment; 