import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

import Listing from "../../components/Listing/Listing";
import Rating from "../../components/Rating/Rating";

import { useEffect, useState } from "react";

import "./Catalogue.css";
import { CatalogRetrieve } from "../../types/catalog-retrieve";
import { Review } from "../../types/review";
import { useFilterContext } from "../../context/FilterFormContext";

const SortingOptions = {
  PRICE_ASSENDING: 0,
  PRICE_DECENDING: 1,
};

const getCheapestProductOption = (products: CatalogRetrieve[]): number => {
  let cheapestOption = products?.[0]?.productOptions?.[0];
  if (!cheapestOption) return 0;

  products.forEach((product) => {
    product.productOptions.forEach((option) => {
      if (option.price < cheapestOption.price) cheapestOption = option;
    });
  });

  return cheapestOption.price;
};

const getMostExpensiveProductOption = (products: CatalogRetrieve[]): number => {
  let mostExpensiveOption = products?.[0]?.productOptions?.[0];
  if (!mostExpensiveOption) return 100000;

  products.forEach((product) => {
    product.productOptions.forEach((option) => {
      if (option.price > mostExpensiveOption.price) mostExpensiveOption = option;
    });
  });
  return mostExpensiveOption.price;
};

export default function Catalogue() {
  const [products, setProducts] = useState<CatalogRetrieve[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CatalogRetrieve[]>([]);

  // number of items to be retireved from the backend
  const [itemCount, setItemCount] = useState(10);

  const [cheapestProduct, setCheapestProduct] = useState<number>(0);
  const [mostExpensiveProduct, setMostExpensiveProduct] = useState<number>(100000);
  const { sortBy, rating, minPrice, maxPrice } = useFilterContext();

  // On mount, make this call to the server
  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/products`)
      .then((res) => res.json())
      .then((data: CatalogRetrieve[]) => {
        setProducts(data);
        setFilteredProducts(data);

        // Basically this just sets the slider limits based on the items
        // returned from the database
        setCheapestProduct(getCheapestProductOption(data));
        setMostExpensiveProduct(getMostExpensiveProductOption(data));
      });
  }, [itemCount]);

  // if the any filters change apply them to the product array
  useEffect(() => {
    let sortedProducts: CatalogRetrieve[] = [...products];

    if (rating) {
      console.log("Filtering on rating...");
      sortedProducts = sortedProducts.filter(
        // Filter function
        (a: CatalogRetrieve) => {
          // Sum all the numbers in the review rating and divide by total length
          const getAverageReviews = (reviews: Review[]): number =>
            // The [].reduce() is used to aggegrate values into acc
            reviews.reduce(
              // sum function as first argument to [].reduce
              (acc: number, currentReview: Review) => acc + currentReview.rating,
              // Starting aggegrate value as second argument to [].reduce
              0
            ) / reviews.length; // Divide by length to get average

          const aReviews = getAverageReviews(a.reviews);

          // eg: rating = 4, returns products with rating 3.xx to 4
          const upperLimit = rating;
          const lowerLimit = rating - 1;
          return aReviews <= upperLimit && aReviews > lowerLimit;
        }
      );
    }

    sortedProducts = sortedProducts.filter((product: CatalogRetrieve) => {
      return product.productOptions[0]!.price! >= minPrice && product.productOptions[0]!.price! <= maxPrice;
    });

    const getPrice = (product: CatalogRetrieve): number => {
      return product.productOptions[0]!.price || 0;
    };
    sortedProducts.sort((a: CatalogRetrieve, b: CatalogRetrieve) => {
      if (sortBy == SortingOptions.PRICE_ASSENDING) return getPrice(a) - getPrice(b);
      else if (sortBy == SortingOptions.PRICE_DECENDING) return getPrice(b) - getPrice(a);
      return 0;
    });

    setFilteredProducts(sortedProducts);
  }, [rating, sortBy, minPrice, maxPrice]);

  return (
    <div className="catalog-page">
      <FilterForm cheapestProduct={cheapestProduct} mostExpensiveProduct={mostExpensiveProduct} />
      <ProductDisplay products={filteredProducts} />
    </div>
  );
}

const ProductDisplay = (props: { products: CatalogRetrieve[] }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      <div className="catalog-grid">
        {props.products.map((listing, i) => (
          <Listing {...listing} key={i} />
        ))}
      </div>

      {/* <Button variant="contained" sx={{ width: 300 }} onClick={() => setItemCount((prev) => prev + 5)}>
        Show More
      </Button> */}
    </div>
  );
};

const FilterForm = (props: { cheapestProduct: number; mostExpensiveProduct: number }) => {
  return (
    <div className="filter-form">
      <h2>Filter & Sort</h2>

      <div className="divider"></div>

      <p>
        <b>Rating</b>
      </p>
      <RatingFilter />

      <div className="divider"></div>

      <p>
        <b>Price Range</b>
      </p>
      <MinimumDistanceSlider min={props.cheapestProduct} max={props.mostExpensiveProduct} />

      <div className="divider"></div>

      <p>
        <b>Sort By</b>
      </p>
      <RadioButtonsGroup />

      <div className="divider"></div>
    </div>
  );
};

function RatingFilter() {
  const { rating, setRating } = useFilterContext();
  const handleRatingClick = (newRating: number) => {
    if (rating === newRating) {
      setRating(null);
    } else {
      setRating(newRating);
    }
  };

  return (
    <div className="ratings-filter">
      <div
        className={`rating-button ${rating === 5 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(5)}
      >
        <Rating rating={5.0} />
      </div>
      <div
        className={`rating-button ${rating === 4 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(4)}
      >
        <Rating rating={4.0} />
      </div>
      <div
        className={`rating-button ${rating === 3 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(3)}
      >
        <Rating rating={3.0} />
      </div>
      <div
        className={`rating-button ${rating === 2 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(2)}
      >
        <Rating rating={2.0} />
      </div>
      <div
        className={`rating-button ${rating === 1 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(1)}
      >
        <Rating rating={1.0} />
      </div>
    </div>
  );
}

function RadioButtonsGroup() {
  const { sortBy, setSortBy } = useFilterContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(Number(event.target.value));
  };

  return (
    <FormControl sx={{ color: "black" }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={sortBy}
        onChange={handleChange}
      >
        <FormControlLabel
          value={SortingOptions.PRICE_ASSENDING}
          control={<Radio sx={{ color: "lightgray" }} />}
          label="Price - Low to High"
        />
        <FormControlLabel
          value={SortingOptions.PRICE_DECENDING}
          control={<Radio sx={{ color: "lightgray" }} />}
          label="Price - High to Low"
        />
      </RadioGroup>
    </FormControl>
  );
}

function MinimumDistanceSlider(props: { min: number; max: number }) {
  const { setMinPrice, setMaxPrice } = useFilterContext();
  const minDistance = 10;

  const [value1, setValue1] = React.useState([props.min, props.max]);

  useEffect(() => {
    setMinPrice(value1[0]);
    setMaxPrice(value1[1]);
  }, [value1, props]);

  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 170 }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        min={props.min}
        max={props.max}
        value={value1}
        step={5}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => "$" + value}
        disableSwap
      />
    </Box>
  );
}
