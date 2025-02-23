import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { useProductStore } from '../store/product.js';
import { Link } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: ''
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('success');
  
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // Convert price to a number before sending
    const formattedProduct = {
      ...newProduct,
      price: Number(newProduct.price),
    };

    const { success, message } = await createProduct(formattedProduct);

    setToastSeverity(success ? 'success' : 'error');
    setToastMessage(message);
    setToastOpen(true);

    if (success) {
      setNewProduct({
        name: '',
        price: 0, // Ensure reset uses 0 instead of ""
        image: ''
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Price"
              type="number"
              variant="outlined"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Image URL"
              type="url"
              variant="outlined"
              fullWidth
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              fullWidth
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar to show success/error message */}
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} sx={{ mt: 8 }}>
        <Alert onClose={() => setToastOpen(false)} severity={toastSeverity} sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* Go Back Button */}
      <Box mt={15} display="flex" justifyContent="center" alignItems="center">
        <Button component={Link} to="/" variant="contained" color="secondary">
          Go Back to Homepage
        </Button>
      </Box>

    </Container>
  );
};

export default CreatePage;
