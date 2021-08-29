import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { TIngredient } from "../../../services/store/ingredients/ingredientsSlice";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "../../../services/hooks";

interface IBurgerIngredientsCard {
  ingredient: TIngredient;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ ingredient }) => {
  const history = useHistory();

  const location = useLocation();
  const { selectedIngredients } = useSelector((state) => state.ingredients);

  const [, ref] = useDrag({
    type: "ingredients",
    item: ingredient,
  });

  const handleClickOpen = () => {
    history.push({
      pathname: "/ingredients/" + ingredient._id,
      state: { background: location },
    });
  };

  let countBun =
    selectedIngredients.bun &&
    selectedIngredients.bun._id === ingredient._id &&
    2;
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
    </>
  );
};
export default React.memo(BurgerIngredientsCard);
