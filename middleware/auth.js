const jwt = require('jsonwebtoken');

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

module.exports = { authMiddleware }; 