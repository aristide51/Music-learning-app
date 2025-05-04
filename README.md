# Application d'Apprentissage Musical

Une application web moderne pour l'apprentissage de la musique, construite avec React et Node.js.

## Fonctionnalités

- Authentification des utilisateurs
- Cours de musique interactifs
- Système de paiement
- Tableau de bord administrateur
- Support et FAQ

## Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/music-learning-app.git
cd music-learning-app
```

2. Installer les dépendances :
```bash
npm run install:all
```

3. Configurer les variables d'environnement :
- Copier `.env.example` vers `.env` dans le dossier `backend`
- Remplir les variables d'environnement nécessaires

4. Démarrer l'application :
```bash
npm start
```

## Structure du Projet

```
music-learning-app/
├── frontend/           # Application React
├── backend/           # API Node.js
│   ├── config/       # Configuration
│   ├── controllers/  # Contrôleurs
│   ├── models/       # Modèles de données
│   ├── routes/       # Routes API
│   └── middleware/   # Middlewares
└── package.json
```

## API Documentation

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Cours

- `GET /api/courses` - Liste des cours
- `GET /api/courses/:id` - Détails d'un cours
- `POST /api/courses` - Créer un cours (admin)
- `PUT /api/courses/:id` - Modifier un cours (admin)
- `DELETE /api/courses/:id` - Supprimer un cours (admin)

### Utilisateurs

- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Modifier le profil
- `GET /api/users` - Liste des utilisateurs (admin)
- `PUT /api/users/:id` - Modifier un utilisateur (admin)

## Tests

```bash
cd backend
npm test
```

## Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 