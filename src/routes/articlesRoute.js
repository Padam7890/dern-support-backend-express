
const express = require("express");
const createArticles = require("../controllers/articles/create.controller");
const getarticles = require("../controllers/articles/index.controller");
const articleView = require("../controllers/articles/articleview.controller");
const updatearticles = require("../controllers/articles/update.controller");
const deleteArticle = require("../controllers/articles/deleteArticle.controller");
const router = express.Router();


router.post('/', createArticles);
router.get('/', getarticles);
router.get('/:id',articleView );
router.put('/:id',updatearticles);
router.delete('/:id',deleteArticle);

module.exports = router;