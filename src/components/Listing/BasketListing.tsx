import "./BasketListing.css";
import "./Listing.css";

import { ListingInfo } from "../../types/listing";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function BasketListing(props: ListingInfo) {

  const handleDelete = () => {

    const KEY = 'basket';

    const readLS = () => {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data): [];
    }

    const existingData = readLS();
    const updateData = existingData.filter((item: ListingInfo) => item.price != props.price);
    localStorage.setItem(KEY, updateData);

    window.location.reload();
  }

  return (
    <>
      <div className="b-container" >
        <Link to={"/products/" + props.productLink}>
        <img src={props.imgSrc} alt="listing img" className="b-image" />
        </Link>
        
        <div className="row space-between w_100">

          <div className="col space-between" style={{maxWidth: "60%"}}>
              
              <div className="">
                  <p className="title">{props.title}</p>
                  {props.rating && <Rating rating={props.rating} />}
              </div>

          </div>

          <div className="col space-between" style={{padding: '10px'}}>

              <p className="b-price">{"$" + props.price.toLocaleString()}</p>
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
