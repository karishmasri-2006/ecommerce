const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        stock: stock ? parseInt(stock) : 0,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};