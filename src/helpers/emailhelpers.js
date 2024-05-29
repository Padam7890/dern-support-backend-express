const user = require("../models/user.model");
const sendEmail = require("../utils/email");

const sendPasswordResetEmail = async (email, emailHTML, getuser, response) => {
  try {
    await sendEmail({
      to: email,
      subject: "Password Reset",
      html: emailHTML,
    });
    return response.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    try {
      await user.update({
        where: { id: getuser.id },
        data: {
          passwordResetToken: null,
          passwordResetTokenExpire: null,
        },
      });
      console.log(error);

      return response.status(404).json({
        message: "Error sending email due to this error",
        error: error,
      });
    } catch (error) {
      console.error("Error updating user record:", error);
      return response.status(500).json({
        message: "Error updating user record",
        error: error
      });
    }
  }
};

module.exports = { sendPasswordResetEmail };
