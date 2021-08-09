import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IngredientsDataType,
  SelectedIngredientsType,
} from "../../components/App/App";
import formatDataIngredients from "../utils/formatDataIngredients";
import { addEl, deleteEl } from "../../components/App/utils";
import { constructorAPI } from "../api/constructor";
import { TIngredientType } from "../utils/data";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      return await constructorAPI.getIngredients();
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
    } as IngredientsDataType,
    selectedIngredients: {
      bun: null,
      other: [],
    } as SelectedIngredientsType,
    openedIngredient: {} as TIngredientType,
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
      const { dragIndex, dropIndex } = action.payload;

      newState.other.splice(
        dragIndex,
        0,
        newState.other.splice(dropIndex, 1)[0]
      );
      console.log(`### newState`, newState);
      state.selectedIngredients = newState;
    },
    cleanBasket: (state) => {
      state.selectedIngredients = {
        bun: null,
        other: [],
      } as SelectedIngredientsType;
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
  cleanBasket,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
