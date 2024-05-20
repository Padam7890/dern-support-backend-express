const articles = require("../../models/knowldge.model");

const createArticles = async (req, res) => {
  try {
    const { title, content } = req.body;

    const createArticle = await articles.create({
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json({
      message: "Article created successfully",
      data: createArticle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = createArticles;
