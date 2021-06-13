import React, { FC, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { ingredientType } from "../../../utils/data";
import { RootState } from "../../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedIngredient } from "../../../services/ingredientsSlice";
import { useDrag } from "react-dnd";

interface IBurgerIngredientsCard {
  ingredient: ingredientType;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ ingredient }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedIngredients } = useSelector(
    (state: RootState) => state.ingredients
  );

  const [, ref] = useDrag({
    type: "ingredients",
    item: ingredient,
  });

  const handleClickOpen = () => {
    dispatch(setOpenedIngredient(ingredient));
    setOpen(true);
  };

  const handleClickClose = () => {
    dispatch(setOpenedIngredient({}));
    setOpen(false);
  };

  let countBun =
    selectedIngredients.bun &&
    selectedIngredients.bun._id === ingredient._id &&
    1;
  let countOther =
    selectedIngredients.other.length &&
    selectedIngredients.other.filter((item) => item._id === ingredient._id)
      .length;
  return (
    <>
      <div ref={ref} onClick={handleClickOpen} className={s.card}>
        {ingredient.type === "bun"
          ? !!countBun && <Counter count={countBun} size="small" />
          : !!countOther && <Counter count={countOther} size="small" />}

        <img src={ingredient.image} alt={ingredient.name} />
        <div className={s.priceRow}>
          <p className="m-1 text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="m-1 text_type_main-default">{ingredient.name}</p>
      </div>
      {open && (
        <IngredientDetails ingredient={ingredient} onClose={handleClickClose} />
      )}
    </>
  );
};
export default React.memo(BurgerIngredientsCard);
