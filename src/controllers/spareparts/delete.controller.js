const sparePart = require("../../models/sparpart.model");

const deleteSpareParts = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await sparePart.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({
      message: "Successfully deleted SpareParts",
      data: del,
    });
  } catch (error) {
    res.status(200).json({
      message: "Can't delete SpareParts",
      error: error,
    });
  }
};
module.exports = deleteSpareParts;
