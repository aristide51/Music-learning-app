import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`/api/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentDetails(data);
        } else {
          throw new Error('Erreur lors de la récupération des détails du paiement');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    if (paymentId) {
      fetchPaymentDetails();
    } else {
      navigate('/courses');
    }
  }, [paymentId, navigate]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!paymentDetails) {
    return <div className="text-center py-8">Détails de paiement non trouvés</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Paiement réussi !</h1>
        <p className="text-gray-600 mt-2">Merci pour votre achat</p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Détails de la transaction</h2>
        <dl className="space-y-4">
          <div className="flex justify-between">
            <dt className="text-gray-600">Numéro de transaction</dt>
            <dd className="text-gray-900">{paymentDetails.transactionId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Cours</dt>
            <dd className="text-gray-900">{paymentDetails.course.title}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Montant</dt>
            <dd className="text-gray-900">{paymentDetails.amount} FCFA</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Date</dt>
            <dd className="text-gray-900">{new Date(paymentDetails.date).toLocaleDateString()}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/courses')}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Retour aux cours
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation; 