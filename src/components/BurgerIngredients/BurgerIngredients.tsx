import React, { FC } from "react";

import { ingredientType } from "../../utils/data";
import s from "./burgerIngredients.module.scss";
import BurgerIngredientsContainer from "./BurgerIngredientsContainer/BurgerIngredientsContainer";
import Tabs from "../Tabs/Tabs";

interface IBurgerIngredients {
  ingredients: {
    bun: ingredientType[];
    sauce: ingredientType[];
    main: ingredientType[];
  };
}

const BurgerIngredients: FC<IBurgerIngredients> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("bun");

  return (
    <div className={s.root}>
      <Tabs current={current} setCurrent={setCurrent} />
      <div className={s.ingredientsList}>
        <BurgerIngredientsContainer title="Булки" data={ingredients.bun} />
        <BurgerIngredientsContainer title="Соусы" data={ingredients.sauce} />
        <BurgerIngredientsContainer title="Начинки" data={ingredients.main} />
      </div>
    </div>
  );
};
export default BurgerIngredients;
