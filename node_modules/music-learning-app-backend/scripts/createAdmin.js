require('dotenv').config();
const { User } = require('../models');

async function createAdmin() {
  try {
    const admin = await User.create({
      username: 'admin',
      email: 'admin@musiclearning.com',
      password: 'Admin123!',
      role: 'admin',
      isAdmin: true
    });

    console.log('Administrateur créé avec succès:', admin.username);
    console.log('Email:', admin.email);
    console.log('Mot de passe:', 'Admin123!');
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error);
  } finally {
    process.exit();
  }
}

createAdmin(); 