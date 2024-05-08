const express = require("express");
const createRequest = require("../controllers/Requests/createrequest.controller");
const checkAuth = require("../middleware/auth");
const router = express.Router();

router.post('/', checkAuth, createRequest);

module.exports = router;