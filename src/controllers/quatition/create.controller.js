const quotation = require("../../models/quotation.model");

const saveQuations = async (req, res) => {
  try {
    const { productname, price, supportRequestId, productId } = req.body;

    // Check if the quotation already exists
    const existingQuotation = await quotation.findUnique({
      where: {
        supportRequestId: parseInt(supportRequestId),
      },
    });

    if (existingQuotation) {
      return res.status(400).json({
        message: "Quotation already exists",
        statusCode: 400,

      });
    }
    

    // Create a new quotation if it does not exist
    const savedata = await quotation.create({
      data: {
        productName: productname,
        price: price,
        supportRequestId: parseInt(supportRequestId),
        productId: parseInt(productId),
      },
    });

    res.status(201).json({
      message: "Quotation Saved",
      statusCode: 200,
      data: savedata,
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

module.exports = saveQuations;
