const sparePart = require("../../models/sparpart.model");

const viewSpareParts = async (req, res) => {
  try {
    const { id } = req.params;

    const spareParts = await sparePart.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Spare Parts",
      data: spareParts,
    });
  } catch (error) {
    res.status(404).json({
      message: "Spare Parts not found",
      error: error,
    });
  }
};

module.exports = viewSpareParts;
