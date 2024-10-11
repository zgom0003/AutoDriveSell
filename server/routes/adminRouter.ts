import express from "express";
import prisma from "../prisma/prismaClient";
import { loggedIn } from "./auth";

const adminRouter = express.Router();

// POST endpoint to add a new product
adminRouter.post("/", async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    // Creating the product without assigning an adminId since the schema hasn't changed
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        imageUrl
      },
    });
    res.status(201).json(newProduct);
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

export default adminRouter;