
const express = require("express");
const createArticles = require("../controllers/articles/create.controller");
const getarticles = require("../controllers/articles/index.controller");
const articleView = require("../controllers/articles/articleview.controller");
const router = express.Router();


router.post('/', createArticles);
router.get('/', getarticles);
router.get('/:id',articleView )

module.exports = router;