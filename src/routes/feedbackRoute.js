const express = require("express");
const customerFeedback = require("../controllers/customerFeedback/create.controller");
const router = express.Router();

router.post('/',  customerFeedback)

module.exports = router;