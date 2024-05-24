import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import Listing from "../../components/Listing/Listing";
import Rating from "../../components/Rating/Rating";

import { useEffect, useMemo, useState } from "react";

import "./Catalogue.css";
import { CatalogRetrieve } from "../../types/catalog-retrieve";

type SortByOptions = "priceHighLow" | "priceLowHigh";

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

  const [itemCount, setItemCount] = useState(10);
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortByOptions | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  const [cheapestProduct, setCheapestProduct] = useState<number>(0);
  const [mostExpensiveProduct, setMostExpensiveProduct] = useState<number>(100000);

  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (rating) urlParams.set("rating", rating.toString());
    if (sortBy) urlParams.set("sortBy", sortBy.toString());
    if (priceRange) urlParams.set("priceRange", priceRange.toString());
    console.log(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/catalog?${urlParams.toString()}`);

    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/catalog?${urlParams.toString()}`)
      .then((res) => res.json())
      .then((data: CatalogRetrieve[]) => {
        setProducts(data);
        if (rating === null && sortBy === null && priceRange === null) {
          setCheapestProduct(getCheapestProductOption(data));
          setMostExpensiveProduct(getMostExpensiveProductOption(data));
        }
      });
  }, [itemCount, rating, sortBy, priceRange]);

  const ProductDisplay = () => (
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
        {products.map((listing, i) => (
          <Listing {...listing} key={i} />
        ))}
      </div>

      <Button variant="contained" sx={{ width: 300 }} onClick={() => setItemCount((prev) => prev + 5)}>
        Show More
      </Button>
    </div>
  );

  return (
    <div className="catalog-page">
      <div className="filter-form">
        <h2>Filter By</h2>
        <div className="divider"></div>

        <p>
          <b>Rating</b>
        </p>
        <RatingFilter setRating={setRating} rating={rating} />
        <div className="divider"></div>

        <p>
          <b>Price Range</b>
        </p>
        <MinimumDistanceSlider setPriceRange={setPriceRange} min={cheapestProduct} max={mostExpensiveProduct} />

        <div className="divider"></div>
        <p>
          <b>Sort By</b>
        </p>
        <RadioButtonsGroup setSortBy={setSortBy} />

        <div className="divider"></div>
      </div>

      <ProductDisplay />
    </div>
  );
}

function RatingFilter(props: { setRating: (rating: number | null) => void; rating: number | null }) {
  const handleRatingClick = (rating: number) => {
    if (rating == props.rating) {
      props.setRating(null);
    } else {
      props.setRating(rating);
    }
  };

  return (
    <div className="ratings-filter">
      <div
        className={`rating-button ${props.rating === 5 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(5)}
      >
        <Rating rating={5.0} />
      </div>
      <div
        className={`rating-button ${props.rating === 4 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(4)}
      >
        <Rating rating={4.0} />
      </div>
      <div
        className={`rating-button ${props.rating === 3 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(3)}
      >
        <Rating rating={3.0} />
      </div>
      <div
        className={`rating-button ${props.rating === 2 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(2)}
      >
        <Rating rating={2.0} />
      </div>
      <div
        className={`rating-button ${props.rating === 1 ? "rating-button-selected" : ""}`}
        onClick={() => handleRatingClick(1)}
      >
        <Rating rating={1.0} />
      </div>
    </div>
  );
}

function RadioButtonsGroup({ setSortBy }: { setSortBy: (sortBy: SortByOptions | null) => void }) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value as SortByOptions);
  };

  return (
    <FormControl sx={{ color: "lightgray" }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <FormControlLabel
          value="priceLowHigh"
          control={<Radio sx={{ color: "lightgray" }} />}
          label="Price - Low to High"
        />
        <FormControlLabel
          value="priceHighLow"
          control={<Radio sx={{ color: "lightgray" }} />}
          label="Price - High to Low"
        />
      </RadioGroup>
    </FormControl>
  );
}

function MinimumDistanceSlider(props: { setPriceRange: (priceRange: string) => void; min: number; max: number }) {
  const minDistance = 10;

  const [value1, setValue1] = React.useState([props.min, props.max]);

  useEffect(() => {
    props.setPriceRange(`${value1[0]}:${value1[1]}`);
  }, [value1]);

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