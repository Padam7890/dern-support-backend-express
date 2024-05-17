const { prisma } = require("../../configs/prisma");
const supportRequest = require("../../models/supportrequest.model");
const users = require("../../models/user.model");

const getRequest = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the user with roles
    const user = await users.findUnique({
      where: { id: userId },
      include: { roles: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    }

    const isCustomer = user.roles.some(role => role.name === "customer");

    if (isCustomer) {
      const customerRequests = await supportRequest.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              userType: true,
            },
          },
          ManagementData: true,
          repairjob: true,
        },
      });
      return res.json({
        message: "Customer Support Requests Found",
        statusCode: 200,
        data: customerRequests,
      });
    } else {
      const allRequests = await supportRequest.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              userType: true,
            },
          },
          ManagementData: true,
          repairjob: true,
        },
      });
      return res.json({
        message: "All Support Requests Found",
        statusCode: 200,
        data: allRequests,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};


module.exports = getRequest;
