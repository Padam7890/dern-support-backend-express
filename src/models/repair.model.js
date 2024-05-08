const { prisma } = require("../configs/prisma");


const repairJob = prisma.repairJob;

module.exports = repairJob;