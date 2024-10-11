import { Link } from "react-router-dom";
import Listing from "../../components/Listing/Listing";
import "./Home.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { CatalogRetrieve } from "../../types/catalog-retrieve";

export default function HomePage() {
  const [products, setProducts] = useState<CatalogRetrieve[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

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
          {products.map((listing, i) => (
            <Listing {...listing} key={i} />
          ))}
        </div>
        <Button
          variant="contained"
          sx={{
            paddingX: "48px",
            marginTop: "32px",
            ":hover": {
              color: "black",
            },
          }}
          size="large"
          href="/products"
        >
          VIEW ALL
        </Button>
      </div>
      <div className="support-container">
        <Link className="support-stack support-1" to={"#"}>
          <div className="support-overlay">
            <span className="support-header">Integration Guides</span>
            <span>
              Discover our integration guides designed to simplify the installation process of self-driving systems,
              ensuring a seamless experience.
            </span>
          </div>
          <img className="support-img" src="/support-1.jpg" />
        </Link>
        <Link className="support-stack support-2" to={"#"}>
          <div className="support-overlay">
            <span className="support-header">24/7 Customer Support</span>
            <span>
              Our dedicated live help desk is here to guide you through the options and ensure you find the perfect fit
              for your needs.
            </span>
          </div>
          <img className="support-img" src="/support-2.jpg" />
        </Link>
      </div>
    </>
  );
}
