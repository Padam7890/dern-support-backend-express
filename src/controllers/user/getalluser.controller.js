const user = require("../../models/user.model");

const getallusers = async (req, res) => {
  try {
    const allusers = await user.findMany({
      include: {
        roles: true,
      },
    });
    res.json(allusers);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = getallusers;
