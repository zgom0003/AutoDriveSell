import express from "express";
import { products, getNewProducts } from "./products"

const router = express.Router();

router.get('/api/catalog', (req, res) => {

    const { itemCount, rating, sortBy, priceRange } = req.query;

    try {
        // Adjust item count
        addItems(itemCount, products);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding new getting new products', error: error.message })
    }

    // This is the modified list of items we will send back
    let sortedProducts = products;

    try {
        // Adjust price filters
        sortedProducts = priceFilters(products, sortBy, priceRange);
    } catch (error) {
        return res.status(500).json({ message: 'Error applying price filter to product list', error: error.message })
    }

    try {
        // Adjust rating filters
        sortedProducts = ratingFilters(sortedProducts, Number(rating));
    } catch (error) {
        return res.status(500).json({ message: 'Error applying rating filter to product list', error: error.message })
    }

    res.status(200).json({ products: sortedProducts });
});

const addItems = (itemCount, products) => {

    if (itemCount > products.length) {
        const newItems = itemCount - products.length;
        products.push(...getNewProducts(newItems, products.length));
    }
}

const ratingFilters = (products, rating) => {

    if (!rating) return products;

    const minRating = rating;
    const maxRating = rating + 0.9;
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

export {
    addItems, ratingFilters, priceFilters
}