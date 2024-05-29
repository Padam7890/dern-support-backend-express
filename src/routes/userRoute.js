const express = require("express");
const register = require("../controllers/user/register.controller");
const getallusers = require("../controllers/user/getalluser.controller");
const refreshTokenCheck = require("../controllers/user/refreshtoken.controller");
const login = require("../controllers/user/login.controller");
const getuserdetails = require("../controllers/user/getuser.controller");
const checkAuth = require("../middleware/auth");
const deleteUser = require("../controllers/user/deleteUser.controller");
const createRateLimiter = require("../middleware/ratelimit");
const changepassword = require("../controllers/user/changepass.controller");
const forgetPass = require("../controllers/user/forgetpass.controller");
const resetPassword = require("../controllers/user/resetPassword.controller");
const router = express.Router();

const windowMs = 1 * 60 * 1000;
const message = `Too many login attempts. Please try again in 1 Minute`;

router.post("/register", register);
router.post("/login", createRateLimiter(windowMs, 5, message), login);

router.get("/users", getallusers);
router.get("/user", checkAuth, getuserdetails);
router.post("/passwordChanged", checkAuth, changepassword);
router.post("/forgetPassword", forgetPass);
router.patch("/resetpassword/:token", resetPassword);

router.patch("/refresh_token/:refreshToken", refreshTokenCheck);
router.delete("/user/:id", deleteUser);

module.exports = router;
