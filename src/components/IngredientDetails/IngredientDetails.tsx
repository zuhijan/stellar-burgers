import React from "react";
import s from "./IngredientDetails.module.scss";
import Modal from "../Modal/Modal";
import { setOpenedIngredient } from "../../services/store/ingredientsSlice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../services/store/store";
import { useHistory } from "react-router-dom";

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { openedIngredient } = useSelector(
    (state: TRootState) => state.ingredients
  );

  const handleClickClose = () => {
    history.replace({ pathname: "/" });
    dispatch(setOpenedIngredient({}));
  };

  return (
    <Modal title={"Детали ингредиента"} onClose={handleClickClose}>
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
    </Modal>
  );
};
export default IngredientDetails;
