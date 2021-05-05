import React, { FC } from "react";
import s from "./IngredientDetails.module.scss";
import Modal from "../Modal/Modal";
import { ingredientType } from "../../utils/data";

export interface IIngredientDetails {
  ingredient: ingredientType;
  onClose(): void;
}

const IngredientDetails: FC<IIngredientDetails> = ({ ingredient, onClose }) => {
  return (
    <Modal title={"Детали ингредиента"} onClose={onClose}>
      <div className={s.ingredient}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p
          style={{ textAlign: "center" }}
          className="text text_type_main-medium mt-4"
        >
          {ingredient.name}
        </p>
        <p
          style={{ textAlign: "center" }}
          className="text text_type_main-default mt-8"
        >
          Превосходные котлеты из марсианской Магнолии для фирменных космических
          бургеров, набирающих популярность по всей вселенной.
        </p>
      </div>
    </Modal>
  );
};
export default IngredientDetails;
