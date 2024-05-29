const { rateLimit } = require("express-rate-limit");

function createRateLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: message,
    headers: true,
    requestWasSuccessful: (req, res) => res.statusCode < 400,
    skipSuccessfulRequests:true,
  });
}



module.exports = createRateLimiter;
