import React, { FC } from "react";
import BurgerIngredientsCard from "../BurgerIngredientsCard/BurgerIngredientsCard";
import { ingredientType } from "../../../utils/data";
import clsx from "clsx";
import s from "./burgerIngredientsContainer.module.scss";

export interface IBurgerIngredientsContainer {
  data: ingredientType[];
  title: string;
  customRef: any;
}

const BurgerIngredientsContainer: FC<IBurgerIngredientsContainer> = ({
  data,
  title,
  customRef,
}) => {
  return (
    <>
      <h3 ref={customRef} className={clsx(s.text, "ml-1")}>
        {title}
      </h3>
      <div className={s.ingredients}>
        {data.map((item) => (
          <BurgerIngredientsCard key={item._id} ingredient={item} />
        ))}
      </div>
    </>
  );
};
export default React.memo(BurgerIngredientsContainer);
