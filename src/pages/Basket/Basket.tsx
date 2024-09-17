import { useEffect, useState } from "react";
import { ListingInfo } from "../../types/listing";

import './Basket.css';
import BasketListing from "../../components/Listing/BasketListing";
import { Button } from "@mui/material";
import { CatalogRetrieve } from "../../types/catalog-retrieve";

const KEY = 'basket';

export default function Basket() {

    const [ items, setItems ] = useState<CatalogRetrieve[]>([]);

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

//@ts-expect-error Sort this out later, not sure what type of obj items is
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
            <div className="b-divider"></div>
            {items.map((item: CatalogRetrieve, index: number) => (
                <>
                <BasketListing {...item} key={index}/>
                <div className="b-divider"></div>
                </>
            ))}

        </div>
    );
}

function Bill({ items }: { items: CatalogRetrieve[] }) {
    return (
        <>
            <div className="bill">
                Subtotal ({items.length} items): ${items.reduce((acc, item) => acc + item.productOptions[0].price, 0)}
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