const express = require("express");
const createRequest = require("../controllers/Requests/createrequest.controller");
const getRequest = require("../controllers/Requests/index.controller");
const requestView = require("../controllers/Requests/viewrequest.controller");
const router = express.Router();

router.post('/',  createRequest);
router.get('/', getRequest );
router.get('/:id', requestView)

module.exports = router;