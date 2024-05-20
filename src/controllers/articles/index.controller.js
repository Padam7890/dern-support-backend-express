const searchByQueries = require("../../helpers/searchquer");
const articles = require("../../models/knowldge.model");

const getarticles = async (req, res) => {
  try {
    const { skip, pageSize, page, searchQuery } = searchByQueries(req);
    const totalArticles = await articles.count();
    const article = await articles.findMany({
      skip,
      take: pageSize,
      where: {
        OR: [
          { title: { contains: searchQuery } },
          { content: { contains: searchQuery } },
        ],
      },
    });
    res.status(200).json({
      message: "All Articles",
      statusCode: 200,
      data: article,
      total: totalArticles,
      page: page,
      pageSize: pageSize,
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

module.exports = getarticles;
