import express from "express";
import prisma from "../prisma/prismaClient";

const adminRouter = express.Router();

// POST endpoint to add a new product
adminRouter.post("/", async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        productOptions: {
          create: [
            {
              name: "Default",
              price: parseInt(price), // Ensure price is an integer
            },
          ],
        },
        images: {
          create: [
            {
              imageUrl,
            },
          ],
        },
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});

// GET endpoint to fetch all products
adminRouter.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        productOptions: true,
        images: true
      }
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// DELETE endpoint to remove a product
adminRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

export default adminRouter;
