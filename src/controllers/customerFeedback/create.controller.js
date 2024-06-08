const feedback = require("../../models/feedback.model");

const customerFeedback = async (req, res) => {
  try {
    const { commonIssues, quatationId, timeTaken, rating, location } =  req.body;


    const createCustomerFeedback = await feedback.create({
      data: {
        commonIssues: commonIssues,
        timeTaken: parseFloat(timeTaken),
        customerSatisfaction: rating,
        location: location,
        supportRequestId: parseInt(quatationId),
      },
    });
    res.status(201).json({
      message: "Thank You !! Your feedback has beed submitted",
      statusCode: 201,
      data: createCustomerFeedback,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error,
    });
  }
};


module.exports = customerFeedback;
