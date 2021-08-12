import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IngredientsDataType,
  SelectedIngredientsType,
} from "../../components/App/App";
import formatDataIngredients from "../utils/formatDataIngredients";
import { addEl, deleteEl } from "../../components/App/utils";
import { constructorAPI } from "../api/constructor";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

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
  changePosition,
  cleanBasket,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
