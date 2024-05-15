const sendEmail = require("../../utils/email");

const sendmails = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const sendEmails = await sendEmail({
      to: email,
      subject: subject,
      html: message,
    });
    res.status(200).json({
      message: "Email Sent Successfully",
      statusCode: 200,
      data: sendEmails,
    });
    console.log("email sent successfully")
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      statusCode: 500,
      error: error,
    });
  }
};


module.exports = sendmails;
