const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(cors()); // Allows your frontend to call backend
app.use(express.json()); // Parse JSON bodies

// 2. Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: "Ecommerce API is live 🔥", 
    status: "running", 
    version: "FIXED-V2" 
  });
});

// 3. Test products route
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 4. AUTH ROUTES - ADD THESE
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await prisma.user.create({
      data: { email, password, name }
    });
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ message: 'User created', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json({ message: 'Login success', user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 5. Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});