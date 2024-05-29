const user = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const checkUser = await user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        roles: true, 
      },
    });

    if (!checkUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isAdmin = checkUser.roles.some((role) => role.name === "admin");
    if (isAdmin) {
      return res.status(400).json({
        error: "User is an administrator and cannot be deleted",
      });
    }

    // Delete the user
    await user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deleteUser;
