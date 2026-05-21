const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ecommerce API is live 🔥',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create product - for testing
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await prisma.product.create({
      data: { name, price, description }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
});