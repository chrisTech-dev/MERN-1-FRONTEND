// store/product.js

import { create } from 'zustand';


export const useProductStore = create((set) => ({

  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    if (!product.name || !product.price || !product.image) {
      return { success: false, message: 'Please provide all fields' };
    }

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product), 
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: [...state.products, data.data]
        }));
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  },

  fetchProducts: async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    set({products: data.data });

  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id!== id)
        }));
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  },

  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.map((product) => product._id === id? data.data : product)
      }));
      return { success: true, message: data.message };
    }
  }

}));


