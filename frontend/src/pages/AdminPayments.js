import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

function AdminPayments() {
  const { isAdmin, token, user } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const fetchPayments = useCallback(async () => {
    try {
      console.log('Tentative de récupération des paiements...');
      console.log('URL:', `${API_BASE_URL}/api/admin/payments`);
      console.log('Token:', token ? 'Présent' : 'Absent');

      const response = await fetch(`${API_BASE_URL}/api/admin/payments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Statut de la réponse:', response.status);
      const responseText = await response.text();
      console.log('Réponse brute:', responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          console.error('Erreur API:', errorData);
          throw new Error(errorData.message || 'Erreur lors du chargement des paiements');
        } catch (e) {
          console.error('Erreur lors du parsing de la réponse:', e);
          throw new Error('Erreur lors du chargement des paiements');
        }
      }

      const data = JSON.parse(responseText);
      console.log('Paiements reçus:', data);
      setPayments(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    console.log('État de l\'authentification:', {
      isAdmin,
      token: token ? 'Présent' : 'Absent',
      user: user ? {
        id: user.id,
        email: user.email,
        role: user.role
      } : 'Non connecté'
    });

    if (!isAdmin) {
      console.log('Redirection - Utilisateur non admin');
      navigate('/');
      return;
    }

    fetchPayments();
  }, [isAdmin, navigate, token, user, fetchPayments]);

  const handleUnlockCourse = async (payment) => {
    if (payment.status !== 'completed') {
      setError('Le paiement doit être complété avant de débloquer le cours');
      return;
    }
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const confirmUnlock = async () => {
    try {
      console.log('Tentative de déblocage du cours...');
      const response = await fetch(`${API_BASE_URL}/api/admin/payments/${selectedPayment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isUnlocked: true
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors du déblocage du cours');
      }

      // Mettre à jour l'état local
      const updatedPayments = payments.map(p => 
        p.id === selectedPayment.id ? { ...p, isUnlocked: true } : p
      );
      setPayments(updatedPayments);
      setShowModal(false);
    } catch (err) {
      console.error('Erreur lors du déblocage:', err);
      setError(err.message);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/payments/export`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'exportation des paiements');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `paiements_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Erreur lors de l\'exportation:', err);
      setError(err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      setError(null);

      console.log('Tentative de génération du rapport...');
      const response = await fetch(`${API_BASE_URL}/api/admin/payments/report`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la génération du rapport');
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Le rapport généré est vide');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport_paiements_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log('Rapport généré avec succès');
    } catch (err) {
      console.error('Erreur lors de la génération du rapport:', err);
      setError(err.message || 'Une erreur est survenue lors de la génération du rapport');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleCancelPayment = async (payment) => {
    try {
      if (payment.status === 'completed') {
        setError('Impossible d\'annuler un paiement déjà complété');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/payments/${payment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'failed'
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'annulation du paiement');
      }

      // Mettre à jour l'état local
      const updatedPayments = payments.map(p => 
        p.id === payment.id ? { ...p, status: 'failed' } : p
      );
      setPayments(updatedPayments);
    } catch (err) {
      console.error('Erreur lors de l\'annulation:', err);
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des paiements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Erreur</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des paiements</h1>
          <div className="flex space-x-4">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ${
                isExporting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
            <button 
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className={`bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ${
                isGeneratingReport ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isGeneratingReport ? 'Génération...' : 'Générer rapport'}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Liste des paiements</h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="bg-white overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode de paiement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accès</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.User?.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.Course?.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount} FCFA</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'completed' ? 'Complété' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.paymentMethod || 'Orange Money'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.isUnlocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {payment.isUnlocked ? 'Débloqué' : 'Bloqué'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleUnlockCourse(payment)}
                            disabled={payment.isUnlocked || payment.status !== 'completed'}
                            className={`mr-3 ${
                              payment.isUnlocked || payment.status !== 'completed'
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-indigo-600 hover:text-indigo-900'
                            }`}
                          >
                            Débloquer
                          </button>
                          <button 
                            onClick={() => handleCancelPayment(payment)}
                            disabled={payment.status === 'completed'}
                            className={`${
                              payment.status === 'completed'
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:text-red-900'
                            }`}
                          >
                            Annuler
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer le déblocage</h3>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir débloquer le cours "{selectedPayment?.Course?.title}" pour {selectedPayment?.User?.username} ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmUnlock}
                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPayments; 