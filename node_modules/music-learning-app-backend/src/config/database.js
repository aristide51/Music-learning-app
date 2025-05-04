const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'music_learning'
};

// Fonction pour créer la base de données si elle n'existe pas
async function createDatabaseIfNotExists() {
  try {
    // Créer une connexion sans spécifier la base de données
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // Créer la base de données si elle n'existe pas
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`✅ Base de données '${dbConfig.database}' vérifiée/créée avec succès.`);
    
    // Fermer la connexion
    await connection.end();
  } catch (error) {
    console.error('❌ Erreur lors de la création de la base de données:', error);
    throw error;
  }
}

// Créer la base de données avant d'initialiser Sequelize
(async () => {
  try {
    await createDatabaseIfNotExists();
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
})();

// Configuration de Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: false
    }
  }
);

// Test de la connexion
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('❌ Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize; 