const { prisma } = require("../configs/prisma");

const dailyJob = prisma.dailyJob;

module.exports= dailyJob;