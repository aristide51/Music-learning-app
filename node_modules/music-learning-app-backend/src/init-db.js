const { sequelize } = require('./config/db');
const bcrypt = require('bcryptjs');

async function initDatabase() {
  try {
    // Table des utilisateurs
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(20),
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Vérifier si l'administrateur existe déjà
    const [admin] = await sequelize.query(
      'SELECT * FROM users WHERE email = ?',
      {
        replacements: ['admin@musiclearning.com'],
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (!admin) {
      // Créer l'administrateur par défaut
      const hashedPassword = await bcrypt.hash('admin2024', 10);
      await sequelize.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        {
          replacements: ['admin', 'admin@musiclearning.com', hashedPassword, 'admin'],
          type: sequelize.QueryTypes.INSERT
        }
      );
      console.log('✅ Administrateur créé avec succès');
    } else {
      // Mettre à jour le rôle de l'administrateur existant
      await sequelize.query(
        'UPDATE users SET role = ? WHERE email = ?',
        {
          replacements: ['admin', 'admin@musiclearning.com'],
          type: sequelize.QueryTypes.UPDATE
        }
      );
      console.log('✅ Rôle administrateur mis à jour avec succès');
    }

    // Table des cours
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        instructor_id INT NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (instructor_id) REFERENCES users(id)
      )
    `);

    // Table des leçons
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        video_url VARCHAR(255),
        duration INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    // Table des inscriptions
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    // Table des paiements
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        course_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
        payment_method VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    console.log('✅ Base de données initialisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await sequelize.close();
  }
}

module.exports = initDatabase; 