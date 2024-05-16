const individualCustomer = require("../../models/IndividualCustomer.model");
const bussiness = require("../../models/bussines.model");
const user = require("../../models/user.model");
const { hashPassword } = require("../../utils/passwordhash");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let { name, email, password, userType } = req.body;
    console.log(req.body);
    const checkemail = await user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkemail) {
      return res.status(400).json({
        message: "email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const usersave = await user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType,
        roles: {
          connectOrCreate: {
            where: {
              name: "customer",
            },
            create: {
              name: "customer",
            },
          },
        },
      },
    });

    //sign in with jwt token
    const accessToken = jwt.sign(
      {
        id: usersave.id,
        roles: usersave.roles,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: usersave.id,
        roles: usersave.roles,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );


    return res.status(201).json({
      message: "User created successfully",
      data: usersave,
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

module.exports = register;
