import express from "express";
import { products, getNewProducts } from "./products"

const router = express.Router();

router.get('/api/catalog', (req, res) => {

    const { itemCount, rating, sortBy, priceRange } = req.query;

    console.log(itemCount, rating, sortBy, priceRange);

    // Adjust item count
    if (itemCount > products.length) {
        const newItems = itemCount - products.length;
        products.push(...getNewProducts(newItems, products.length));
    }

    let sortedProducts = products;

    // Adjust price filters
    sortedProducts = priceFilters(products, sortBy, priceRange);

    // Adjust rating filters
    sortedProducts = ratingFilters(sortedProducts, Number(rating));

    res.status(200).json({ products: sortedProducts });
});

const ratingFilters = (products, ratingFilter) => {

    if (!ratingFilter) return products;

    const minRating = ratingFilter;
    const maxRating = ratingFilter + 0.9;
    return products.filter(product => (product.rating >= minRating) && (product.rating <= maxRating));

};

const priceFilters = (products, sortBy, priceRange) => {

    const sortByPriceAscending = (products) => {
        return products.slice().sort((a, b) => a.price - b.price);
    };

    const sortByPriceDescending = (products) => {
        return products.slice().sort((a, b) => b.price - a.price);
    };

    const filterByPriceRange = (products, minPrice, maxPrice) => {
        return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    };

    let sortedProd = [];

    if (sortBy == 'low')
        sortedProd = sortByPriceAscending(products);
    else if (sortBy == 'high')
        sortedProd = sortByPriceDescending(products);
    else
        sortedProd = products;
    
    if (priceRange) {
        const minPrice = Number(priceRange.split(':')[0]);
        const maxPrice = Number(priceRange.split(':').pop());
        sortedProd = filterByPriceRange(sortedProd, minPrice, maxPrice);
    }

    return sortedProd;
}

export default router;