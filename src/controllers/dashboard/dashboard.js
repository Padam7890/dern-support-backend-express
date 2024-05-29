const repairJob = require("../../models/repair.model");
const sparePart = require("../../models/sparpart.model");
const supportRequest = require("../../models/supportrequest.model");
const user = require("../../models/user.model");

const getdashboardDetails = async (req, res) => {
  try {
    const quoatationsList = await supportRequest.count();
    const repairList = await repairJob.count();
    const userList = await user.count();
    const spareList = await sparePart.count();



    res.status(200).json({
      message: "Dashboard Details",
      statusCode: 200,
      data: {
        quoatitionsList: quoatationsList,
        repairList: repairList,
        userList: userList,
        spareList: spareList,
      },
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

module.exports = getdashboardDetails;
