const repairJob = require("../../models/repair.model");

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updateData = await repairJob.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });
    res.status(200).json({
      message: "Status Updated",
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

module.exports = updateStatus;
