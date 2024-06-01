const dashboardCount = require("../../helpers/dashbordCount");
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

    const checkQuatationPercentage = await dashboardCount(supportRequest);
    const checkRepairPercentage = await dashboardCount(repairJob);
    const checkUserPercentage = await dashboardCount(user);
    const checkSparePercentage = await dashboardCount(sparePart);



    res.status(200).json({
      message: "Dashboard Details",
      statusCode: 200,
      data: {
        quoatitionsList: quoatationsList,
        percentages: checkQuatationPercentage || 0,
        repairPercentage: checkRepairPercentage || 0,
        userPercentage: checkUserPercentage || 0,
        sparePercentage: checkSparePercentage || 0,
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

