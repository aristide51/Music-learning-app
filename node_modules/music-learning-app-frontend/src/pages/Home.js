import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section avec animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Apprenez la musique
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                comme jamais auparavant
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez une nouvelle façon d'apprendre la musique avec des cours interactifs, 
              des tutoriels vidéo et un suivi personnalisé de votre progression.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Commencer maintenant</span>
              </Link>
              <Link
                to="/courses"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full border-2 border-white rounded-full"></span>
                <span className="relative">Explorer les cours</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-600">Étudiants actifs</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Cours disponibles</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section avec animations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir MusicLearning ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience d'apprentissage unique, adaptée à vos besoins et à votre rythme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎵",
                title: "Cours de qualité",
                description: "Des cours structurés et progressifs, créés par des musiciens professionnels."
              },
              {
                icon: "⏰",
                title: "Apprentissage flexible",
                description: "Apprenez à votre rythme, quand vous voulez, où vous voulez."
              },
              {
                icon: "👨‍🏫",
                title: "Support personnalisé",
                description: "Bénéficiez d'un accompagnement personnalisé par nos instructeurs."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section avec animations */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos cours les plus populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos cours les plus appréciés par nos étudiants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                level: "Débutant",
                title: "Guitare pour débutants",
                description: "Apprenez les bases de la guitare avec ce cours complet pour débutants.",
                price: "49,99 €"
              },
              {
                image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                level: "Intermédiaire",
                title: "Piano avancé",
                description: "Perfectionnez votre technique au piano avec ce cours avancé.",
                price: "79,99 €"
              },
              {
                image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                level: "Tous niveaux",
                title: "Batterie complète",
                description: "Maîtrisez la batterie avec ce cours complet pour tous les niveaux.",
                price: "59,99 €"
              }
            ].map((course, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">{course.price}</span>
                    <Link
                      to={`/courses/${index + 1}`}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section avec animations */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos étudiants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de nos étudiants satisfaits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                initials: "JD",
                name: "Jean Dupont",
                role: "Étudiant en guitare",
                testimonial: "Les cours sont très bien structurés et les instructeurs sont toujours disponibles pour répondre à mes questions. J'ai fait des progrès incroyables en seulement quelques mois !"
              },
              {
                initials: "MM",
                name: "Marie Martin",
                role: "Étudiante en piano",
                testimonial: "La qualité des cours est exceptionnelle. J'apprécie particulièrement la flexibilité qui me permet d'apprendre à mon rythme. Je recommande vivement !"
              },
              {
                initials: "PD",
                name: "Pierre Durand",
                role: "Étudiant en batterie",
                testimonial: "Les cours de batterie sont excellents. Les exercices sont progressifs et les vidéos sont très claires. Le support des instructeurs est vraiment top !"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-semibold">{testimonial.initials}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section avec animation */}
      <div className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Prêt à commencer votre voyage musical ?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto">
              Rejoignez des milliers d'étudiants qui apprennent la musique avec MusicLearning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full bg-white rounded-full"></span>
                <span className="relative text-indigo-600">Commencer gratuitement</span>
              </Link>
              <Link
                to="/courses"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 ease-out transform hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full border-2 border-white rounded-full"></span>
                <span className="relative">Explorer les cours</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 