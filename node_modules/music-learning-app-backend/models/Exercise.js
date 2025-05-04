const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Exercise = sequelize.define('Exercise', {
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
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // en minutes
      allowNull: false
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Exercise;
}; 