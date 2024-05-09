const express = require("express");
const createRequest = require("../controllers/Requests/createrequest.controller");
const checkAuth = require("../middleware/auth");
const getRequest = require("../controllers/Requests/index.controller");
const requestView = require("../controllers/Requests/viewrequest.controller");
const router = express.Router();

router.post('/', checkAuth, createRequest);
router.get('/',checkAuth, getRequest );
router.get('/:id', requestView)

module.exports = router;