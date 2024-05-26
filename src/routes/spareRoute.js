const express = require("express");
const createSpareParts = require("../controllers/spareparts/create.controller");
const spareParts = require("../controllers/spareparts/index.controller");
const viewSpareParts = require("../controllers/spareparts/view.controller");
const updateSpareParts = require("../controllers/spareparts/update.controller");
const deleteSpareParts = require("../controllers/spareparts/delete.controller");
const router = express.Router();

router.get("/", spareParts);
router.post("/", createSpareParts);
router.get("/:id", viewSpareParts);
router.put("/:id", updateSpareParts);
router.delete("/:id", deleteSpareParts);

module.exports = router;
