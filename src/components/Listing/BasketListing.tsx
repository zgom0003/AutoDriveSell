import "./BasketListing.css";
import "./Listing.css";

import { ListingInfo } from "../../types/listing";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

export default function BasketListing(props: ListingInfo) {
  return (
    <Link className="b-container" to={"/products/" + props.productLink}>
      <img src={props.imgSrc} alt="listing img" className="b-image" />
      <div className="row space-between w_100">

        <div className="col space-between">
            <div className="">
                <p className="title">{props.title}</p>
                {props.rating && <Rating rating={props.rating} />}
            </div>
            <div className="">
                <p className="price">By {props.creator}</p>
                <p className="price">For {props.vehicleType}'s</p>
            </div>

        </div>

        <div className="col space-between" style={{padding: '10px'}}>

            <p className="b-price">{"$" + props.price.toLocaleString()}</p>
            <p>Delete</p>

        </div>
        
      </div>
    </Link>
  );
}
