const { Course, User } = require('../models');

const seedCourses = async () => {
  try {
    // Trouver l'admin pour l'utiliser comme instructeur
    const admin = await User.findOne({ where: { isAdmin: true } });

    if (!admin) {
      console.error('Aucun utilisateur admin trouvé');
      return;
    }

    // Données des cours
    const coursesData = [
      {
        title: 'Guitare pour Débutants',
        description: 'Apprenez les bases de la guitare, des accords aux premières mélodies.',
        level: 'débutant',
        category: 'guitare',
        duration: 600, // 10 heures
        price: 49.99,
        imageUrl: '/images/courses/guitar-beginner.jpg',
        instructorId: admin.id
      },
      {
        title: 'Piano - Niveau Intermédiaire',
        description: 'Perfectionnez votre technique du piano avec des morceaux classiques et modernes.',
        level: 'intermédiaire',
        category: 'piano',
        duration: 720, // 12 heures
        price: 69.99,
        imageUrl: '/images/courses/piano-intermediate.jpg',
        instructorId: admin.id
      },
      {
        title: 'Théorie Musicale Fondamentale',
        description: 'Comprenez les bases de la théorie musicale pour améliorer votre pratique.',
        level: 'débutant',
        category: 'théorie musicale',
        duration: 480, // 8 heures
        price: 39.99,
        imageUrl: '/images/courses/music-theory.jpg',
        instructorId: admin.id
      }
    ];

    // Créer les cours
    for (const courseData of coursesData) {
      await Course.create(courseData);
    }

    console.log('Cours de test ajoutés avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des cours de test:', error);
  }
};

// Exécuter le script si appelé directement
if (require.main === module) {
  seedCourses()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = seedCourses; 