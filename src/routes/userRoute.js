const express = require("express");
const register = require("../controllers/user/register.controller");
const router = express.Router();

router.get('/register', register);

module.exports = router;

