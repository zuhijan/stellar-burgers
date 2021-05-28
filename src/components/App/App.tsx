import React, { useEffect, useReducer, useState } from "react";
import clsx from "clsx";
import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerContstuctor";
import { ingredientType } from "../../utils/data";
import formatDataIngredients from "../../utils/formatDataIngredients";
import s from "./App.module.scss";
import { IngredientsContext } from "../../services/appContext";
import { addEl, deleteEl } from "./utils";

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

const reducer = (
  state: SelectedIngredientsType,
  action: {
    type: string;
    payload: { ingredient: ingredientType; index?: number };
  }
) => {
  switch (action.type) {
    case "add":
      return addEl(state, action.payload.ingredient);
    case "delete":
      return deleteEl(state, action.payload.index);
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

function App() {
  const [selectedIngredients, setSelectedIngredients] = useReducer(reducer, {
    bun: null,
    other: [],
  });

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
