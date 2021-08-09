import React from "react";
import s from "./IngredientDetails.module.scss";
import { useSelector } from "react-redux";
import { TRootState } from "../../services/store/store";

const IngredientDetails = () => {
  const { openedIngredient } = useSelector(
    (state: TRootState) => state.ingredients
  );

  return (
    <div className={s.ingredient}>
      <img src={openedIngredient.image_large} alt={openedIngredient.name} />
      <p
        style={{ textAlign: "center" }}
        className="text text_type_main-medium mt-4"
      >
        {openedIngredient.name}
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
export default IngredientDetails;
