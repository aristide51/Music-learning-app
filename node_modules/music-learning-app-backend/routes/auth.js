const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Op } = require('sequelize');
const authController = require('../src/controllers/authController');

// Middleware de validation
const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  console.log('Données reçues:', { username, email, password: '***' });
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
  }
  
  next();
};

// Route d'inscription
router.post('/register', validateRegister, async (req, res) => {
  try {
    console.log('Début de la route d\'inscription');
    const { username, email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    console.log('Vérification de l\'existence de l\'utilisateur');
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      console.log('Utilisateur existant trouvé');
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    console.log('Création du nouvel utilisateur');
    // Création du nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password
    });

    console.log('Utilisateur créé avec succès');

    // Génération du token JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Token JWT généré');

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ 
      message: 'Erreur lors de l\'inscription',
      error: error.message 
    });
  }
});

// Route de connexion
router.post('/login', authController.login);

// Route de vérification du token
router.get('/verify', authController.verifyToken);

module.exports = router; 