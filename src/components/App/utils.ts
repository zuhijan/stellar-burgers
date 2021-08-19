import { SelectedIngredientsType } from "./App";
import { TIngredient } from "../../services/store/ingredients/ingredientsSlice";

export const addEl = (
  state: SelectedIngredientsType,
  ingredient: TIngredient
) => {
  if (ingredient.type === "bun") {
    const newState = { ...state, bun: ingredient };
    return newState;
  } else {
    let newOther = [...state.other, ingredient];
    return { ...state, other: newOther };
  }
};

export const deleteEl = (
  state: SelectedIngredientsType,
  index: number | undefined
) => {
  if (typeof index !== "undefined") {
    let newOther = [...state.other];
    newOther.splice(index, 1);
    return { ...state, other: newOther };
  } else {
    return { ...state };
  }
};
