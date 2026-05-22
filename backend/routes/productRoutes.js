const express = require("express");
const {
  createProduct,
  getProducts,
  checkout
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, createProduct);
router.post("/checkout", authMiddleware, checkout);

module.exports = router;