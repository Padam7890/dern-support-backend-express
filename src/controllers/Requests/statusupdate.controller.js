const supportRequest = require("../../models/supportrequest.model");

const statusUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updateData = await supportRequest.update({
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

module.exports = statusUpdate;
