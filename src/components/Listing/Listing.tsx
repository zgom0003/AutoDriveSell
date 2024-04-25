import "./Listing.css";

import { ListingInfo } from "../../types/listing";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";

export default function Listing(props: ListingInfo) {
  return (
    <Link className="container" to={"/catalog/" + props.productLink}>
      <img src={props.imgSrc} alt="listing img" className="image" />
      <p className="title">{props.title}</p>
      <p className="price">{"from $" + props.price.toLocaleString()}</p>
      {props.rating && <Rating rating={props.rating} />}
    </Link>
  );
}
