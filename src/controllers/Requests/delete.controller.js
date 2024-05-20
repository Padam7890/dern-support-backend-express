const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleterequest = async (req, res) => {
  const { id } = req.params;
  const supportRequestId = parseInt(id);

  try {
    await prisma.$transaction(async (transaction) => {
      // Delete associated daily jobs first
      await transaction.dailyJob.deleteMany({
        where: {
          repairJob: {
            supportRequestId: supportRequestId,
          },
        },
      });

      // Delete associated management data
      await transaction.managementData.deleteMany({
        where: {
          supportRequestId: supportRequestId,
        },
      });

      // Delete associated repair jobs
      await transaction.repairJob.deleteMany({
        where: {
          supportRequestId: supportRequestId,
        },
      });

      // Delete the support request
      await transaction.supportRequest.delete({
        where: {
          id: supportRequestId,
        },
      });
    });

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Can't delete request",
      error: error.message,
    });
  }
};

module.exports = deleterequest;
