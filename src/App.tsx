import React, { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerContstuctor";
import { INGREDIENTS, ingredientType } from "./utils/data";
import formatDataIngredients from "./utils/formatDataIngredients";

function App() {
  const [selectedBun, setSelectedBun] = useState<ingredientType | undefined>();
  const [selectedIngredients, setSelectedIngredients] = useState<
    ingredientType[]
  >([]);

  const ingredientsData = formatDataIngredients(INGREDIENTS);

  return (
    <div className="App">
      <AppHeader />
      <section className="main content-wrapper">
        <h1 className="text m-2 text_type_main-large">Соберите бургер</h1>
        <div className="burger-container">
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
