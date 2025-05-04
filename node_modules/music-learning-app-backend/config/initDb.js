const { sequelize } = require('./db');
const User = require('../models/User');

const initDatabase = async () => {
  try {
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: true });
    console.log('Base de données synchronisée');

    // Créer l'utilisateur admin par défaut
    await User.create({
      username: 'Admin',
      email: 'admin@musiclearning.com',
      password: 'admin2024',
      role: 'admin'
    });

    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

// Exécuter l'initialisation
initDatabase(); 