require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const CourseModel = require('./Course');
const LessonModel = require('./Lesson');
const ExerciseModel = require('./Exercise');
const PaymentModel = require('./Payment');

// Configuration de la connexion
const sequelize = new Sequelize(
  process.env.DB_NAME || 'music_learning_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

// Initialisation des modèles
const User = UserModel(sequelize, Sequelize.DataTypes);
const Course = CourseModel(sequelize, Sequelize.DataTypes);
const Lesson = LessonModel(sequelize, Sequelize.DataTypes);
const Exercise = ExerciseModel(sequelize, Sequelize.DataTypes);
const Payment = PaymentModel(sequelize, Sequelize.DataTypes);

// Associations
Course.belongsTo(User, { as: 'instructor' });
User.hasMany(Course, { as: 'courses', foreignKey: 'instructorId' });

Lesson.belongsTo(Course);
Course.hasMany(Lesson);

Exercise.belongsTo(Lesson);
Lesson.hasMany(Exercise);

// Association pour les cours suivis par les utilisateurs
User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });

// Association pour les leçons complétées par les utilisateurs
User.belongsToMany(Lesson, { through: 'UserLessons' });
Lesson.belongsToMany(User, { through: 'UserLessons' });

// Association pour les exercices complétés par les utilisateurs
User.belongsToMany(Exercise, { through: 'UserExercises' });
Exercise.belongsToMany(User, { through: 'UserExercises' });

// Associations des paiements
Payment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'
});
Payment.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'Course'
});
User.hasMany(Payment, {
  foreignKey: 'userId',
  as: 'Payments'
});
Course.hasMany(Payment, {
  foreignKey: 'courseId',
  as: 'Payments'
});

// Synchronisation de la base de données
const initDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de données synchronisée avec succès');
  } catch (error) {
    console.error('Erreur lors de la synchronisation de la base de données:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Course,
  Lesson,
  Exercise,
  Payment,
  initDatabase
}; 