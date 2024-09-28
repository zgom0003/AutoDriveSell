import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.error('Failed to fetch products:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
        credentials: 'include',
      });
      if (response.ok) {
        alert('Product added successfully!');
        setOpen(false);
        setProductData({
          name: '',
          description: '',
          price: '',
          imageUrl: ''
        });
        fetchProducts();
      } else {
        console.error('Server error:', await response.json());
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        console.error('Failed to delete product:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom component="div">
        Admin Dashboard
      </Typography>
      <div className="admin-btn-group">
        <Button variant="contained" onClick={() => navigate("/")} style={{ width: "150px", marginRight: "10px" }}>
          Sign Out
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} style={{ width: "200px" }}>
          Add New Product
        </Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            variant="outlined"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
        Product List
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <Card key={product.id} sx={{ width: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={product.images[0]?.imageUrl || 'default_image.jpg'}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1">
                Price: {product.productOptions[0]?.price}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleDeleteProduct(product.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </Box>
  );
}
