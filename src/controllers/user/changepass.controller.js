const bcrypt = require("bcryptjs");
const user = require("../../models/user.model");
const changepassword = async (request, response) => {
  try {
    //get new password and old password
    const { password, old_password } = request.body;
    console.log(request.body);
    //check old password of user correct or not
    const getuser = await user.findUnique({
      where: {
        id: request.user.id,
      },
    });
    console.log(getuser);
    const isPasswordCorrect = await bcrypt.compare(old_password, getuser.password);

    if (!isPasswordCorrect) {
      return response.status(400).json({
        message: "Old password is incorrect",
      });
    }
    //hash new password
    const hashedPassword = await bcrypt.hash(password, 12);
    //update password
    await user.update({
      where: {
        id: request.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    response.status(200).json({
      message: "Password changed successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500).json({
        message: "Internal Server Error",
        statusCode: 500,
        error: error.message,
      })
  }
};
module.exports = changepassword;
