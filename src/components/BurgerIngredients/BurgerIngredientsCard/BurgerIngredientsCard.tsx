import React, { FC, useContext, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import { ingredientType } from "../../../utils/data";
import { IngredientsContext } from "../../../services/appContext";

interface IBurgerIngredientsCard {
  ingredient: ingredientType;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({ ingredient }) => {
  const [open, setOpen] = useState(false);

  const { selectedIngredients, setSelectedIngredients } =
    useContext(IngredientsContext);

  const handleClick = () => {
    // setOpen(true);

    setSelectedIngredients({
      type: "add",
      payload: {
        ingredient,
      },
    });
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
      <div onClick={handleClick} className={s.card}>
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
        <IngredientDetails
          ingredient={ingredient}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};
export default React.memo(BurgerIngredientsCard);
