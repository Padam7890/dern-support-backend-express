const express = require("express");
const getAllRepairs = require("../controllers/repair");
const viewRepair = require("../controllers/repair/viewrepair.controller");
const updateStatus = require("../controllers/repair/updatestatus.controller");
const router = express.Router();


router.get('/', getAllRepairs);
router.get('/:id', viewRepair);
router.patch('/:id', updateStatus)


module.exports = router;