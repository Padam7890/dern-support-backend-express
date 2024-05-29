const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

const checkAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Not Logged in" });
  }

  try {
    token = token.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Fetch the user from the database
    const currentUser = await user.findUnique({
      where: { id: decoded.id },
      include: { roles: true },
    });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAuth;
