const articles = require("../../models/knowldge.model");

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await articles.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deleteArticle;