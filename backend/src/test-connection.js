const { sequelize } = require('./config/db');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL réussie !');
    
    // Test de création d'une table simple
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
      )
    `);
    console.log('✅ Table de test créée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection(); 