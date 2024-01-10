import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";
import { toast } from "react-toastify";
import { openModalAddLogin } from "./modal";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  try {
    const { data } = await instance.post("/auth/login", params);
    toast.success(data.message);
    return data;
  } catch (e) {
    let text = "";
    if (e.response.data.message) (
      toast.error(e.response.data.message)
    );
    e.response.data.forEach(e => text += e.msg);
    toast.error(text);
  }
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async (_, { dispatch }) => {
  try {
    const { data } = await instance.get("/auth/me");
    return data;
  } catch (e) {
    dispatch(openModalAddLogin());
    toast.warn("войдите под именем, что бы создавать и редактировать таски");
  }
});

const initialState = {
  data: null,
  status: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("token");
      state.data = null;
      toast.success("Вы вышли из аккаунта");
    }
  },
  extraReducers: {
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = null;
      if (action.payload.token) {
        window.localStorage.setItem("token", action.payload.token);
      }
    },
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuth.rejected]: (state) => {
      state.status = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = null;
    }
  }
});
export const selectIsAuth = state => Boolean(state.auth.data);
export const selectIsAuthStatus = state => Boolean(state.auth.status === "loading");
export const selectName = state => state.auth.data?.fullName;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
