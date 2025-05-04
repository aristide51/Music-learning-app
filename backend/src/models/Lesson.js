const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Lesson extends Model {}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lessonOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'Lesson',
  tableName: 'lessons',
  timestamps: true,
  indexes: [
    {
      fields: ['course_id']
    }
  ]
});

// Définir les associations
Lesson.associate = (models) => {
  Lesson.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course'
  });
};

module.exports = Lesson; 