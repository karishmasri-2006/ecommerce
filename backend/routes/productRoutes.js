router.get('/seed', async (req, res) => {
  try {
    const products = await prisma.product.createMany({
      data: [
        { name: 'Smart Watch', price: 2999, description: 'Fitness smartwatch', stock: 10 },
        { name: 'Wireless Earbuds', price: 1999, description: 'Noise cancelling earbuds', stock: 15 },
        { name: 'Bluetooth Speaker', price: 1499, description: 'Portable speaker', stock: 20 },
        { name: 'Laptop Stand', price: 899, description: 'Aluminum laptop stand', stock: 30 },
      ],
      skipDuplicates: true,
    });
    res.json({ success: true, message: `Added ${products.count} products` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});