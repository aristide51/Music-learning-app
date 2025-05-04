const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Payment extends Model {}

Payment.init({
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Orange Money'
  },
  transaction_id: {
    type: DataTypes.STRING,
    unique: true
  },
  is_unlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: true,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['course_id']
    },
    {
      fields: ['transaction_id'],
      unique: true
    }
  ]
});

// Définir les associations
Payment.associate = (models) => {
  Payment.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  });
  
  Payment.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course',
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  });
};

module.exports = Payment; 