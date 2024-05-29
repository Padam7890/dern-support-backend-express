const { prisma } = require("../../configs/prisma");
const repairJob = require("../../models/repair.model");
const supportRequest = require("../../models/supportrequest.model");

const createRequest = async (req, res) => {
  try {
    const { description } = req.body;

    const savedata = await supportRequest.create({
      data: {
        description,
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      message: "Request created successfully",
      statusCode: 200,
      data: savedata,
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

module.exports = createRequest;
