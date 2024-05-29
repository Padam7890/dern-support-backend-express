const { prisma } = require("../../configs/prisma");
const searchByQueries = require("../../helpers/searchquer");
const supportRequest = require("../../models/supportrequest.model");
const users = require("../../models/user.model");

const getRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skip, pageSize, page, searchQuery } = searchByQueries(req);

    // Fetch the user with roles
    const user = await users.findUnique({
      where: { id: userId },
      include: { roles: true },
    });  

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", statusCode: 404 });
    }

    const isCustomer = user.roles.some((role) => role.name === "customer");

    const whereClause = {
      ...(isCustomer ? { userId } : {}),
      ...(searchQuery && {
        OR: [
          { description: { contains: searchQuery } },
          {
            user: {
              name: { contains: searchQuery },
            },
          },
        ],
      }),
    }; // Step 2: Modify the query to include search conditions

    const totalRequest = await supportRequest.count({ where: whereClause });
    const requests = await supportRequest.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy:[
        {
          id:'desc' 
        }
      ],
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
        Quotation: true,
      },
    });

    const responseMessage = isCustomer
      ? "Customer Support Requests Found"
      : "All Support Requests Found";

    return res.json({
      message: responseMessage,
      statusCode: 200,
      data: requests,
      total: totalRequest,
      page,
      pageSize,
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

module.exports = getRequest;
