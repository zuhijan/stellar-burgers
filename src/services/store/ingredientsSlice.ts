import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
      const { dragIndex, hoverIndex } = action.payload;
      const currentState = current(state);
      let other = [...currentState.selectedIngredients.other];

      const dragEl = other[dragIndex as keyof object];

      other.splice(dragIndex, 1);
      other.splice(hoverIndex, -1, dragEl);

      state.selectedIngredients = {
        ...currentState.selectedIngredients,
        other: other,
      };
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
