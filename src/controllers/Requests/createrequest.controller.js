const { prisma } = require("../../configs/prisma");
const repairJob = require("../../models/repair.model");
const supportRequest = require("../../models/supportrequest.model");

const createRequest = async (req, res) => {
  try {
    const { description, isRepair, productName, scheduledDate, address,userId } = req.body;

    if (typeof isRepair !== 'boolean') {
      return res.status(400).json({
        message: "Invalid value for isRepair. It must be a boolean.",
        statusCode: 400
      });
    }

    let savedata;


    if (!isRepair) {
      savedata = await supportRequest.create({
        data: {
          description,
          userId:req.user.id,
        }
      });
    } else {
      savedata = await supportRequest.create({
        data: {
          description,
          userId:req.user.id,
          repairjob: {
            create: {
              productName,
              address,
              scheduledDate,
              dailyJob: {
                create: {
                  date: new Date(),
                  status: "active"
                }
              }
            }
          }
        }
      });
    }

    return res.status(200).json({
      message: "Request created successfully",
      statusCode: 200,
      data: savedata
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message
    });
  }
};


module.exports = createRequest;
