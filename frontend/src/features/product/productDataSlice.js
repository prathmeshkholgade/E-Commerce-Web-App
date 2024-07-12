import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URl;
axios.defaults.withCredentials = true;

// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export const fetchProductData = createAsyncThunk(
  "products/fetchData",
  async () => {
    const response = await axios.get(`${apiUrl}/products`, {
      withCredentials: true,
    });
    return response.data;
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    return response.data;
  }
);
export const addData = createAsyncThunk(
  "products/addData",
  async (productData, thunkApi) => {
    try {
      const response = await axios.post(`${apiUrl}/products`, productData, 
        {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`${apiUrl}/products/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      // console.log(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updatedProduct = createAsyncThunk(
  "products/updatedProduct",
  async ({ id, product }, thunkApi) => {
    try {
      const response = await axios.put(`${apiUrl}/products/${id}`, product,{withCredentials:true});
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data || "some error occcred"
      );
    }
  }
);

export const addtocart = createAsyncThunk(
  "products/addtocart",
  async ({ id, quantity }, thunkApi) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data || "some error occcred"
      );
    }
  }
);
export const cartItems = createAsyncThunk(
  "products/cartItems",
  async (thunkApi) => {
    try {
      const response = await axios.get(`${apiUrl}/cart`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.data || "some error occcred"
      );
    }
  }
);

const ProductDataSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    status: "",
    error: null,
    cartItems: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductData.pending, (state, action) => {
        state.status = "Loading Data";
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })

      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(addData.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updatedProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.product = action.payload;
      })
      .addCase(updatedProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addtocart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(cartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(cartItems.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(cartItems.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default ProductDataSlice.reducer;
