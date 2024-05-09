const { prisma } = require("../../configs/prisma");

const getRequest = async (req, res) => {
  try {
    const data = await prisma.supportRequest.findMany({
      where: {
        user: {
            id: req.user.id,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
          },
        },
        repairjob: true,
      },
    });
    res.json({
      message: "User Found",
      statusCode: 200,
      data: data,
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

module.exports = getRequest;
