const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("comments", {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
};
