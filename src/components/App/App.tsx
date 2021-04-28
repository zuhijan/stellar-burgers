import React, { useState } from "react";
import "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerContstuctor";
import { INGREDIENTS, ingredientType } from "../../utils/data";
import formatDataIngredients from "../../utils/formatDataIngredients";
import s from "./App.module.scss";
import clsx from "clsx";

function App() {
  const [selectedBun, setSelectedBun] = useState<ingredientType | undefined>();
  const [selectedIngredients, setSelectedIngredients] = useState<
    ingredientType[]
  >([]);

  const ingredientsData = formatDataIngredients(INGREDIENTS);

  return (
    <div className={s.App}>
      <AppHeader />
      <section className={clsx(s.main, "content-wrapper")}>
        <h1 className={clsx(s.text, "m-2 text_type_main-large")}>
          Соберите бургер
        </h1>
        <div className={s.burgerContainer}>
          <BurgerIngredients ingredients={ingredientsData} />
          <BurgerConstructor
            bun={selectedBun}
            ingredients={[...ingredientsData.main, ...ingredientsData.sauce]}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
