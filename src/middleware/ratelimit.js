const { rateLimit } = require("express-rate-limit");

// Create Rate Limiter function
function createRateLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: message,
    headers: true,
    skipSuccessfulRequests: true,
  });
}




module.exports = createRateLimiter;
