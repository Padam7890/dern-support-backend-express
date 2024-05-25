const articles = require("../../models/knowldge.model");

const createArticles = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title);

    const image = req.cloudinaryUrl;
    console.log(image);

    const createArticle = await articles.create({
      data: {
        title: title,
        content: content,
        image: image,
      },
    });
    res.status(201).json({
      message: "Article created successfully",
      data: createArticle,
    });
    console.log(createArticle);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = createArticles;