const express = require("express");
const register = require("../controllers/user/register.controller");
const getallusers = require("../controllers/user/getalluser.controller");
const refreshTokenCheck = require("../controllers/user/refreshtoken.controller");
const router = express.Router();

router.post('/register', register);
router.get('/', getallusers)
router.patch('/refresh_token/:refreshToken',refreshTokenCheck);

module.exports = router;

