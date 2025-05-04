const { User } = require('../models');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({
      where: {
        role: 'admin'
      }
    });

    if (existingAdmin) {
      console.log('✅ Un administrateur existe déjà.');
      return;
    }

    // Créer l'utilisateur admin
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@musiclearning.com',
      password: 'Admin123!',
      role: 'admin',
      isAdmin: true,
      isActive: true,
      status: 'active'
    });

    console.log('✅ Administrateur créé avec succès :');
    console.log('Username:', adminUser.username);
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'administrateur:', error);
  }
}

// Exécuter le script
createAdminUser(); 