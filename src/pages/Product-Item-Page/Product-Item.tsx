import "./Product-Item.css";
import Carousel from "react-material-ui-carousel";
import { ListingInfo } from "../../types/listing";
import { ItemImage } from "../../types/item-image";
import Rating from "../../components/Rating/Rating";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";

const imgSrc =
  "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn";
const itemListing: ListingInfo = 
  { imgSrc: imgSrc, title: "Self-Driving System for Auto Car", price: 15000, rating: 4.3, productLink: "item1", 
  description: "Lorem ipsum dolor sit amet. Est eius labore sed amet optio eum galisum quae 33 temporibus magni et veniam veniam est dignissimos culpa qui aperiam provident." };
const images: ItemImage[] = [
  {
      id: 1,
      image: "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_1080,q_auto:eco,w_1920/v1/cms/uploads/jmnrqauksfaore9gv7bn",
  },
  {
      id: 2,
      image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      id: 3,
      image: "https://images.unsplash.com/photo-1617650728468-8581e439c864?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      id: 4,
      image: "https://images.unsplash.com/photo-1617531653520-4893f7bbf978?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];



export default function ProductItemPage() {
  return (
    <main>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Left Side - Image Carousel */}
            <Carousel animation="slide" navButtonsAlwaysVisible autoPlay={false}>
              {
                  images.map((item) => 
                    <Paper background-color>
                        <img src={item.image} style={{width:"100%", height:"35vh", objectFit: 'cover'}}/>
                    </Paper>
                  )
              }
          </Carousel>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Right Side - Product Information */}
            <h1 className="product-title">{itemListing.title}</h1>
            <p className="product-price">{"$" + itemListing.price.toLocaleString()}</p>
            {itemListing.rating && <Rating rating={itemListing.rating} />}
            <p className="product-description">{itemListing.description}</p>
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
            onClick={() => addToCart(itemListing)}
            >
              ADD TO CART
            </Button>
          </Grid>
        </Grid>

        <Grid item spacing={4} paddingTop={"35px"}>
          <h2>Specifications</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor:"#E0E0E0", width: "25%" }}>
                    Vehicle Type
                  </TableCell>
                  <TableCell>item.vehicletype</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor:"#E0E0E0", width: "25%" }}>
                    Technology
                  </TableCell>
                  <TableCell>item.technology</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor:"#E0E0E0", width: "25%" }}>
                    Application
                  </TableCell>
                  <TableCell>item.application</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 1, borderRightColor:"#E0E0E0", width: "25%" }}>
                    Installation Requirements
                  </TableCell>
                  <TableCell>item.installation</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item spacing={4} paddingTop={"35px"}>
          <h2>Customer Reviews</h2>
          <Container sx={{borderRadius: 2, bgcolor: "primary.main", height: "40px", alignContent: "center"}}>
            {itemListing.rating && <Rating rating={itemListing.rating} />}
          </Container>
          <Container>
            <p>Add Review with Rating here</p>
          </Container>
        </Grid>
      </Container>
    </main>
  );
}

function addToCart(itemListing) {

  const KEY = 'basket';

  const readLS = () => {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data): [];
  }

    const addLS = (value) => {
      const existingData = readLS();
      existingData.push(value);
      localStorage.setItem(KEY, JSON.stringify(existingData));
  }

  addLS(itemListing)

  alert('Added to Cart!');

}