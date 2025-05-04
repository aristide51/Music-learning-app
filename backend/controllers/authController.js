const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Forcer le rôle admin pour admin@musiclearning.com
    if (email === 'admin@musiclearning.com' && password === 'admin2024') {
      const token = jwt.sign(
        { 
          id: 1,
          email: email,
          role: 'admin',
          isAdmin: true
        },
        process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
        { expiresIn: '24h' }
      );

      const userInfo = {
        id: 1,
        email: email,
        username: 'Admin',
        role: 'admin',
        isAdmin: true
      };

      console.log('Admin login successful:', userInfo);

      return res.json({
        token,
        user: userInfo
      });
    }

    // Pour les autres utilisateurs, vérifier dans la base de données
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
      { expiresIn: '24h' }
    );

    // Renvoyer le token et les informations de l'utilisateur
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isAdmin: user.role === 'admin'
    };

    console.log('Regular user login successful:', userInfo);

    res.json({
      token,
      user: userInfo
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer le nouvel utilisateur
    const user = await User.create({
      email,
      password,
      username,
      role: 'user'
    });

    // Créer le token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        isAdmin: user.role === 'admin'
      },
      process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
      { expiresIn: '24h' }
    );

    // Renvoyer le token et les informations de l'utilisateur
    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isAdmin: user.role === 'admin'
    };

    res.status(201).json({
      token,
      user: userInfo
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

module.exports = {
  login,
  register
}; 