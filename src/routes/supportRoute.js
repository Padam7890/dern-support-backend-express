const express = require("express");
const createRequest = require("../controllers/Requests/createrequest.controller");
const getRequest = require("../controllers/Requests/index.controller");
const requestView = require("../controllers/Requests/viewrequest.controller");
const statusUpdate = require("../controllers/requests/statusupdate.controller");
const deleterequest = require("../controllers/requests/delete.controller");
const router = express.Router();

router.post('/',  createRequest);
router.get('/', getRequest );
router.get('/:id', requestView);
router.delete('/:id', deleterequest)
router.patch('/status/:id', statusUpdate)

module.exports = router;