import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerContstuctor";
import { ingredientType } from "../../utils/data";
import formatDataIngredients from "../../utils/formatDataIngredients";
import s from "./App.module.scss";
import { IngredientsContext } from "../../services/appContext";

export const API_URL = "https://norma.nomoreparties.space/api";

export type IngredientDataType = {
  bun: ingredientType[];
  sauce: ingredientType[];
  main: ingredientType[];
};

export type SelectedIngredientsType = {
  bun: ingredientType;
  other: ingredientType[];
};

function App() {
  const [selectedIngredients, setSelectedIngredients] =
    useState<SelectedIngredientsType>({} as SelectedIngredientsType);

  const [ingredients, setIngredients] = useState<IngredientDataType>({
    main: [],
    bun: [],
    sauce: [],
  });

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(API_URL + "/ingredients");
        if (!res.ok) {
          throw new Error("Ответ сети был не ok.");
        }
        const ingredients = await res.json();
        const ingredientsData = formatDataIngredients(ingredients.data);
        setIngredients(ingredientsData);
      } catch (err) {
        console.log(`### err.message`, err.message);
      }
    };
    getIngredients();
  }, []);

  return (
    <div className={s.App}>
      <AppHeader />
      <section className={clsx(s.main, "content-wrapper")}>
        <h1 className={clsx(s.text, "m-2 text_type_main-large")}>
          Соберите бургер
        </h1>
        <IngredientsContext.Provider
          value={{ selectedIngredients, setSelectedIngredients }}
        >
          <div className={s.burgerContainer}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor />
          </div>
        </IngredientsContext.Provider>
      </section>
    </div>
  );
}

export default App;
