const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const bcrypt = require('bcryptjs');

const authController = {
  // Inscription
  async register(req, res) {
    try {
      const { name, email, password, whatsapp } = req.body;

      // Vérification si l'email existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Création de l'utilisateur
      const userId = await User.create({ name, email, password, whatsapp });

      // Génération du token JWT
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Inscription réussie',
        token,
        user: {
          id: userId,
          name,
          email,
          whatsapp
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
  },

  // Connexion
  async login(req, res) {
    try {
      console.log('👤 Tentative de connexion pour:', req.body.email);
      const { email, password } = req.body;

      // Forcer le rôle admin pour admin@musiclearning.com
      if (email === 'admin@musiclearning.com' && password === 'admin2024') {
        const token = jwt.sign(
          { 
            userId: 1,
            email: email,
            role: 'admin',
            isAdmin: true
          },
          process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
          { expiresIn: '24h' }
        );

        console.log('✅ Connexion admin réussie');
        return res.json({
          token,
          user: {
            id: 1,
            email: email,
            username: 'Admin',
            role: 'admin',
            isAdmin: true
          }
        });
      }

      // Recherche de l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        console.log('❌ Utilisateur non trouvé');
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Vérification du mot de passe
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        console.log('❌ Mot de passe invalide');
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Génération du token JWT
      const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
        { expiresIn: '24h' }
      );

      // Mise à jour de la dernière connexion
      await user.update({ lastLogin: new Date() });

      console.log('✅ Connexion réussie pour:', user.email);
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  },

  // Récupération du profil
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
    }
  },

  // Mise à jour du profil
  async updateProfile(req, res) {
    try {
      const { name, whatsapp } = req.body;
      await User.updateProfile(req.user.userId, { name, whatsapp });

      res.json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
  },

  // Changement de mot de passe
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Vérification du mot de passe actuel
      const user = await User.findByEmail(req.user.email);
      const isPasswordValid = await User.comparePassword(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
      }

      // Mise à jour du mot de passe
      await User.updatePassword(req.user.userId, newPassword);

      res.json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      res.status(500).json({ message: 'Erreur lors du changement de mot de passe' });
    }
  },

  // Vérification du token
  async verifyToken(req, res) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt_super_securise');
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      console.error('❌ Erreur lors de la vérification du token:', error);
      res.status(401).json({ message: 'Token invalide' });
    }
  }
};

module.exports = authController; 