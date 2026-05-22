const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST create product - admin only
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), description }
    });
    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST checkout - CLEARS CART
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // 1. Create order
    await prisma.order.create({
      data: {
        userId: userId,
        items: items,
        total: total,
        status: "completed"
      }
    });

    // 2. Clear cart in DB ← THIS FIXES YOUR BUG
    await prisma.user.update({
      where: { id: userId },
      data: { cart: [] }
    });

    res.json({ success: true, message: "Checkout Successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};