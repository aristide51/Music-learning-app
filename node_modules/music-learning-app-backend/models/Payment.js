const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'courseId',
      references: {
        model: 'Course',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'transactionId'
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending'
    },
    isUnlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'isUnlocked'
    }
  }, {
    tableName: 'Payment',
    timestamps: true,
    underscored: false
  });

  return Payment;
}; 