import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

import Listing from "../../components/Listing/Listing";
import { ListingInfo } from "../../types/listing";
import Rating from "../../components/Rating/Rating";

import { useEffect, useState } from 'react';

import './Catalogue.css'

const imgSrc =
  "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";
const popularListings: ListingInfo[] = [
  { imgSrc: imgSrc, title: "Product 1", price: 15000, rating: 4.3, productLink: "item1" },
  { imgSrc: imgSrc, title: "Product 2", price: 9000, rating: 5.0, productLink: "item2" },
  { imgSrc: imgSrc, title: "Product 3", price: 14000, rating: 5.0, productLink: "item3" },
  { imgSrc: imgSrc, title: "Product 4", price: 5000, rating: 4.3, productLink: "item4" },
  { imgSrc: imgSrc, title: "Product 5", price: 10000, rating: 5.0, productLink: "item5" },
  { imgSrc: imgSrc, title: "Product 6", price: 14500, rating: 5.0, productLink: "item6" },
  { imgSrc: imgSrc, title: "Product 7", price: 15500, rating: 4.3, productLink: "item7" },
  { imgSrc: imgSrc, title: "Product 8", price: 8000, rating: 5.0, productLink: "item8" },
  { imgSrc: imgSrc, title: "Product 8", price: 8000, rating: 5.0, productLink: "item8" },
  { imgSrc: imgSrc, title: "Product 8", price: 8000, rating: 5.0, productLink: "item8" },
];

export default function Catalogue() {

    const imgSrc =
  "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";
    const popularListings: ListingInfo[] = [
    { imgSrc: imgSrc, title: "Product 1", price: 15000, rating: 4.3, productLink: "item1" },
    { imgSrc: imgSrc, title: "Product 2", price: 9000, rating: 5.0, productLink: "item2" },
    { imgSrc: imgSrc, title: "Product 3", price: 14000, rating: 5.0, productLink: "item3" },
    { imgSrc: imgSrc, title: "Product 4", price: 5000, rating: 4.3, productLink: "item4" },
    { imgSrc: imgSrc, title: "Product 5", price: 10000, rating: 5.0, productLink: "item5" },
    { imgSrc: imgSrc, title: "Product 6", price: 14500, rating: 5.0, productLink: "item6" },
    { imgSrc: imgSrc, title: "Product 7", price: 15500, rating: 4.3, productLink: "item7" },
    { imgSrc: imgSrc, title: "Product 8", price: 8000, rating: 5.0, productLink: "item8" },
    { imgSrc: imgSrc, title: "Product 9", price: 8000, rating: 5.0, productLink: "item8" },
    { imgSrc: imgSrc, title: "Product 10", price: 8000, rating: 5.0, productLink: "item8" },
    ];

    const [prod, setProd] = useState(popularListings);

    const handleShowMore = () => {

        const newProd = [
            { imgSrc: imgSrc, title: "Product 11", price: 8000, rating: 5.0, productLink: "item8" },
            { imgSrc: imgSrc, title: "Product 12", price: 8000, rating: 5.0, productLink: "item8" },
            { imgSrc: imgSrc, title: "Product 13", price: 8000, rating: 5.0, productLink: "item8" },
            { imgSrc: imgSrc, title: "Product 14", price: 8000, rating: 5.0, productLink: "item8" },
            { imgSrc: imgSrc, title: "Product 15", price: 8000, rating: 5.0, productLink: "item8" },
        ];

        setProd(prevProducts => [...prevProducts, ...newProd]);
    }

    useEffect(() => {
        // fetch products from backend
    }, [])

    return (
        <div className="catalog-page">
            <div className="filter-form"> 
            
                <h2>Filter By</h2>
                <div className="divider"></div>
                <p><b>Rating</b></p>
                <div className="ratings-filter">
                    <div className="rating-button">
                        <Rating rating={5.0} />
                    </div>
                    <div className="rating-button">
                        <Rating rating={4.0} />
                    </div>
                    <div className="rating-button">
                        <Rating rating={3.0} />
                    </div>
                    <div className="rating-button">
                        <Rating rating={2.0} />
                    </div>
                    <div className="rating-button">
                        <Rating rating={1.0} />
                    </div>
                </div>
                <div className="divider"></div>
                <p><b>Price Range</b></p>
                <MinimumDistanceSlider />

                <div className="divider"></div>
                <p><b>Sort By</b></p>
                <RadioButtonsGroup />

                <div className="divider"></div>

            </div>

            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                marginBottom: '30px'
                }}>
                <div className="catalog-grid">
                    {prod.map((listing, i) => (
                        <Listing {...listing} key={i} />
                    ))}
                </div>

                <Button variant="contained" sx={{width: 300}} onClick={handleShowMore}>Show More</Button>
            </div>

        </div>
    );
}

function RadioButtonsGroup() {

    return (
      <FormControl sx={{color: 'lightgray'}}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="newest" control={<Radio sx={{color: 'lightgray'}}/>} label="Newest" />
          <FormControlLabel value="low" control={<Radio sx={{color: 'lightgray'}} />} label="Price - Low to High" />
          <FormControlLabel value="high" control={<Radio sx={{color: 'lightgray'}}/>} label="Price - High to Low" />
        </RadioGroup>
      </FormControl>
    );
}

function MinimumDistanceSlider() {

    function valuetext(value) {
        return `$${value}`;
    }
      
    const minDistance = 1000;

    const [value1, setValue1] = React.useState([0, 20000]);

    const handleChange = (event, newValue, activeThumb) => {
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
            getAriaLabel={() => 'Minimum distance'}
            min={2000}
            max={20000}
            value={value1}
            step={500}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
        />
        </Box>
    );
}