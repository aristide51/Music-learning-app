const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'music_learning_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');
    
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB }; 