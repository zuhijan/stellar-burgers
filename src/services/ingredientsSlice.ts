import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  API_URL,
  IngredientDataType,
  SelectedIngredientsType,
} from "../components/App/App";
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
      main: [],
      bun: [],
      sauce: [],
    } as IngredientDataType,
    selectedIngredients: {
      bun: null,
      other: [],
    } as SelectedIngredientsType,
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
    changePosition: (state, action) => {
      let newState = { ...state.selectedIngredients };
      let dragItem = newState.other[action.payload.dragIndex];
      const { dragIndex, dropIndex } = action.payload;

      newState.other.splice(
        dragIndex,
        0,
        newState.other.splice(dropIndex, 1)[0]
      );
      console.log(`### newState`, newState);
      state.selectedIngredients = newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = formatDataIngredients(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addSelectedIngredient,
  deleteSelectedIngredient,
  setOpenedIngredient,
  changePosition,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
