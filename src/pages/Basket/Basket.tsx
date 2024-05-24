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

        const readLS = () => {
            const data = localStorage.getItem(KEY);
            return data ? JSON.parse(data): [];
        }

        // Setting items
        setItems(readLS());

    }, [])

    console.log(items);

    return (
        <div className="mainBox" style={{}}>
            {items.length > 0 ? <Items items={items}/> : 
            
            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '400px',
                height: '180px',
            }}
            >
                Your Basket is Currently Empty
            </div>
            }

            <Bill items={items} />
        </div>
    );
}

function Items( {items} ) {

    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: "30px",
            maxWidth: '900px'
        }}
        >
            <div className="divider"></div>
            {items.map((item: ListingInfo, index: number) => (
                <>
                <BasketListing {...item} key={index}/>
                <div className="divider"></div>
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
                <div className="divider" style={{maxWidth: "100%"}}></div>
                <Button
                    variant="contained"
                    style={{minWidth: "80%"}}>
                    Checkout
                </Button>
            </div>
        </>
    )
}