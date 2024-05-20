const { exclude } = require("../../configs/prisma");
const user = require("../../models/user.model");

const getuserdetails = async (request, response) => {
  try {
    const userId = request.user.id;
    console.log("user of " + userId);
    const getuser = await user.findFirst({
      where: {
        id: parseInt(userId),
      },
      include: {
        roles: true,
      },
    });
    console.log(getuser);

    const getuserwithoutpassword = exclude(getuser, ["password"]);

    console.log(getuserwithoutpassword);
    return response.json({
      message: "User Details Fetched",
      statusCode: 200,
      data: getuserwithoutpassword,
    });
  } catch (error) {
    console.log(error);
    return response.json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error.message,
    });
  }
};

module.exports = getuserdetails;
