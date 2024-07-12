import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const signupUrl = import.meta.env.VITE_API_SIGNUP;
const loginUrl = import.meta.env.VITE_API_LOGIN;
const url = import.meta.env.VITE_API_URL;
const userUrl = import.meta.env.VITE_USER_DATA;
const logOutUrl = import.meta.env.VITE_LOGOUT_URL;
axios.defaults.withCredentials = true;

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userdata, thunkApi) => {
    try {
      const response = await axios.post(signupUrl, userdata);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(loginUrl, userData, {
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async () => {
  try {
    await axios.post(logOutUrl, { withCredentials: true });
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(userUrl, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "",
    error: "",
    rediretUrl:null,
  },
  reducers: {
    clearError: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userData;
        state.rediretUrl=action.payload.redirectUrl
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "user credentials are invalid";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = "";
        state.status = "logout";
        state.error = "user logout";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = 500;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      });
  },
});
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
