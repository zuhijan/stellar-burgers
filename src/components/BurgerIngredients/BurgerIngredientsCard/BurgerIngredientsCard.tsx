import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import s from "./burgerIngredientsCard.module.scss";

interface IBurgerIngredientsCard {
  img: string;
  price: number;
  name: string;
}

const BurgerIngredientsCard: FC<IBurgerIngredientsCard> = ({
  img,
  price,
  name,
}) => {
  return (
    <div className={s.card}>
      <img src={img} alt={name} />
      <div className={s.priceRow}>
        <p className="m-1 text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="m-1 text_type_main-default">{name}</p>
    </div>
  );
};
export default BurgerIngredientsCard;
