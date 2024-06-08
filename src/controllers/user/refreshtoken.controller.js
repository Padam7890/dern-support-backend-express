const jwt = require("jsonwebtoken");

const refreshTokenCheck = (request, response) => {
  const {refreshToken}= request.params;
  console.log("refresh Token "+JSON.parse(refreshToken));

  const convertRefreshToken =JSON.parse(refreshToken);

  if (!convertRefreshToken) {
    return response.status(406).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(convertRefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
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
        expiresIn: "7d",
      }
    );

    // Send the new access token in the response
    response.json({ accessToken: accessToken });
  });
};

module.exports = refreshTokenCheck;
