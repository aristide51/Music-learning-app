import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            À propos de Music Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire pour l'apprentissage de la musique depuis 2010
          </p>
        </motion.div>

        {/* Notre mission avec animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12 transform hover:scale-105 transition-transform duration-300"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Chez Music Learning, nous croyons que la musique est un langage universel qui enrichit la vie de chacun. 
            Notre mission est de rendre l'apprentissage de la musique accessible, agréable et enrichissant pour tous, 
            quel que soit votre niveau ou votre âge.
          </p>
        </motion.div>

        {/* Nos valeurs avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: (
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              ),
              title: "Excellence",
              description: "Nous nous engageons à offrir une formation musicale de la plus haute qualité, avec des professeurs qualifiés et une méthodologie éprouvée."
            },
            {
              icon: (
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Communauté",
              description: "Nous cultivons une communauté bienveillante où les élèves peuvent partager leur passion et progresser ensemble dans leur parcours musical."
            },
            {
              icon: (
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Innovation",
              description: "Nous intégrons les dernières technologies et méthodes d'apprentissage pour rendre l'expérience musicale plus interactive et efficace."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-blue-600 mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Notre équipe avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                name: "Jean Dupont",
                role: "Directeur & Fondateur"
              },
              {
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                name: "Marie Martin",
                role: "Coordinatrice Pédagogique"
              },
              {
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                name: "Pierre Dubois",
                role: "Responsable des Relations"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nos chiffres avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { number: "1000+", text: "Élèves formés" },
            { number: "20+", text: "Professeurs qualifiés" },
            { number: "10+", text: "Années d'expérience" },
            { number: "15+", text: "Instruments enseignés" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <p className="text-gray-600">{stat.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rejoignez-nous</h2>
          <p className="text-lg text-gray-600 mb-8">
            Découvrez le plaisir d'apprendre la musique avec nos professeurs passionnés
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Commencer votre parcours musical
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 