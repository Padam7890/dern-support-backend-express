const searchByQueries = require("../../helpers/searchquer");
const repairJob = require("../../models/repair.model");

const getAllRepairs = async (req, res) => {
  try {
    const {skip, pageSize,page, searchQuery} = searchByQueries(req)

    // console.log(page + " " + pageSize);

    const totalRepairs = await repairJob.count();
    const allrepairs = await repairJob.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: searchQuery,
            },
          },
          {
            supportRequest: {
              user: {
                name: {
                  contains: searchQuery,
                },
              },
            },
          },
        ],
        
      },
      skip: skip,
      take: pageSize,
      orderBy:{
        scheduledDate: "asc",
      },
      include: {
        supportRequest: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "All repairs",
      allrepair: allrepairs,
      total: totalRepairs,
      page: page,
      pageSize: pageSize,
    });
    console.log(allrepairs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports = getAllRepairs;
