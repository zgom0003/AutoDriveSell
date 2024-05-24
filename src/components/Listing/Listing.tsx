import "./Listing.css";

import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { CatalogRetrieve } from "../../types/catalog-retrieve";
import { Review } from "../../types/review";

export default function Listing(props: CatalogRetrieve) {
  return (
    <Link className="container" to={"/products/" + props.id}>
      <img src={props.images?.[0].imageUrl} alt="listing img" className="image" />
      <p className="title">{props.name}</p>
      <p className="price">{"from $" + props.productOptions?.[0]?.price?.toLocaleString?.()}</p>
      {props.reviews.length > 0 && <Rating rating={getAvgRating(props.reviews)} />}
    </Link>
  );
}

export const getAvgRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((prev, cur) => prev + cur.rating, 0);
  return sum / reviews.length;
};