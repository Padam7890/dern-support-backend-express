const express = require("express");
const getAllRepairs = require("../controllers/repair");
const router = express.Router();


router.get('/', getAllRepairs)

module.exports = router;