import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Delete Product
  const handleDelete = (productId) => {
    deleteProduct(productId);
    setSuccessMessage("Product deleted successfully!");
    setOpenSnackbar(true);
  };

  // Open Edit Dialog
  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setOpenDialog(true);
  };

  // Close Edit Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle Form Changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Form (Update Product)
  const handleSubmitForm = () => {
    updateProduct(selectedProduct._id, formData);
    setSuccessMessage("Product updated successfully!");
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{
          background: "linear-gradient(90deg, #00bcd4, #2196f3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Current Products 🚀
      </Typography>

      {products.length > 0 ? (
        <Grid container spacing={4} mt={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card sx={{ transition: "all 0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 6 } }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    ${product.price}
                  </Typography>

                  {/* Icon Buttons for Edit and Delete */}
                  <Box display="flex" gap={1} mt={2}>
                    <IconButton color="primary" onClick={() => handleOpenDialog(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found 🥺
          </Typography>
          <Button component={Link} to="/create" variant="contained" color="primary">
            Create a product
          </Button>
        </Box>
      )}

      {/* Snackbar (Success Message at Top-Right) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ mt: 8 }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioned at top-right
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Dialog (Edit Product Form) */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
