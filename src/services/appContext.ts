import { createContext, Dispatch } from "react";
import { SelectedIngredientsType } from "../components/App/App";
import { ingredientType } from "../utils/data";

export const IngredientsContext = createContext(
  {} as {
    selectedIngredients: SelectedIngredientsType;
    setSelectedIngredients: Dispatch<{
      type: string;
      payload: { ingredient: ingredientType; index?: number };
    }>;
  }
);
