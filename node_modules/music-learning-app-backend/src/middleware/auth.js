const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Liste des routes publiques
const publicRoutes = [
  { path: '/api/courses', method: 'GET' },
  { path: /^\/api\/courses\/\d+$/, method: 'GET' },
  { path: /^\/api\/courses\/\d+\/lessons$/, method: 'GET' },
  { path: '/api/auth/login', method: 'POST' },
  { path: '/api/auth/register', method: 'POST' }
];

const isPublicRoute = (req) => {
  return publicRoutes.some(route => {
    if (route.method !== req.method) return false;
    if (typeof route.path === 'string') {
      return route.path === req.path;
    }
    return route.path.test(req.path);
  });
};

const authMiddleware = async (req, res, next) => {
  try {
    console.log('🔒 Vérification du token...');
    console.log('Route:', req.method, req.path);

    // Si c'est une route publique, on passe directement au prochain middleware
    if (isPublicRoute(req)) {
      console.log('✅ Route publique, pas besoin de token');
      return next();
    }

    const authHeader = req.header('Authorization');
    console.log('Header Authorization:', authHeader);

    if (!authHeader) {
      console.log('❌ Pas de header Authorization');
      return res.status(401).json({ 
        success: false,
        message: 'Token non fourni' 
      });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      console.log('❌ Token non trouvé dans le header');
      return res.status(401).json({ 
        success: false,
        message: 'Token non fourni' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token décodé:', decoded);

      const user = await User.findByPk(decoded.userId);
      if (!user) {
        console.log('❌ Utilisateur non trouvé en base de données');
        return res.status(401).json({ 
          success: false,
          message: 'Utilisateur non trouvé' 
        });
      }

      // Mettre à jour la dernière connexion
      await user.update({ lastLogin: new Date() });

      req.user = user;
      req.token = token;
      console.log('✅ Authentification réussie pour:', user.email);
      next();
    } catch (error) {
      console.error('❌ Erreur de vérification du token:', error);
      return res.status(401).json({ 
        success: false,
        message: 'Token invalide' 
      });
    }
  } catch (error) {
    console.error('❌ Erreur dans le middleware d\'authentification:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'authentification' 
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    console.log('👮 Vérification des droits admin...');
    console.log('Utilisateur:', {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    });

    if (!req.user) {
      console.log('❌ Pas d\'utilisateur dans la requête');
      return res.status(401).json({ 
        success: false,
        message: 'Authentification requise' 
      });
    }

    if (req.user.role !== 'admin') {
      console.log('❌ Utilisateur non admin');
      return res.status(403).json({ 
        success: false,
        message: 'Accès refusé. Vous devez être administrateur pour accéder à cette ressource.' 
      });
    }

    console.log('✅ Vérification admin réussie');
    next();
  } catch (error) {
    console.error('❌ Erreur lors de la vérification admin:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la vérification des droits administrateur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { authMiddleware, isAdmin }; 