import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import "./Rating.css";

interface RatingProps {
  rating: number;
}

function roundToNearestPoint5(number: number) {
  return Math.round(number * 2) / 2;
}

export default function Rating(props: RatingProps) {
  const roundedRating = roundToNearestPoint5(props.rating);
  const numFullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating.toFixed(1).endsWith(".5");
  return (
    <div className="rating__container">
      <div className="rating-stars">
        {Array.from({ length: numFullStars }).map((_, i) => (
          <IoIosStar key={i} />
        ))}
        {hasHalfStar && <IoIosStarHalf />}
      </div>
      <div className="rating-text">{props.rating?.toFixed(1)}</div>
    </div>
  );
}
