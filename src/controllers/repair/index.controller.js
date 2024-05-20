const repairJob = require("../../models/repair.model");

const getAllRepairs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const skip = (page - 1) * pageSize;
    const searchQuery = req.query.q || ""; // Step 1: Extract search query

    console.log(page + " " + pageSize);

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
          // {
          //   status: {
          //     in: ,
          //   },
          // },
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
