import express from "express";
import prisma from "../prisma/prismaClient";
import { loggedIn } from "./auth";

const adminRouter = express.Router();

adminRouter.post("/", async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  // Validate required fields
  if (!name || !price || !imageUrl) {
    return res.status(400).json({ message: "Name, price, and imageUrl are required." });
  }

  // Validate and parse price
  const priceInt = parseInt(price);
  if (isNaN(priceInt)) {
    return res.status(400).json({ message: "Invalid price value." });
  }

  try {
    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
      },
    });

    // Create a ProductOption
    const productOption = await prisma.productOption.create({
      data: {
        productId: newProduct.id,
        name: 'Default Option', // Adjust as needed
        price: priceInt,
      },
    });

    // Create a ProductImage
    const productImage = await prisma.productImage.create({
      data: {
        productId: newProduct.id,
        imageUrl,
      },
    });

    res.status(201).json({
      product: newProduct,
      productOption,
      productImage,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});


// GET endpoint to fetch all products (modify to filter by admin logic if possible)
adminRouter.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      // Not filtering by adminId; fetching all products
      include: {
        productOptions: true,
        images: true,
        category: true
      }
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

adminRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

export default adminRouter;