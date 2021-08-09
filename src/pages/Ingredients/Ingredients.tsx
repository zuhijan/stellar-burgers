import React, { FC } from "react";
import s from "./Ingredients.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TRootState } from "../../services/store/store";
import { TIngredientType } from "../../services/utils/data";

interface IIngredients {}

const Ingredients: FC<IIngredients> = (props) => {
  const { ingredients } = useSelector((state: TRootState) => state.ingredients);
  const { ingredientId } = useParams<{ ingredientId?: string }>();

  const findIngredient = () => {
    let ingredient: TIngredientType | undefined;
    for (let key in ingredients) {
      if (!ingredient) {
        const arrayIng: TIngredientType[] = ingredients[key as keyof object];
        ingredient = arrayIng.find((item) => item._id === ingredientId);
      }
    }
    return ingredient;
  };

  const ingredient = findIngredient();

  return (
    <div className={s.ingredient}>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <p
        style={{ textAlign: "center" }}
        className="text text_type_main-medium mt-4"
      >
        {ingredient?.name}
      </p>
      <p
        style={{ textAlign: "center" }}
        className="text text_type_main-default mt-8"
      >
        Превосходные котлеты из марсианской Магнолии для фирменных космических
        бургеров, набирающих популярность по всей вселенной.
      </p>
    </div>
  );
};
export default Ingredients;
