const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }
  

module.exports = { prisma , exclude };