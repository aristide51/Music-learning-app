const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'music_learning_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL établie');

    // Synchroniser les modèles avec la base de données
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Synchronisation des modèles...');
      await sequelize.sync({ alter: true });
      console.log('✅ Synchronisation terminée');
    } else {
      console.log('🔄 Synchronisation des modèles...');
      await sequelize.sync();
      console.log('✅ Synchronisation terminée');
    }
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB }; 