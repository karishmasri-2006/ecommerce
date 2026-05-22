const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// CREATE product - admin only
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, price: parseInt(price), description, image, stock: parseInt(stock) }
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// CHECKOUT - clears user cart
router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await prisma.user.update({
      where: { id: userId },
      data: { cart: [] }
    });
    res.json({ success: true, message: 'Checkout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// TEMP SEED ROUTE - DELETE AFTER USE
router.get('/seed', async (req, res) => {
  try {
    const products = await prisma.product.createMany({
      data: [
        { 
          name: 'Smart Watch', 
          price: 2999, 
          description: 'Fitness smartwatch with heart rate monitor',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 
          stock: 10 
        },
        { 
          name: 'Wireless Earbuds', 
          price: 1999, 
          description: 'Noise cancelling bluetooth earbuds',
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400', 
          stock: 15 
        },
        { 
          name: 'Bluetooth Speaker', 
          price: 1499, 
          description: 'Portable waterproof speaker',
          image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', 
          stock: 20 
        },
        { 
          name: 'Laptop Stand', 
          price: 899, 
          description: 'Adjustable aluminum laptop stand',
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 
          stock: 30 
        },
      ],
      skipDuplicates: true,
    });
    res.json({ success: true, message: `Added ${products.count} products` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;