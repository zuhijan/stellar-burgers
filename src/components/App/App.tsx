import React, { useEffect, useState } from "react";
import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerContstuctor";
import { ingredientType } from "../../utils/data";
import formatDataIngredients from "../../utils/formatDataIngredients";
import s from "./App.module.scss";
import clsx from "clsx";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export type IngredientDataType = {
  bun: ingredientType[];
  sauce: ingredientType[];
  main: ingredientType[];
};

function App() {
  const [selectedBun, setSelectedBun] = useState<ingredientType | undefined>();
  const [selectedIngredients, setSelectedIngredients] = useState<
    ingredientType[]
  >([]);
  const [ingredients, setIngredients] = useState<IngredientDataType>({
    main: [],
    bun: [],
    sauce: [],
  });

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(API_URL);
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
        <div className={s.burgerContainer}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor
            bun={selectedBun}
            ingredients={[...ingredients.main, ...ingredients.sauce]}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
