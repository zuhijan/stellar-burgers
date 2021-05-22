import React, { FC, useContext, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/data";
import s from "./burgerConstructor.module.scss";
import clsx from "clsx";
import OrderDetails, { OrderType } from "../OrderDetails/OrderDetails";
import { IngredientsContext } from "../../services/appContext";
import { API_URL } from "../App/App";

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

const INGREDIENTS_DEF = [
  {
    _id: "609a337df07d7e0026403ac9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
  {
    _id: "609a337df07d7e0026403aca",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
  },
];

interface IBurgerConstructor {}

const BurgerConstructor: FC<IBurgerConstructor> = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderType>({} as OrderType);
  const { selectedIngredients } = useContext(IngredientsContext);

  const bun: ingredientType = selectedIngredients.bun
    ? selectedIngredients.bun
    : BUN_DEF;

  const dataOrder = [
    bun._id,
    "609a337df07d7e0026403ac9",
    "609a337df07d7e0026403aca",
  ];
  console.log(`### dataOrder`, dataOrder);
  const handleClickButton = async () => {
    try {
      const res = await fetch(API_URL + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: dataOrder,
        }),
      });
      if (!res.ok) {
        throw new Error("Ответ сети был не ok.");
      }
      const order = await res.json();
      setOrder(order);
      console.log(`### order`, order);
    } catch (err) {
      console.log(`### err.message`, err.message);
    }
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div className={s.root}>
      <ConstructorElement
        isLocked={true}
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image_mobile}
      />
      <div className={s.list}>
        {selectedIngredients.other
          ? selectedIngredients.other.map((item) => (
              <div
                key={item._id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </div>
            ))
          : INGREDIENTS_DEF.map((item) => (
              <div
                key={item._id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </div>
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
        <Button type="primary" size="large" onClick={handleClickButton}>
          Оформить заказ
        </Button>
      </div>
      {open && <OrderDetails order={order} onClose={handleClickClose} />}
    </div>
  );
};
export default BurgerConstructor;
