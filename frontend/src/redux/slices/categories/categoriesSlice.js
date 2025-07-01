import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccesAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

// initial state
const INITIAL_STATE = {
  loading: false,
  error: null,
  categories: [],
  success: false,
};

// ─── THUNKS ────────────────────────────────────────────────────────────────

// Fetch all categories
export const fetchCategoriesAction = createAsyncThunk(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${BASE_URL}/categories`);
        // our API returns { status, message, categories }
        return data.categories;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
);

// Create a new category
export const createCategoryAction = createAsyncThunk(
    "categories/create",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
            `${BASE_URL}/categories`,
            { name: payload.name },
            { headers: { Authorization: `Bearer ${payload.token}` } }
        );
        // returns { status, message, category }
        return data.category;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
);

// Update an existing category
export const updateCategoryAction = createAsyncThunk(
    "categories/update",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
            `${BASE_URL}/categories/${payload.id}`,
            { name: payload.name },
            { headers: { Authorization: `Bearer ${payload.token}` } }
        );
        return data.category;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
);

// Delete a category
export const deleteCategoryAction = createAsyncThunk(
    "categories/delete",
    async (payload, { rejectWithValue }) => {
      try {
        await axios.delete(`${BASE_URL}/categories/${payload.id}`, {
          headers: { Authorization: `Bearer ${payload.token}` },
        });
        return payload.id;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
);

// ─── SLICE ──────────────────────────────────────────────────────────────────

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all
    builder
        .addCase(fetchCategoriesAction.pending, (s) => { s.loading = true; })
        .addCase(fetchCategoriesAction.fulfilled, (s, { payload }) => {
          s.categories = payload;
          s.loading = false;
          s.error = null;
        })
        .addCase(fetchCategoriesAction.rejected, (s, { payload }) => {
          s.loading = false;
          s.error = payload;
        });

    // create
    builder
        .addCase(createCategoryAction.pending, (s) => { s.loading = true; })
        .addCase(createCategoryAction.fulfilled, (s, { payload }) => {
          s.categories.push(payload);
          s.loading = false;
          s.success = true;
        })
        .addCase(createCategoryAction.rejected, (s, { payload }) => {
          s.loading = false;
          s.error = payload;
        });

    // update
    builder
        .addCase(updateCategoryAction.pending, (s) => { s.loading = true; })
        .addCase(updateCategoryAction.fulfilled, (s, { payload }) => {
          s.categories = s.categories.map((c) =>
              c._id === payload._id ? payload : c
          );
          s.loading = false;
          s.success = true;
        })
        .addCase(updateCategoryAction.rejected, (s, { payload }) => {
          s.loading = false;
          s.error = payload;
        });

    // delete
    builder
        .addCase(deleteCategoryAction.pending, (s) => { s.loading = true; })
        .addCase(deleteCategoryAction.fulfilled, (s, { payload }) => {
          s.categories = s.categories.filter((c) => c._id !== payload);
          s.loading = false;
          s.success = true;
        })
        .addCase(deleteCategoryAction.rejected, (s, { payload }) => {
          s.loading = false;
          s.error = payload;
        });

    // global resets
    builder
        .addCase(resetErrorAction.fulfilled, (s) => { s.error = null; })
        .addCase(resetSuccesAction.fulfilled, (s) => { s.success = false; });
  },
});

export default categoriesSlice.reducer;
