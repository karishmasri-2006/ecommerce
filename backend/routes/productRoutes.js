const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEED - Matches your screenshot products
router.get('/seed', async (req, res) => {
  try {
    await prisma.product.deleteMany(); // Clear old products first
    const products = await prisma.product.createMany({
      data: [
        {
          name: 'Wireless Headphones',
          price: 2999,
          description: 'Over-ear headphones',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          stock: 10
        },
        {
          name: 'Smart Watch',
          price: 4999,
          description: 'Fitness smartwatch',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          stock: 15
        },
        {
          name: 'Wireless Mouse',
          price: 1499,
          description: 'Ergonomic wireless mouse',
          imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
          stock: 20
        },
        {
          name: 'Power Bank',
          price: 1999,
          description: '10000mAh power bank',
          imageUrl: 'https://images.unsplash.com/photo-1609592806598-04d7d7d01a52?w=400',
          stock: 30
        },
      ]
    });
    res.json({ success: true, message: `Added ${products.count} products` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/seed", async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  try {
    await prisma.product.deleteMany();
    await prisma.product.createMany({
      data: [
        { name: 'Wireless Headphones', price: 2999, description: 'Over-ear headphones' },
        { name: 'Smart Watch', price: 4999, description: 'Fitness smartwatch' },
        { name: 'Wireless Mouse', price: 1499, description: 'Ergonomic wireless mouse' },
        { name: 'Power Bank', price: 1999, description: '10000mAh power bank' },
      ]
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;