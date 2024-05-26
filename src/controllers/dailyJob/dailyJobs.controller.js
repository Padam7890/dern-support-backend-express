const searchByQueries = require("../../helpers/searchquer");
const dailyJob = require("../../models/dailyJob.model");

const dailyJobs = async (req, res) => {
  try {
    const { skip, pageSize, page, searchQuery } = searchByQueries(req);
    const totalDailyJobs = await dailyJob.count();
    const Jobs = await dailyJob.findMany({
      skip,
      take: pageSize,
      where: {
        OR: [
          {
            repairJob: {
              supportRequest: {
                user: {
                  name: {
                    contains: searchQuery,
                  },
                },
              },
            },
          },
        ],
      },
      include: {
        repairJob: {
          include: {
            supportRequest: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      message: "All Daily Jobs",
      statusCode: 200,
      data: Jobs,
      total: totalDailyJobs,
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

module.exports = dailyJobs;
