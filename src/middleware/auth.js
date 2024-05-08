const jwt = require("jsonwebtoken");

const checkAuth = (request, response, next) => {
  let token = request.headers.authorization;
   console.log(token);
   
  if (!token) {
    response.status(401).json({ message: "Not Logged in" });
    return;
  }

  try {
    token = token.split(" ")[1];
    
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    request.user = decoded;
    
    next();
  } catch (error) {
    response.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAuth;
