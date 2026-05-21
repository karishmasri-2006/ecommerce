const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['error'] // This empty options object fixes Node 24
})

module.exports = prisma