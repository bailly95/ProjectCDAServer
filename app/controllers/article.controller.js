const db = require("../models");
const Article = db.article;
exports.getAllArticle = async (req, res) => {
  console.log("cocuocu")
  try {
    const articles = await Article.findAll();
    console.log(articles)
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


