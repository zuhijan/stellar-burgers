import { IngredientsDataType } from "../../components/App/App";
import { TIngredient } from "../store/ingredients/ingredientsSlice";

export const findIngredient = (
  ingredients: IngredientsDataType,
  id: string
) => {
  let ingredient: TIngredient | undefined;
  for (let key in ingredients) {
    if (!ingredient) {
      const arrayIng: TIngredient[] = ingredients[key as keyof object];
      ingredient = arrayIng.find((item) => item._id === id);
    }
  }
  return ingredient;
};
