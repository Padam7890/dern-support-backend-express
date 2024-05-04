const jwt = require("jsonwebtoken");

const refreshTokenCheck = (request, response) => {
  const {refreshToken}= request.params;
  console.log("refresh Token "+ refreshToken);

  if (!refreshToken) {
    return response.status(406).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return response.status(406).json({
        message: "Unauthorized",
      });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Send the new access token in the response
    response.json({ accessToken: accessToken });
  });
};

module.exports = refreshTokenCheck;
