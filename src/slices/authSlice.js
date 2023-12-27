import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk("auth/signIn", async (values) => {
  try {
    const data = await authAPI.signIn(values);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },

    signIn: (state, action) => {
      authAPI.signUp(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      return { ...state, loading: true };
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      return { ...state, user: action.payload, loading: false };
    });

    builder.addCase(signIn.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
