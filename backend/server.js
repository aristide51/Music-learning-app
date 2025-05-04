const express = require('express');
const cors = require('cors');
const { syncModels } = require('./src/models');
const { authMiddleware } = require('./middleware/auth');

// Import des routes
const courseRoutes = require('./src/routes/courses');
const userRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');
const paymentRoutes = require('./src/routes/payments');
const enrollmentRoutes = require('./src/routes/enrollments');
const lessonRoutes = require('./src/routes/lessons');
const commentRoutes = require('./src/routes/comments');

// Création de l'application Express
const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log('📥 Requête reçue:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API de Music Learning App' });
});

// Routes publiques
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Routes protégées
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/enrollments', authMiddleware, enrollmentRoutes);
app.use('/api/lessons', authMiddleware, lessonRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue sur le serveur'
  });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
const startServer = async () => {
  try {
    // Synchroniser les modèles avec la base de données
    await syncModels();
    console.log('✅ Base de données synchronisée');

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer(); 