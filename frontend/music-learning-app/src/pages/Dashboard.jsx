import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Données de démonstration pour les cours achetés
  const purchasedCourses = [
    {
      id: 1,
      title: 'Piano Débutant',
      progress: 45,
      lastAccessed: '2024-04-28',
      nextLesson: 'Leçon 5: Les accords de base'
    },
    {
      id: 2,
      title: 'Solfège Pratique',
      progress: 80,
      lastAccessed: '2024-04-27',
      nextLesson: 'Leçon 8: Les rythmes complexes'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      {/* Section Progression globale */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Votre progression</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {purchasedCourses.length}
            </div>
            <div className="text-gray-600">Cours achetés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {Math.round(purchasedCourses.reduce((acc, course) => acc + course.progress, 0) / purchasedCourses.length)}%
            </div>
            <div className="text-gray-600">Progression moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {purchasedCourses.length * 2}
            </div>
            <div className="text-gray-600">Heures d'apprentissage</div>
          </div>
        </div>
      </div>
      
      {/* Section Cours en cours */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Vos cours en cours</h2>
        <div className="space-y-6">
          {purchasedCourses.map(course => (
            <div key={course.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-gray-600">Dernier accès : {course.lastAccessed}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {course.progress}%
                  </div>
                  <div className="text-sm text-gray-600">Progression</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Prochaine leçon :</p>
                  <p className="font-medium">{course.nextLesson}</p>
                </div>
                <Link
                  to={`/course/${course.id}`}
                  className="btn-primary"
                >
                  Continuer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section Recommandations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Cours recommandés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Guitare Classique</h3>
            <p className="text-gray-600 mb-4">
              Complémentez votre apprentissage du piano avec la guitare classique.
            </p>
            <Link
              to="/courses"
              className="btn-secondary"
            >
              Découvrir
            </Link>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Techniques Vocales</h3>
            <p className="text-gray-600 mb-4">
              Améliorez votre technique vocale pour un meilleur contrôle de votre voix.
            </p>
            <Link
              to="/courses"
              className="btn-secondary"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 