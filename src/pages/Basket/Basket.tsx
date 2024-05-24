import { useEffect, useState } from "react";
import { ListingInfo } from "../../types/listing";
import Listing from "../../components/Listing/Listing";

import './Basket.css';
import BasketListing from "../../components/Listing/BasketListing";
import Button from "@mui/material/Button/Button";

const KEY = 'basket';

export default function Basket() {

    const [ items, setItems ] = useState<ListingInfo[]>([]);

    // Read items
    useEffect(() => {

        const imgSrc = "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";

        // Getting items
        const mockItems: ListingInfo[] = [
            {
                imgSrc: imgSrc,
                title: 'item1',
                price: 200,
                rating: 5,
                productLink: `item1`,
                description: 'new item',
                creator: 'Hyundai',
                vehicleType: 'Sedan'
            },
            {
                imgSrc: imgSrc,
                title: 'item2',
                price: 300,
                rating: 4.2,
                productLink: `item2`,
                description: 'new item',
                creator: 'BYD',
                vehicleType: 'SUV'
            },
            {
                imgSrc: imgSrc,
                title: 'item3',
                price: 400,
                rating: 5,
                productLink: `item3`,
                description: 'new item',
                creator: 'Tesla',
                vehicleType: 'Sedan'
            },
        ]

        // Setting items
        setItems(mockItems);

    }, [])

    return (
        <div className="mainBox" style={{}}>
            <Items items={items} />
            <Bill items={items} />
        </div>
    );
}

function Items( {items} ) {

    const readLS = () => {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data): [];
    }

    const addLS = (value) => {
        const existingData = readLS();
        existingData.push(value);
        localStorage.setItem(KEY, JSON.stringify(existingData));
    }

    const deleteLS = (value) => {
        const existingData = readLS();
        const updateData = existingData.filter(item => item != value);
        localStorage.setItem(KEY, updateData);
    }

    // Delete items
    const handleDelete = (index: number) => {
        return index;
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            background: "",
            padding: "30px",
            maxWidth: '900px'
        }}
        >
            <div className="b-divider"></div>
            {items.map((item: ListingInfo, index: number) => (
                <>
                <BasketListing {...item} key={index}/>
                <div className="b-divider"></div>
                </>
            ))}

        </div>
    );
}

function Bill({ items }: { items: ListingInfo[] }) {
    return (
        <>
            <div className="bill">
                Subtotal ({items.length} items): ${items.reduce((acc, item) => acc + item.price, 0)}
            </div>
        </>
    )
}