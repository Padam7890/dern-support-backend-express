const { prisma } = require("../../configs/prisma");

const quotationStatus = async (req, res) => {
  try {
    const { id } = req.params; // This id should be the support request id
    const { status, address, scheduledDate, quotationId, supportRequestId } = req.body;

    // Update the quotation status
    const updatedQuotation = await prisma.quotation.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });

    // Check if the status is accepted
    if (status !== "Accepted") {
      return res.status(200).json({
        message: "Quotation status updated but further actions were not taken as the status is not 'Accepted'.",
        statusCode: 200,
        data: updatedQuotation,
      });
    }

    const sparePartId = updatedQuotation.productId;

    // Check spare part quantity
    const sparePart = await prisma.sparePart.findUnique({
      where: { id: sparePartId },
    });

    if (!sparePart) {
      return res.status(404).json({
        message: "Spare part not found",
        statusCode: 404,
      });
    }

    if (sparePart.quantity <= 0) {
      return res.status(400).json({
        message: "Out of stock",
        statusCode: 400,
      });
    }

    // Check if a RepairJob already exists for the supportRequestId
    const existingRepairJob = await prisma.repairJob.findFirst({
      where: {
        supportRequestId: parseInt(supportRequestId),
      },
    });
    

    if (existingRepairJob) {
      return res.status(400).json({
        message: "Repair work already exists for this support request",
        statusCode: 400,
      });
    }

    // Run the operations in a transaction
    const [newRepairJob, updatedSparePart] = await prisma.$transaction([
      prisma.repairJob.create({
        data: {
          supportRequestId: parseInt(supportRequestId),
          productName: updatedQuotation.productName,
          address: address,
          scheduledDate: new Date(scheduledDate),
          dailyJob: {
            create: {
              date: new Date(),
              status: "active",
            },
          },
        },
      }),

      prisma.sparePart.update({
        where: {
          id: sparePartId,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      }),
    ]);

    res.status(200).json({
      message: "Status Updated and further actions taken",
      statusCode: 200,
      data: {
        updatedQuotation,
        newRepairJob,
        updatedSparePart,
      },
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

module.exports = quotationStatus;
