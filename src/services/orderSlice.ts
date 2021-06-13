import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../components/App/App";
import { OrderType } from "../components/OrderDetails/OrderDetails";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (idArray: string[]) => {
    try {
      const res = await fetch(API_URL + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: idArray,
        }),
      });
      if (!res.ok) {
        throw new Error("Ответ сети был не ok.");
      }
      const order = await res.json();
      console.log(`### order`, order);
      return order;
    } catch (err) {
      console.log(`### err.message`, err.message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {} as OrderType,
  },
  reducers: {
    cleanOrder: (state) => {
      state.order = {} as OrderType;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { cleanOrder } = orderSlice.actions;

export default orderSlice.reducer;
