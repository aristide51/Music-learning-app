import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Courses.css';

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Guitare - Niveau Débutant",
      description: "Apprenez les bases de la guitare avec nos professeurs expérimentés",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "299€",
      duration: "8 semaines",
      level: "Débutant"
    },
    {
      id: 2,
      title: "Guitare - Niveau Intermédiaire",
      description: "Perfectionnez votre technique et développez votre style",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "349€",
      duration: "8 semaines",
      level: "Intermédiaire"
    },
    {
      id: 3,
      title: "Guitare - Niveau Avancé",
      description: "Maîtrisez les techniques avancées et développez votre créativité",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "399€",
      duration: "8 semaines",
      level: "Avancé"
    },
    {
      id: 4,
      title: 'Piano - Niveau Débutant',
      description: 'Découvrez les bases du piano',
      level: 'Débutant',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 5,
      title: 'Piano - Niveau Intermédiaire',
      description: 'Développez votre technique pianistique',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 6,
      title: 'Piano - Niveau Avancé',
      description: 'Excellence pianistique et interprétation',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '399€',
      duration: '8 semaines'
    },
    {
      id: 7,
      title: 'Solfège - Niveau Débutant',
      description: 'Apprenez les bases de la théorie musicale',
      level: 'Débutant',
      image: 'https://images.unsplash.com/photo-1649562211721-60f2a884bba7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 8,
      title: 'Solfège - Niveau Intermédiaire',
      description: 'Approfondissez votre connaissance musicale',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1649562211721-60f2a884bba7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 9,
      title: 'Solfège - Niveau Avancé',
      description: 'Maîtrisez l\'analyse musicale avancée',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1649562211721-60f2a884bba7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '399€',
      duration: '8 semaines'
    },
    {
      id: 10,
      title: 'Trompette - Niveau Débutant',
      description: 'Découvrez les bases de la trompette',
      level: 'Débutant',
      image: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 11,
      title: 'Trompette - Niveau Intermédiaire',
      description: 'Perfectionnez votre technique à la trompette',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 12,
      title: 'Trompette - Niveau Avancé',
      description: 'Maîtrisez les techniques avancées de la trompette',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '399€',
      duration: '8 semaines'
    },
    {
      id: 13,
      title: 'Flûte - Niveau Débutant',
      description: 'Apprenez les bases de la flûte',
      level: 'Débutant',
      image: 'https://images.unsplash.com/photo-1580719653258-26873fde0b4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 14,
      title: 'Flûte - Niveau Intermédiaire',
      description: 'Développez votre technique à la flûte',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1580719653258-26873fde0b4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 15,
      title: 'Flûte - Niveau Avancé',
      description: 'Excellence flûtistique et interprétation',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1580719653258-26873fde0b4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '399€',
      duration: '8 semaines'
    },
    {
      id: 16,
      title: 'Batterie - Niveau Débutant',
      description: 'Découvrez les bases de la batterie',
      level: 'Débutant',
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 17,
      title: 'Batterie - Niveau Intermédiaire',
      description: 'Perfectionnez votre technique à la batterie',
      level: 'Intermédiaire',
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 18,
      title: 'Batterie - Niveau Avancé',
      description: 'Maîtrisez les techniques avancées de la batterie',
      level: 'Avancé',
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '399€',
      duration: '8 semaines'
    },
    {
      id: 19,
      title: 'Guitare Basse - Niveau Débutant',
      description: 'Apprenez les bases de la guitare basse',
      level: 'Débutant',
      image: 'https://plus.unsplash.com/premium_photo-1664194584456-c25febbccb2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '299€',
      duration: '8 semaines'
    },
    {
      id: 20,
      title: 'Guitare Basse - Niveau Intermédiaire',
      description: 'Développez votre technique à la guitare basse',
      level: 'Intermédiaire',
      image: 'https://plus.unsplash.com/premium_photo-1664194584456-c25febbccb2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '349€',
      duration: '8 semaines'
    },
    {
      id: 21,
      title: 'Guitare Basse - Niveau Avancé',
      description: 'Excellence basse et interprétation',
      level: 'Avancé',
      image: 'https://plus.unsplash.com/premium_photo-1664194584456-c25febbccb2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      price: '399€',
      duration: '8 semaines'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
            Nos Cours de Musique
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos cours adaptés à tous les niveaux
          </p>
        </motion.div>

        {/* Filtres avec animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map((filter, index) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille des cours avec animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-semibold">{course.price}</span>
                  <span className="text-gray-500">{course.duration}</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  En savoir plus
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Courses; 