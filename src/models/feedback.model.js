const { prisma } = require("../configs/prisma");

const feedback = prisma.managementData;

module.exports= feedback;