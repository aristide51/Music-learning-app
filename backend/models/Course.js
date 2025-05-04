const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('guitare', 'piano', 'batterie', 'chant', 'théorie musicale'),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // en minutes
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    instructorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  });

  return Course;
}; 