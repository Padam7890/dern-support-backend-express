const express = require("express");
const register = require("../controllers/user/register.controller");
const getallusers = require("../controllers/user/getalluser.controller");
const refreshTokenCheck = require("../controllers/user/refreshtoken.controller");
const login = require("../controllers/user/login.controller");
const getuserdetails = require("../controllers/user/getuser.controller");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.post('/register',  register);
router.post('/login', login);

router.get('/users',  getallusers);
router.get('/user', checkAuth, getuserdetails  );

router.patch('/refresh_token/:refreshToken',refreshTokenCheck);

module.exports = router;

