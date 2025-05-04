const { sequelize } = require('../../config/db');
const User = require('./User');

// Synchroniser les modèles avec la base de données
const syncModels = async () => {
  try {
    // Force la recréation de la table
    await User.sync({ force: true });
    console.log('✅ Table users synchronisée');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation des modèles:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  syncModels
}; 