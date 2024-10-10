import express from "express";
import prisma from "../prisma/prismaClient";
//import { Product, ProductImage, ProductOption, Review } from "@prisma/client";

const router = express.Router();

// Getting all products from database
router.get("/", async (req, res) => {

  const products = await prisma.product.findMany({
    include: { productOptions: true, reviews: true, images: { take: 1 } },
  });

  res.status(200).json(products);
});

// get product by product id
router.get("/:id", async (req, res) => {

  const itemId = parseInt(req.params.id);

  if (!itemId) return res.status(404).json({ message: "Invalid product id." });

  const product = await prisma.product.findFirst({
    where: { id: itemId },
    include: { productOptions: true, reviews: true, images: true },
  });

  if (!product) return res.status(404).json({ message: "Product id not found." });

  return res.status(200).json(product);
});


export default router;