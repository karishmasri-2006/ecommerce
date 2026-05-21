const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({
    message: 'Ecommerce API is live 🔥',
    status: 'running',
    version: 'FIXED-V2'
  });
});

// GET PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to fetch products'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});