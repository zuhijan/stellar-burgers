import React, { FC } from "react";
import BurgerIngredientsCard from "../BurgerIngredientsCard/BurgerIngredientsCard";
import { ingredientType } from "../../../utils/data";
import clsx from "clsx";
import s from "./burgerIngredientsContainer.module.scss";

export interface IBurgerIngredientsContainer {
  data: ingredientType[];
  title: string;
}

const BurgerIngredientsContainer: FC<IBurgerIngredientsContainer> = ({
  data,
  title,
}) => {
  return (
    <>
      <h3 className={clsx(s.text, "ml-1")}>{title}</h3>
      <div className={s.ingredients}>
        {data.map(({ image, name, price }) => (
          <BurgerIngredientsCard
            key={name}
            name={name}
            img={image}
            price={price}
          />
        ))}
      </div>
    </>
  );
};
export default BurgerIngredientsContainer;
