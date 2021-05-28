import { ingredientType } from "../../utils/data";
import { SelectedIngredientsType } from "./App";

export const addEl = (
  state: SelectedIngredientsType,
  ingredient: ingredientType
) => {
  if (ingredient.type === "bun") {
    return { ...state, bun: ingredient };
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
