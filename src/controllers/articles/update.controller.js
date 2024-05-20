const articles = require("../../models/knowldge.model");

const updatearticles = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updateData = await articles.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        content: content,
      },
    });
    res.status(200).json({
      message: "Article Updated",
      statusCode: 200,
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports = updatearticles;