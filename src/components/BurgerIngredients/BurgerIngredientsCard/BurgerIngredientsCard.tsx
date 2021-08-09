import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientType } from "../../../services/utils/data";
import { TRootState } from "../../../services/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedIngredient } from "../../../services/store/ingredientsSlice";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";

interface IBurgerIngredientsCard {
  ingredient: TIngredientType;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { selectedIngredients } = useSelector(
    (state: TRootState) => state.ingredients
  );

  const [, ref] = useDrag({
    type: "ingredients",
    item: ingredient,
  });

  const handleClickOpen = () => {
    dispatch(setOpenedIngredient(ingredient));
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
