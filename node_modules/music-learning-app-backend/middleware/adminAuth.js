const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est connecté
    if (!req.user) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    // Vérifier si l'utilisateur est l'administrateur
    const user = await User.findById(req.user._id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    next();
  } catch (error) {
    console.error('Erreur d\'authentification admin:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = adminAuth; 