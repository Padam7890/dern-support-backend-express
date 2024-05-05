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
      return res.status(401).json({
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
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: userExists.id,
        roles: userExists.roles,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });
    return res.status(201).json({
      message: "User created successfully",
      data: userExists,
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
