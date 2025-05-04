import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_BASE_URL } from '../config';
import { motion } from 'framer-motion';

function AdminDashboard() {
  const { isAdmin, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalPayments: 0,
    recentPayments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Vérifier si l'utilisateur est admin
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        console.log('Tentative de récupération des statistiques...');
        console.log('Token présent:', !!token);
        
        if (!token) {
          throw new Error('Token d\'authentification manquant');
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        console.log('Statut de la réponse:', response.status);
        console.log('Headers de la réponse:', Object.fromEntries(response.headers.entries()));
        
        // Lire le texte brut de la réponse
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);

        if (!response.ok) {
          let errorMessage = 'Erreur lors de la récupération des statistiques';
          try {
            const errorData = JSON.parse(responseText);
            console.error('Erreur API parsée:', errorData);
            errorMessage = errorData.message || errorMessage;
            if (errorData.details) {
              console.error('Détails de l\'erreur:', errorData.details);
              errorMessage += ` - ${errorData.details}`;
            }
          } catch (parseError) {
            console.error('Erreur lors du parsing de la réponse:', parseError);
            console.error('Réponse brute non parsable:', responseText);
          }
          throw new Error(errorMessage);
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Erreur lors du parsing des données:', parseError);
          console.error('Réponse brute:', responseText);
          throw new Error('Format de réponse invalide');
        }

        console.log('Données reçues:', data);
        
        if (!data || typeof data !== 'object') {
          throw new Error('Format de données invalide');
        }

        setStats(data);
      } catch (err) {
        console.error('Erreur complète:', err);
        console.error('Stack trace:', err.stack);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [isAdmin, navigate, token]);

  const handleUnlockCourse = async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/unlock-course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentId })
      });

      if (!response.ok) {
        throw new Error('Erreur lors du déblocage du cours');
      }

      // Rafraîchir les statistiques après le déblocage
      const updatedStats = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());

      setStats(updatedStats);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Accès non autorisé</h2>
        <p className="mt-2 text-gray-600">Seul un administrateur peut accéder à cette page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Erreur</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900">Tableau de bord administrateur</h1>
          <div className="flex space-x-4">
            <Link to="/admin/courses" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Gérer les cours
            </Link>
            <Link to="/admin/users" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Gérer les utilisateurs
            </Link>
            <Link to="/admin/payments" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Gérer les paiements
            </Link>
          </div>
        </motion.div>

        {/* Statistiques */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Total Utilisateurs', value: stats.totalUsers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { title: 'Total Cours', value: stats.totalCourses, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
            { title: 'Total Paiements', value: stats.totalPayments, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                      <dd className="text-3xl font-bold text-gray-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paiements récents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Paiements récents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentPayments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {!payment.isUnlocked && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUnlockCourse(payment.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Débloquer
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard; 