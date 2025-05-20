import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { getAvgRating } from "../../components/Listing/Listing";
import Rating from "../../components/Rating/Rating";
import { CatalogRetrieve } from "../../types/catalog-retrieve";
import "./Product-Item.css";

export default function ProductItemPage() {
  const [productInfo, setProductInfo] = useState<CatalogRetrieve | null>(null);
  const { itemId } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/products/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductInfo(data);
        console.log(data);
      });
  }, [itemId]);

  if (!productInfo) return null;

  return (
    <main>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Left Side - Image Carousel */}
            <Carousel
              key={windowWidth}
              animation="slide"
              navButtonsAlwaysVisible
              autoPlay={false}
            >
              {productInfo.images.map((item, i) => (
                <div key={i} style={{ width: "100%", height: "40vw", maxHeight: 400, minHeight: 200 }}>
                  <img
                    src={item.imageUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                      display: "block"
                    }}
                    alt={`Product image ${i + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Right Side - Product Information */}
            <h1 className="product-title">{productInfo.name}</h1>
            <p className="product-price">{"$" + productInfo.productOptions[0].price.toLocaleString()}</p>
            {productInfo.reviews.length > 0 && <Rating rating={getAvgRating(productInfo.reviews)} />}
            <p className="product-description">{productInfo.description}</p>
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
              onClick={() => addToCart(productInfo)}
            >
              ADD TO CART
            </Button>
          </Grid>
        </Grid>

        <Grid item paddingTop={"35px"}>
          <h2>Specifications</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor: "#E0E0E0", width: "25%" }}>Vehicle Type</TableCell>
                  <TableCell>{productInfo.vehicletype || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor: "#E0E0E0", width: "25%" }}>Technology</TableCell>
                  <TableCell>{productInfo.technology || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor: "#E0E0E0", width: "25%" }}>Application</TableCell>
                  <TableCell>{productInfo.application || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor: "#E0E0E0", width: "25%" }}>
                    Installation Requirements
                  </TableCell>
                  <TableCell>{productInfo.installation || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <h2>Customer Reviews</h2>
        <Grid item paddingTop={"35px"}>
          <Container sx={{ borderRadius: 2, minHeight: "40px", alignContent: "center" }}>
            {productInfo.reviews.length > 0 ? (
              productInfo.reviews.map((review, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <strong>
                    {review.customer?.firstName
                      ? `${review.customer.firstName} ${review.customer.lastName || ""}`
                      : "Anonymous"}
                  </strong>
                  <Rating rating={review.rating} />
                  <p>{review.description}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </Container>
        </Grid>
        {/* <p>Add Review with Rating here</p> */}
      </Container>
    </main>
  );
}

function addToCart(itemListing: CatalogRetrieve) {

  const KEY = 'basket';

  const readLS = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  }

  const addLS = (value: any) => {
    const existingData = readLS();
    existingData.push(value);
    localStorage.setItem(KEY, JSON.stringify(existingData));
  }

  addLS(itemListing)

  alert('Added to Cart!');

}
