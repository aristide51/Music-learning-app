const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Enrollment extends Model {}

Enrollment.init({
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
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'completed'),
    defaultValue: 'active'
  },
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Enrollment',
  tableName: 'enrollments',
  timestamps: true,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['course_id']
    },
    {
      fields: ['user_id', 'course_id'],
      unique: true
    }
  ]
});

// Définir les associations
Enrollment.associate = (models) => {
  Enrollment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  
  Enrollment.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course'
  });
};

module.exports = Enrollment; 