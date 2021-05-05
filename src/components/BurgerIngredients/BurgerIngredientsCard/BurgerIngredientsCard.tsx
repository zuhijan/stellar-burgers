import React, { FC, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { ingredientType } from "../../../utils/data";

interface IBurgerIngredientsCard {
  ingredient: ingredientType;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ ingredient }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className={s.card}>
        <Counter count={12} size="small" />
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={s.priceRow}>
          <p className="m-1 text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="m-1 text_type_main-default">{ingredient.name}</p>
      </div>
      {open && (
        <IngredientDetails
          ingredient={ingredient}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
export default React.memo(BurgerIngredientsCard);
