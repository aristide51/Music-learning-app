const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Erreurs de parsing JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Format JSON invalide',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Erreurs de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: err.errors
    });
  }

  // Erreurs d'authentification
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Non autorisé'
    });
  }

  // Erreurs de base de données
  if (err.name === 'SequelizeError' || err.name === 'SequelizeValidationError') {
    return res.status(500).json({
      message: 'Erreur de base de données',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }

  // Erreurs par défaut
  res.status(err.status || 500).json({
    message: err.message || 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
};

module.exports = errorHandler; 