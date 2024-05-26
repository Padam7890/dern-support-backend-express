const express = require("express");
const dailyJobs = require("../controllers/dailyJob/dailyJobs.controller");
const Router = express.Router();

Router.get('/', dailyJobs );

module.exports = Router;