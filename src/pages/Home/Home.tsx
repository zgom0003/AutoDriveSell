import "./Home.css";
import Button from "@mui/material/Button";

export default function HomePage() {
  return (
    <div className="banner-container">
      <img className="banner-image" src="/background-banner.webp" />
      <div className="banner-overlay">
        <p className="heading">Innovation.</p>
        <p className="heading">Freedom.</p>
        <p className="sub-heading">Self-Driving Solutions</p>
        <Button variant="contained" color="secondary">EXPLORE NOW</Button>
      </div>
    </div>
  );
}
