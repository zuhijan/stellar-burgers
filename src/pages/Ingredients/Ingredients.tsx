import React from "react";
import s from "./Ingredients.module.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TRootState } from "../../services/store";
import { findIngredient } from "../../services/utils/findIngredient";

const Ingredients = () => {
  const { ingredients } = useSelector((state: TRootState) => state.ingredients);
  const { ingredientId } = useParams<{ ingredientId?: string }>();

  const ingredient = findIngredient(ingredients, ingredientId!);

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
