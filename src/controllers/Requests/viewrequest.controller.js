const supportRequest = require("../../models/supportrequest.model");

const requestView = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await supportRequest.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
            roles:true
          },
       
        },
        ManagementData: true,
        repairjob: true,
        Quotation:true,

        
      },
    });
    res.json({
      message: "Support Request Found",
      statusCode: 200,
      data: request,
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

module.exports = requestView;

