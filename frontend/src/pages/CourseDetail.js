import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('🔍 Tentative de récupération du cours...');
        console.log('ID du cours:', id);
        console.log('URL complète:', `${API_BASE_URL}/api/courses/${id}`);
        
        // Récupérer le token du localStorage
        const token = localStorage.getItem('token');
        console.log('Token présent:', !!token);

        // Vérifier si l'URL est correcte
        if (!id) {
          throw new Error('ID du cours manquant');
        }

        // Vérifier si l'URL de l'API est correcte
        if (!API_BASE_URL) {
          throw new Error('URL de l\'API non configurée');
        }

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };

        // Ajouter le token aux headers s'il existe
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/courses/${id}`, {
          method: 'GET',
          headers,
          credentials: 'include'
        });

        console.log('Statut de la réponse:', response.status);
        console.log('Headers de la réponse:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);

        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Données reçues:', data);
        } catch (e) {
          console.error('❌ Erreur lors du parsing JSON:', e);
          throw new Error('Réponse invalide du serveur');
        }

        if (!response.ok) {
          // Si le token est invalide ou expiré, rediriger vers la page de connexion
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login', { state: { from: `/courses/${id}` } });
            return;
          }
          throw new Error(data.message || 'Erreur lors de la récupération du cours');
        }

        if (!data.success) {
          throw new Error(data.message || 'Erreur lors de la récupération du cours');
        }

        if (!data.data) {
          throw new Error('Données du cours manquantes');
        }

        setCourseData(data.data);
      } catch (err) {
        console.error('❌ Erreur complète:', err);
        console.error('Stack trace:', err.stack);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    } else {
      setError('ID du cours manquant');
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement du cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Erreur</h2>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-4 space-x-4">
          <button
            onClick={() => navigate('/courses')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retour aux cours
          </button>
          <button
            onClick={() => navigate('/login', { state: { from: `/courses/${id}` } })}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Cours non trouvé</h2>
        <p className="mt-2 text-gray-600">Le cours que vous recherchez n'existe pas.</p>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retour aux cours
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* En-tête du cours */}
        <div className="relative h-96">
          <img
            src={courseData.imageUrl || '/default-course-image.jpg'}
            alt={courseData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{courseData.title}</h1>
            <p className="text-lg text-white/90">{courseData.description}</p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Colonne de gauche - Contenu du cours */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* À propos du cours */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">À propos du cours</h2>
              <div className="prose prose-lg max-w-none">
                <p>{courseData.description}</p>
              </div>
            </motion.div>

            {/* Programme du cours */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Programme du cours</h2>
              <div className="space-y-4">
                {courseData.lessons && courseData.lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                      <p className="text-gray-600 mt-1">{lesson.description}</p>
                      {lesson.duration && (
                        <p className="text-sm text-gray-500 mt-1">
                          Durée: {lesson.duration} minutes
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne de droite - Informations pratiques */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Informations pratiques */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix</span>
                  <span className="font-semibold text-blue-600">{courseData.price} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Niveau</span>
                  <span className="font-semibold text-gray-900">{courseData.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Catégorie</span>
                  <span className="font-semibold text-gray-900">{courseData.category}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/payment', { state: { course: courseData } })}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                S'inscrire au cours
              </motion.button>
            </motion.div>

            {/* Professeur */}
            {courseData.instructor && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Votre professeur</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={courseData.instructor.avatar || '/default-avatar.jpg'}
                    alt={courseData.instructor.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{courseData.instructor.username}</h3>
                    <p className="text-gray-600">{courseData.instructor.email}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetail; 