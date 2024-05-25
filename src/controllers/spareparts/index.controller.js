const searchByQueries = require("../../helpers/searchquer");
const sparePart = require("../../models/sparpart.model");

const spareParts = async (req, res) => {
  try {
    const { skip, pageSize, page, searchQuery } = searchByQueries(req);

    const totalSpareParts = await sparePart.count();

    const checkSpareParts = await sparePart.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery,
            },
          },
        ],
      },
      skip: skip,
      take: pageSize,
    });

    res.status(200).json({
      message: "All SpareParts",
      data: checkSpareParts,
      total: totalSpareParts,
      page: page,
      pageSize: pageSize,
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

module.exports = spareParts;
