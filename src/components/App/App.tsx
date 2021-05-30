import React, { useEffect } from "react";
import clsx from "clsx";
import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerContstuctor";
import { ingredientType } from "../../utils/data";
import s from "./App.module.scss";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const API_URL = "https://norma.nomoreparties.space/api";

export type IngredientDataType = {
  bun: ingredientType[];
  sauce: ingredientType[];
  main: ingredientType[];
};

export type SelectedIngredientsType = {
  bun: ingredientType | null;
  other: ingredientType[];
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={s.App}>
      <AppHeader />
      <section className={clsx(s.main, "content-wrapper")}>
        <h1 className={clsx(s.text, "m-2 text_type_main-large")}>
          Соберите бургер
        </h1>
        <div className={s.burgerContainer}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </section>
    </div>
  );
}

export default App;
