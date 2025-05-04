require('dotenv').config();
const { sequelize } = require('../models');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie.');

    const User = require('../models/User')(sequelize);
    await sequelize.sync();

    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ where: { isAdmin: true } });
    if (existingAdmin) {
      console.log('Un compte admin existe déjà.');
      process.exit(0);
    }

    // Créer le compte admin
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Compte admin créé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de la création du compte admin:', error);
    process.exit(1);
  }
};

createAdmin(); 