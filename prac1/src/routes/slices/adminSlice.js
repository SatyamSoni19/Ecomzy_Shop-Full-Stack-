import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:4000" 
  : "https://ecomzy-shop-full-stack.onrender.com";

export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admin/dashboard`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.dashboard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admin/users`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'admin/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/admin/products`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboard: null,
    users: [],
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchDashboardData.fulfilled, (state, action) => { state.loading = false; state.dashboard = action.payload; })
      .addCase(fetchDashboardData.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export default adminSlice.reducer;
