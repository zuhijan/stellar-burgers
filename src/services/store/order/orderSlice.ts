import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constructorAPI } from "../../api/constructor";
import { TIngredient } from "../ingredients/ingredientsSlice";

export type TOrderMade = {
  name: string;
  order: TOrder;
  success: boolean;
};

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: { name: string; email: string; createdAt: string; updatedAt: string };
  price: number;
  status: string;
  updatedAt: string;
};

export type TWSOrder = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};

export interface IOrderState {
  orderMade: TOrderMade;
  orders: TWSOrder[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  wsError: null | string;
}

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (idArray: string[]) => {
    try {
      return await constructorAPI.postOrder({ ingredients: idArray });
    } catch (err) {
      console.log(`### err.message`, err.message);
    }
  }
);

export const wsConnectionStart = createAction<string>(
  "order/wsConnectionStart"
);
export const wsConnectionClose = createAction("order/wsConnectionClose");

export const initialState = {
  orderMade: {} as TOrderMade,
  orders: [] as TWSOrder[],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  wsError: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState as IOrderState,
  reducers: {
    cleanOrderMade: (state) => {
      state.orderMade = {} as TOrderMade;
    },
    cleanOrders: (state) => {
      state.orders = [] as TWSOrder[];
    },
    wsConnectionOpened: (state) => {
      state.wsConnected = true;
      state.wsError = null;
    },
    wsGotMessage: (state, action) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
    wsGotError: (state, action) => {
      state.wsError = action.payload;
      state.wsConnected = false;
    },
    wsClosed: (state) => {
      state.wsError = null;
      state.wsConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.orderMade = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  cleanOrderMade,
  wsClosed,
  wsConnectionOpened,
  wsGotError,
  wsGotMessage,
  cleanOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
