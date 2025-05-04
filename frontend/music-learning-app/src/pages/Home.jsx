import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

const Home = () => {
  // Données de démonstration pour les cours
  const featuredCourses = [
    {
      id: 1,
      title: 'Piano Débutant',
      level: 'Débutant',
      duration: 20,
      description: 'Apprenez les bases du piano avec notre méthode progressive.',
      price: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Guitare Classique',
      level: 'Intermédiaire',
      duration: 30,
      description: 'Perfectionnez votre technique de guitare classique.',
      price: 30000,
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Solfège Pratique',
      level: 'Tous niveaux',
      duration: 15,
      description: 'Maîtrisez le solfège de manière ludique et efficace.',
      price: 20000,
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Section Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Apprenez la musique en ligne
            </h1>
            <p className="text-xl mb-8">
              Des cours de qualité, accessibles partout, avec des professeurs expérimentés.
              Démarrez votre voyage musical aujourd'hui.
            </p>
            <Link
              to="/courses"
              className="btn-secondary inline-block"
            >
              Découvrir nos cours
            </Link>
          </div>
        </div>
      </section>

      {/* Section Cours en vedette */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Nos cours en vedette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/courses"
            className="btn-primary inline-block"
          >
            Voir tous les cours
          </Link>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Pourquoi choisir notre plateforme ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Cours certifiés</h3>
              <p className="text-gray-600">
                Des programmes pédagogiques inspirés des grands conservatoires
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Apprentissage flexible</h3>
              <p className="text-gray-600">
                Apprenez à votre rythme, où que vous soyez
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">Support personnalisé</h3>
              <p className="text-gray-600">
                Accompagnement personnalisé via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 