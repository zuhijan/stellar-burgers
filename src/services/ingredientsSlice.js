import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../components/App/App";
import formatDataIngredients from "../utils/formatDataIngredients";
import { addEl, deleteEl } from "../components/App/utils";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await fetch(API_URL + "/ingredients");
      if (!response.ok) {
        throw new Error("Ответ сети был не ok.");
      }
      const ingredients = await response.json();
      return ingredients.data;
    } catch (err) {
      console.log(`### err.message`, err.message);
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: {
      // IngredientDataType
      main: [],
      bun: [],
      sauce: [],
    },
    selectedIngredients: {
      //SelectedIngredientsType
      bun: null,
      other: [],
    },
    openedIngredient: {},
    order: [],
    orderNumber: null,
  },
  reducers: {
    addSelectedIngredient: (state, action) => {
      state.selectedIngredients = addEl(
        state.selectedIngredients,
        action.payload
      );
    },
    deleteSelectedIngredient: (state, action) => {
      state.selectedIngredients = deleteEl(
        state.selectedIngredients,
        action.payload.index
      );
    },
    setOpenedIngredient: (state, action) => {
      state.openedIngredient = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchIngredients.fulfilled]: (state, action) => {
      // Add user to the state array
      state.ingredients = formatDataIngredients(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSelectedIngredient,
  deleteSelectedIngredient,
  setOpenedIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
