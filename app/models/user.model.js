const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("users", {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    resetLink: {
      type: DataTypes.STRING,
    }
  });
};
