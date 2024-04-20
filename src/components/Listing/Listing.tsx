import "./Listing.css";

import { ListingInfo } from "../../types/listing";

export default function Listing(props: ListingInfo) {
  return (
    <div className="container">
      <img src={props.imgSrc} alt="listing img" className="image" />
      <p className="title">{props.title}</p>
      <p className="price">{"from $" + props.price.toLocaleString()}</p>
      <p className="rating">{props.rating?.toFixed(1)}</p>
    </div>
  );
}
