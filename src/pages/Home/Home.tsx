import Listing from "../../components/Listing/Listing";
import { ListingInfo } from "../../types/listing";
import "./Home.css";
import Button from "@mui/material/Button";

const imgSrc =
  "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";
const popularListings: ListingInfo[] = [
  { imgSrc: imgSrc, title: "Product 1", price: 15000, rating: 5.0 },
  { imgSrc: imgSrc, title: "Product 2", price: 9000, rating: 5.0 },
  { imgSrc: imgSrc, title: "Product 3", price: 14000, rating: 5.0 },
];

export default function HomePage() {
  return (
    <>
      <div className="banner-container">
        <img
          className="banner-image"
          src="/hero.webp"
          srcSet="/hero-mobile.webp 1500w, /hero.webp 3232w"
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="banner-overlay">
          <p className="heading">Innovation.</p>
          <p className="heading">Freedom.</p>
          <p className="sub-heading">Self-Driving Solutions</p>
          <Button variant="contained" color="secondary" size="large">
            EXPLORE NOW
          </Button>
        </div>
      </div>
      <div className="products-container">
        <p className="popular-picks">POPULAR PICKS</p>
        <div className="listing-grid">
          {popularListings.map((listing) => (
            <Listing {...listing} />
          ))}
        </div>
        <Button
          variant="contained"
          sx={{
            paddingX: "48px",
            marginTop: "32px"
          }}
          size="large"
        >
          VIEW ALL
        </Button>
      </div>
    </>
  );
}
