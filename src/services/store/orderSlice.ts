import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderType } from "../../components/OrderDetails/OrderDetails";
import { constructorAPI } from "../api/constructor";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (idArray: string[]) => {
    try {
      return await constructorAPI.postOrder({ ingredients: idArray });
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
