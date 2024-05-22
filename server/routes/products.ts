const imgSrc = "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";

const getNewPrices = (itemCount: number): number[] => {
    const minPrice = 2000;
    const maxPrice = 20000;
    const priceStep = 500;
    const prices: number[] = [];
    for (let i = 0; i < itemCount; i++) {
        const randomStep = Math.floor(Math.random() * ((maxPrice - minPrice) / priceStep + 1));
        const randomPrice = minPrice + randomStep * priceStep;
        prices.push(randomPrice);
    }
    return prices;
}

const getNewRatings = (itemCount: number): number[] => {
    const ratings: number[] = [];
    const minRating = 1.0;
    const maxRating = 5.0;
    const ratingStep = 0.2;

    for (let i = 0; i < itemCount; i++) {
        const randomStep = Math.floor(Math.random() * ((maxRating - minRating) / ratingStep + 1));
        const randomRating = minRating + randomStep * ratingStep;
        ratings.push(parseFloat(randomRating.toFixed(1)));
    }

    return ratings;
}

const getNewProducts = (itemCount, startIndex) => {
    const prices: number[] = getNewPrices(itemCount);
    const ratings: number[] = getNewRatings(itemCount);
    const products: any[] = [];
    
    for (let i = 0; i < itemCount; i++) {
        products.push(
            { imgSrc: imgSrc, title: `Product ${i+1+startIndex}`, price: prices[i], rating: ratings[i], productLink: `item${i+1+startIndex}` }
        );
    }

    return products;
}

const itemCount = 8;
const products: any[] = getNewProducts(itemCount, 0);

export {
    products,
    getNewProducts
}