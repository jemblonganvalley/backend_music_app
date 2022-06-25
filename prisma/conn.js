const { PrismaClient } = require("@prisma/client")

const conn = new PrismaClient()

module.exports = conn