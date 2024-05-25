const sparePart = require("../../models/sparpart.model");

const createSpareParts = async (req, res) => {
  try {
    const { name, price, quantity, weight, stock } = req.body;

    const createSpareParts = await sparePart.create({
      data: {
        name: name,
        price: price,
        quantity: quantity,
        weight: weight,
        stock: stock,
      },
    });

    res.status(201).json({
      message: "Spare Parts Created Successfully",
      data: createSpareParts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = createSpareParts;
