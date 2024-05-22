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

export default function Catalogue() {

    const [products, setProducts] = useState([]);

    const [itemCount, setItemCount] = useState(10);
    const [rating, setRating] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [priceRange, setPriceRange] = useState('2000:20000');

    useEffect(() => {

        fetch(`http://localhost:3000/api/catalog?itemCount=${itemCount}&rating=${rating}&sortBy=${sortBy}&priceRange=${priceRange}`)
            .then(res => res.json())
            .then(data => setProducts(data.products));

    }, [itemCount, rating, sortBy, priceRange]);

    const ProductDisplay = () => (

        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            marginBottom: '30px'
            }}>
            <div className="catalog-grid">
                {products.map((listing, i) => (
                    <Listing {...listing} key={i} />
                ))}
            </div>

            <Button variant="contained" sx={{width: 300}} onClick={() => setItemCount(prev => prev + 5)}>Show More</Button>
        </div>
    );

    return (
        <div className="catalog-page">
            <div className="filter-form"> 
            
                <h2>Filter By</h2>
                <div className="divider"></div>

                <p><b>Rating</b></p>
                <RatingFilter setRating={setRating}/>
                <div className="divider"></div>

                <p><b>Price Range</b></p>
                <MinimumDistanceSlider setPriceRange={setPriceRange}/>

                <div className="divider"></div>
                <p><b>Sort By</b></p>
                <RadioButtonsGroup setSortBy={setSortBy}/>

                <div className="divider"></div>

            </div>

            <ProductDisplay />

        </div>
    );
}

function RatingFilter({ setRating }) {

    const handleChange = (rating) => setRating(rating)

    return (
        <div className="ratings-filter">
            <div className="rating-button" onClick={() => handleChange(5)}>
                <Rating rating={5.0} />
            </div>
            <div className="rating-button" onClick={() => handleChange(4)}>
                <Rating rating={4.0} />
            </div>
            <div className="rating-button" onClick={() => handleChange(3)}>
                <Rating rating={3.0} />
            </div>
            <div className="rating-button" onClick={() => handleChange(2)}>
                <Rating rating={2.0} />
            </div>
            <div className="rating-button" onClick={() => handleChange(1)}>
                <Rating rating={1.0} />
            </div>
        </div>
    );
}

function RadioButtonsGroup({ setSortBy }) {

    const handleChange = (event) => {
        setSortBy(event.target.value);
    }

    return (
      <FormControl sx={{color: 'lightgray'}}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="low" control={<Radio sx={{color: 'lightgray'}} />} label="Price - Low to High" />
          <FormControlLabel value="high" control={<Radio sx={{color: 'lightgray'}}/>} label="Price - High to Low" />
        </RadioGroup>
      </FormControl>
    );
}

function MinimumDistanceSlider({ setPriceRange }) {

    function valuetext(value) {
        return `$${value}`;
    }
      
    const minDistance = 1000;

    const [value1, setValue1] = React.useState([0, 20000]);

    useEffect(() => {
        setPriceRange(`${value1[0]}:${value1[1]}`);
    }, [value1]);

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