const path = require("path");
const sendEmail = require("../../utils/email");
const ejs = require("ejs");
const fs = require("fs");
const resetpasswordtoken = require("../../utils/resetpasswordtoken");
const user = require("../../models/user.model");
const { sendPasswordResetEmail } = require("../../helpers/emailhelpers");

const forgetPass = async (request, response) => {
  try {
    const { email } = request.body;

    const getuser = await user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(email)


    if (!getuser) {
      return response.status(404).json({
        message: "user Not found",
      });
    }

    const resetToken = await resetpasswordtoken(getuser.id);
    const url = process.env.FRONTEND_URL;

    const resetUrl = `${request.protocol}://${url}/auth/resetpassword/${resetToken}`;

    const emailTemplate = fs.readFileSync(
      path.join(
        __dirname,
        "../../templates",
        "password_reset_email_template.ejs"
      ),
      "utf8"
    );

    const emailHTML = await ejs.render(emailTemplate, {
      getuser: getuser,
      resetUrl: resetUrl,
    });

    await sendPasswordResetEmail(email, emailHTML, getuser, response);
  } catch (error) {
    console.error("Error in forgetPass:", error);
    return response
      .status(500)
      .json({
        message:"Internal Server Error",
        error: error
      });
  }
};


module.exports = forgetPass;
