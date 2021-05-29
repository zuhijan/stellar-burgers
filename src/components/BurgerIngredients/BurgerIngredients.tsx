import React, { FC, useCallback } from "react";
import s from "./burgerIngredients.module.scss";
import BurgerIngredientsContainer from "./BurgerIngredientsContainer/BurgerIngredientsContainer";
import Tabs from "../Tabs/Tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

interface IBurgerIngredients {}

const BurgerIngredients: FC<IBurgerIngredients> = () => {
  const [current, setCurrent] = React.useState("bun");

  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  const handleClickTab = useCallback((item) => {
    setCurrent(item);
  }, []);

  return (
    <div className={s.root}>
      <Tabs current={current} setCurrent={handleClickTab} />
      <div className={s.ingredientsList}>
        <BurgerIngredientsContainer title="Булки" data={ingredients.bun} />
        <BurgerIngredientsContainer title="Соусы" data={ingredients.sauce} />
        <BurgerIngredientsContainer title="Начинки" data={ingredients.main} />
      </div>
    </div>
  );
};
export default BurgerIngredients;
