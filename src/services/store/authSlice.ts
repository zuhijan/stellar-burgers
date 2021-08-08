import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../api/auth";
import { setCookie } from "../utils/cookie";

export type TUserData = {
  email: string;
  name: string;
};
type TLoginUserResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUserData;
  message?: string;
};

type TPatchUserResponse = {
  success: boolean;
  user: TUserData;
};

export type TLoginUserParams = {
  email: string;
  password: string;
};

export type TRegisterUserParams = {
  email: string;
  password: string;
  name: string;
};
export const loginUser = createAsyncThunk<TLoginUserResponse, TLoginUserParams>(
  "auth/loginUser",
  async (form) => {
    try {
      const data = await authAPI.loginUser(form);
      setCookie("token", data.accessToken, { expires: 1200 });
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (err) {
      console.log(`### err.message`, err.message);
    }
  }
);

export const registerUser = createAsyncThunk<
  TLoginUserResponse,
  TRegisterUserParams
>("auth/registerUser", async (form) => {
  try {
    const data = await authAPI.registerUser(form);
    console.log(`### data`, data);
    //TODO: время жизни куки нужно обновлять, если пользователь активен. в getUser?
    setCookie("token", data.accessToken, { expires: 1200 });
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (err) {
    console.log(`### err.message`, err.message);
  }
});

export const patchUser = createAsyncThunk<
  TPatchUserResponse,
  TRegisterUserParams
>("auth/patchUser", async (form) => {
  try {
    return await authAPI.patchAuthUser(form);
  } catch (err) {
    console.log(`### err.message`, err.message);
  }
});
export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const res = await authAPI.getAuthUser();
    return res;
  } catch (err) {
    console.log(`### err.message`, err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {} as TUserData,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userData = action.payload.user;
      }
    });
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.userData = action.payload.user;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.userData = action.payload.user;
      }
    });
  },
});
export const { setUserData } = authSlice.actions;

export default authSlice.reducer;
