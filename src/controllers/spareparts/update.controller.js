const sparePart = require("../../models/sparpart.model");

const updateSpareParts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, weight, stock } = req.body;

    const createSpareParts = await sparePart.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        price: price,
        quantity: quantity,
        weight: weight,
        stock: stock,
      },
    });

    res.status(201).json({
      message: "Spare Parts Updated Successfully",
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

module.exports = updateSpareParts;
