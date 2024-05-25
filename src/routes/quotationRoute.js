const express = require("express");
const saveQuations = require("../controllers/quatition/create.controller");
const quotationStatus = require("../controllers/quatition/quotationstatus.controller");
const router = express.Router();

router.post('/', saveQuations);
router.put('/:id', quotationStatus )

module.exports = router;