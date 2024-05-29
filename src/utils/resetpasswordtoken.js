const crypto = require("crypto");
const user = require("../models/user.model");

const resetpasswordtoken = async (userId) => {
  const resettoken = crypto.randomBytes(32).toString("hex");
  const tokenhash = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  try {
    await user.update({
      where: { id: userId },
      data: {
        passwordResetToken: tokenhash,
        passwordResetTokenExpire: new Date(new Date().getTime() + 3600 * 1000),
      },
    });
    

    return resettoken;
  } catch (error) {
    console.error("Error updating user record:", error);
    throw new Error("Failed to generate reset token");
  }
};

module.exports = resetpasswordtoken;
