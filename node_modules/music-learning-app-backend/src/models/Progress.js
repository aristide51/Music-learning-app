const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Progress extends Model {}

Progress.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
    defaultValue: 'not_started'
  }
}, {
  sequelize,
  modelName: 'Progress',
  tableName: 'progress',
  timestamps: true,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['lesson_id']
    },
    {
      fields: ['user_id', 'lesson_id'],
      unique: true
    }
  ]
});

// Définir les associations
Progress.associate = (models) => {
  Progress.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  
  Progress.belongsTo(models.Lesson, {
    foreignKey: 'lesson_id',
    as: 'lesson'
  });
};

module.exports = Progress; 