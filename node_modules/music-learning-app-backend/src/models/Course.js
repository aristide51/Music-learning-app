const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  level: {
    type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
    allowNull: false,
    defaultValue: 'débutant'
  },
  category: {
    type: DataTypes.ENUM('guitare', 'piano', 'batterie', 'chant', 'théorie musicale'),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '/default-course-image.jpg'
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    allowNull: false,
    defaultValue: 'draft'
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
  paranoid: true, // Active la suppression douce
  indexes: [
    {
      unique: true,
      fields: ['title']
    },
    {
      fields: ['instructorId']
    }
  ],
  hooks: {
    beforeCreate: async (course) => {
      console.log('Création d\'un nouveau cours:', course.title);
    },
    beforeUpdate: async (course) => {
      console.log('Mise à jour du cours:', course.title);
    },
    beforeDestroy: async (course) => {
      console.log('Suppression du cours:', course.title);
    }
  }
});

// Définir les associations
Course.associate = (models) => {
  Course.belongsTo(models.User, {
    foreignKey: 'instructorId',
    as: 'instructor'
  });
  
  Course.hasMany(models.Lesson, {
    foreignKey: 'courseId',
    as: 'lessons'
  });
  
  Course.hasMany(models.Payment, {
    foreignKey: 'course_id',
    as: 'payments'
  });
  
  Course.hasMany(models.Comment, {
    foreignKey: 'course_id',
    as: 'comments'
  });
  
  Course.hasMany(models.Enrollment, {
    foreignKey: 'course_id',
    as: 'enrollments'
  });
};

module.exports = Course; 