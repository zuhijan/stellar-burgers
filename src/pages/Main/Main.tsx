import React, { FC } from "react";
import clsx from "clsx";
import s from "./Main.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerContstuctor";

interface IMain {}

const Main: FC<IMain> = (props) => {
  return (
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
  );
};
export default Main;
