import "./BasketListing.css";
import "./Listing.css";

import { ListingInfo } from "../../types/listing";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { CatalogRetrieve } from "../../types/catalog-retrieve";
import { getAvgRating } from "./Listing";

export default function BasketListing(props: CatalogRetrieve) {

  const handleDelete = () => {
    const KEY = "basket";

    const readLS = () => {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : [];
    };

    let cart: CatalogRetrieve[] = readLS();
    const index = cart.findIndex((item) => item.id === props.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }

    localStorage.setItem(KEY, JSON.stringify(cart));

    window.location.reload();
  }

  return (
    <>
      <div className="b-container" >
        <Link to={"/products/" + props.id}>
        <img src={props.images[0].imageUrl} alt="listing img" className="b-image" />
        </Link>
        
        <div className="row space-between w_100">

          <div className="col space-between" style={{maxWidth: "60%"}}>
              
              <div className="">
                  <p className="title">{props.name}</p>
                  {props.reviews.length > 0 && <Rating rating={getAvgRating(props.reviews)} />}
              </div>

          </div>

          <div className="col space-between" style={{padding: '10px'}}>

              <p className="b-price">{"$" + props.productOptions[0].price.toLocaleString()}</p>
              <Button variant="contained" style={{marginLeft: "-5px"}}
                onClick={handleDelete}>
                Delete
              </Button>

          </div>
          
        </div>
      </div>
    </>
    
  );
}
