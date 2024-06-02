const { prisma } = require("../../configs/prisma");
const repairJob = require("../../models/repair.model");

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.$transaction(async (transaction) => {
      await transaction.dailyJob.delete({
        where: {
          repairJobId: parseInt(id),
        },
        
      });
      await transaction.repairJob.delete({
        where: {
          id: parseInt(id),
        },
      });
    });

    res.json({
      message: "repair deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = deleteRepair;
