const repairJob = require("../../models/repair.model");

const viewRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairJob.findUnique({
      where: {
        id: parseInt(id),
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
        message: "Repair Found",
        statusCode: 200,
        data: repair,
  
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
    });
  }
};

module.exports = viewRepair;
