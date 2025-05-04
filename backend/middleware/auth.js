const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const authMiddleware = (req, res, next) => {
  try {
    // Pour le moment, on laisse passer toutes les requêtes
    // TODO: Implémenter la vérification du token JWT
    next();
  } catch (error) {
    console.error('❌ Erreur d\'authentification:', error);
    res.status(401).json({
      success: false,
      message: 'Non autorisé'
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    console.log('👮 Vérification des droits admin...');
    console.log('Utilisateur:', {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      isAdmin: req.user.isAdmin
    });

    if (!req.user) {
      console.log('❌ Pas d\'utilisateur dans la requête');
      return res.status(401).json({ 
        message: 'Authentification requise' 
      });
    }

    if (!req.user.isAdmin && req.user.role !== 'admin') {
      console.log('❌ Utilisateur non admin');
      return res.status(403).json({ 
        message: 'Accès refusé. Vous devez être administrateur pour accéder à cette ressource.' 
      });
    }

    console.log('✅ Vérification admin réussie');
    next();
  } catch (error) {
    console.error('❌ Erreur lors de la vérification admin:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la vérification des droits administrateur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { authMiddleware, isAdmin }; 