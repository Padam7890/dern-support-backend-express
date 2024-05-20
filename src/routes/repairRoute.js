const express = require("express");
const getAllRepairs = require("../controllers//repair/index.controller");
const viewRepair = require("../controllers/repair/viewrepair.controller");
const updateStatus = require("../controllers/repair/updatestatus.controller");
const deleteRepair = require("../controllers/repair/delete.controller");
const router = express.Router();


router.get('/', getAllRepairs);
router.get('/:id', viewRepair);
router.patch('/:id', updateStatus)
router.delete('/:id', deleteRepair)


module.exports = router;