const articles = require("../../models/knowldge.model");

const articleView = async (req, res) => {
  try {
    const { id } = req.params;

    const articleView = await articles.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Article Viewed",
      statusCode: 200,
      data: articleView,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports = articleView;
