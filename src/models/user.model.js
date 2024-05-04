const { prisma } = require("../configs/prisma");


const user = prisma.user;

module.exports = user;