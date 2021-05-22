import { createContext, Dispatch, SetStateAction } from "react";
import {
  IngredientDataType,
  SelectedIngredientsType,
} from "../components/App/App";

export const IngredientsContext = createContext(
  {} as {
    selectedIngredients: SelectedIngredientsType;
    setSelectedIngredients: React.Dispatch<
      React.SetStateAction<SelectedIngredientsType>
    >;
  }
);
