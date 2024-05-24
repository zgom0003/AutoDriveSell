import express from "express";
import prisma from "../prisma/prismaClient";
import { Product, ProductImage, ProductOption, Review } from "@prisma/client";

const router = express.Router();

type SortByOptions = "priceHighLow" | "priceLowHigh" | undefined;

type RetrieveItem = Product & { productOptions: ProductOption[]; reviews: Review[]; images: ProductImage[] };

router.get("/api/catalog/popular", async (req, res) => {
  // TODO: Return most popular items based on purchase count.
  const count = req.query.count as string;

  if (!parseInt(count)) return res.status(404).json({ message: "Invalid item count." });
  const products = await prisma.product.findMany({
    include: { productOptions: true, reviews: true, images: { take: parseInt(count) } },
  });

  res.status(200).json(products);
});

router.get("/api/catalog", async (req, res) => {
  const { rating, sortBy, priceRange } = req.query;

  const [minPrice, maxPrice] =
    priceRange === undefined
      ? [undefined, undefined]
      : (priceRange as string).split(":").map((value) => parseInt(value));

  let products: RetrieveItem[] = await prisma.product.findMany({
    include: { productOptions: true, reviews: true, images: { take: 1 } },
  });

  products = ratingFilters(products, parseInt(rating as string));

  products = priceFilters(products, minPrice, maxPrice);

  products = sortProducts(products, sortBy as SortByOptions);

  res.status(200).json(products);
});

router.get("/api/catalog/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);

  if (!itemId) return res.status(404).json({ message: "Invalid product id." });

  const product = await prisma.product.findFirst({
    where: { id: itemId },
    include: { productOptions: true, reviews: true, images: true },
  });

  if (!product) return res.status(404).json({ message: "Product id not found." });

  return res.status(200).json(product);
});

const ratingFilters = (products: RetrieveItem[], rating: number) => {
  const getAvgRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 5;
    const sum = reviews.reduce((prev, cur) => prev + cur.rating, 0);
    return sum / reviews.length;
  };

  if (!rating) return products;

  return products.filter((product) => Math.round(getAvgRating(product.reviews)) == rating);
};

const priceFilters = (products: RetrieveItem[], minPrice?: number, maxPrice?: number) => {
  if (minPrice === undefined || maxPrice === undefined) return products;
  return products.filter((product) => {
    const cheapestOption = getProductCheapestOption(product);
    return cheapestOption.price >= minPrice && cheapestOption.price <= maxPrice;
  });
};

const sortProducts = (products: RetrieveItem[], sortBy?: SortByOptions) => {
  const sortByPriceAscending = (products: RetrieveItem[]) => {
    return products.sort((a, b) => getProductCheapestOption(a).price - getProductCheapestOption(b).price);
  };

  const sortByPriceDescending = (products: RetrieveItem[]) => {
    return products.slice().sort((a, b) => getProductCheapestOption(b).price - getProductCheapestOption(a).price);
  };

  if (!sortBy) return products;

  switch (sortBy) {
    case "priceHighLow":
      return sortByPriceDescending(products);
    case "priceLowHigh":
      return sortByPriceAscending(products);
  }
};

const getProductCheapestOption = (product: RetrieveItem) => {
  return product.productOptions.reduce(
    (prev, option) => (option.price < prev.price ? option : prev),
    product.productOptions?.[0]
  );
};

export default router;