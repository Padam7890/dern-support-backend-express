const { prisma } = require("../configs/prisma");

const articles = prisma.knowledgeBaseArticle;

module.exports= articles;