const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Comment extends Model {}

Comment.init({
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
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['course_id']
    }
  ]
});

// Définir les associations
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  
  Comment.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course'
  });
};

module.exports = Comment; 