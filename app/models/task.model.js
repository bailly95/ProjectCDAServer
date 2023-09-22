const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'todo'
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    priority: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });
};
