const repairJob = require("../../models/repair.model");

const getAllRepairs = async (req, res) => {
  try {
    const allrepairs = await repairJob.findMany({
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
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports = getAllRepairs;
