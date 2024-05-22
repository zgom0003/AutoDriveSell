import { beforeAll, describe, test, expect } from '@jest/globals';

import { products } from "./products"
import { ratingFilters, priceFilters } from "./catalog"

describe('Testing Catalog api (/api/catalog)', () => {
    
    test('Rating Filter', () => {

        const rating = 1;

        const minRating = rating;
        const maxRating = rating + 0.9;

        const expectedProducts =  products.filter(product => (product.rating >= minRating) && (product.rating <= maxRating));
        const sortedProducts = ratingFilters(products, rating);
        
        expect(sortedProducts).toStrictEqual(expectedProducts);
    });

    describe('Price Filter', () => {

        let priceMock = [];

        beforeAll(() => {
            const prices = [
                100, 200, 250, 251, 300, -1, 0,
            ]

            priceMock = [];
            for (let i = 0; i < prices.length; i++)
                priceMock.push({price: prices[i]});
        });

        test('Price Range (inclusive)', () => {
            const priceRange = '250:251';
            const sortedProducts = priceFilters(priceMock, undefined, priceRange);
            expect(sortedProducts).toStrictEqual([{price: 250}, {price: 251}]);
        });
    });
})