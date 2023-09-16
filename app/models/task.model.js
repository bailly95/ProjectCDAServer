const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    priority: {
      type: DataTypes.BOOLEAN,
    },
  });
};
