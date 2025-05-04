const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    logging: false
});

async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à MySQL établie avec succès.');

        // Créer la base de données si elle n'existe pas
        await sequelize.query('CREATE DATABASE IF NOT EXISTS music_learning_app');
        console.log('Base de données créée ou déjà existante.');

        // Fermer la connexion temporaire
        await sequelize.close();
        console.log('Connexion temporaire fermée.');

        console.log('Base de données initialisée avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        process.exit(1);
    }
}

initDatabase(); 