const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("comments", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
