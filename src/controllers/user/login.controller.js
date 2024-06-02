const user = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userExists) {
      return res.status(404).json({
        message: "User Not Exists",
      });

    }
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid Password",
      });
    }

    const accessToken = jwt.sign(
      {
        id: userExists.id,
        roles: userExists.roles,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: userExists.id,
        roles: userExists.roles,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    
    return res.status(201).json({
      message: "Logged In",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = login;
