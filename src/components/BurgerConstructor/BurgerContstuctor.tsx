import React, { FC } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/data";
import s from "./burgerConstructor.module.scss";
import clsx from "clsx";

const BUN_DEF = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

interface IBurgerConstructor {
  bun: ingredientType | undefined;
  ingredients: ingredientType[];
}

const BurgerConstructor: FC<IBurgerConstructor> = ({
  bun = BUN_DEF,
  ingredients,
}) => {
  return (
    <div className={s.root}>
      <ConstructorElement
        isLocked={true}
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />

      <div className={s.list}>
        {ingredients.map((item) => (
          <ConstructorElement
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        ))}
      </div>
      <ConstructorElement
        isLocked={true}
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
      <div className={s.orderContainer}>
        <div className={clsx(s.count, "mr-3")}>
          <p className={clsx(s.text, "mr-1 text_type_digits-default")}>120</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
export default BurgerConstructor;
