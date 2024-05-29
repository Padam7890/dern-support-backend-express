const user = require("../../models/user.model");
const { hashPassword } = require("../../utils/passwordhash");
const crypto = require("crypto");

const resetPassword = async (request, response) => {
  try {
    const { token } = request.params;
    const { password } = request.body;
    console.log(request.body);
    const hastoken = crypto.createHash("sha256").update(token).digest("hex");
    const getuser = await user.findFirst({
      where: {
        passwordResetToken: hastoken,
        passwordResetTokenExpire: {
          gte: new Date(),
        },
      },
    });
    if (!getuser) {
      return response.status(404).json({
        message: "Token Invalid or Expired",
      });
    }

    //update password

    const hashedPass = await hashPassword(password);
    await user.update({
      where: { id: getuser.id },
      data: {
        password: hashedPass,
        passwordResetToken: null,
        passwordResetTokenExpire: null,
      },
    });
    return response.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return response.status(500).json({
      message: "Password reset failed",
    });
  }
};

module.exports = resetPassword;
