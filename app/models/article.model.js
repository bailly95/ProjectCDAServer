const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("articles", {
    titreArticle: {
      type: DataTypes.STRING,
    },
    prixArticle: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    urlImg: {
      type: DataTypes.STRING,
    },
    textAltImg: {
      type: DataTypes.STRING,
    },
    dispo: {
      type: DataTypes.BOOLEAN,
    }
  });
};
