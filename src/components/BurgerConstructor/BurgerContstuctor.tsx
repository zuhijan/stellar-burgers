import React, { FC, useContext, useMemo, useState } from "react";
import clsx from "clsx";
import s from "./burgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails, { OrderType } from "../OrderDetails/OrderDetails";
import { IngredientsContext } from "../../services/appContext";
import { API_URL } from "../App/App";
import { log } from "util";

interface IBurgerConstructor {}

const BurgerConstructor: FC<IBurgerConstructor> = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<OrderType>({} as OrderType);
  const { selectedIngredients, setSelectedIngredients } =
    useContext(IngredientsContext);

  const isEmptyConstructor =
    !!selectedIngredients.bun ||
    (selectedIngredients.other && selectedIngredients.other.length > 0);

  const idArray = useMemo(() => {
    const arrayOtherIds = selectedIngredients.other.reduce(
      (acc: string[], elem) => {
        return [...acc, elem._id];
      },
      []
    );
    if (selectedIngredients.bun) {
      arrayOtherIds.push(selectedIngredients.bun._id);
    }

    return arrayOtherIds;
  }, [selectedIngredients]);

  const handleClickButton = async () => {
    if (selectedIngredients.bun) {
      try {
        const res = await fetch(API_URL + "/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: idArray,
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
    } else {
      console.log(`Милорд, не хватает булок!`);
    }
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const bunElement = useMemo(() => {
    return selectedIngredients.bun ? (
      <div style={{ marginBottom: 8, marginTop: 8 }}>
        <ConstructorElement
          isLocked={true}
          text={selectedIngredients.bun.name}
          price={selectedIngredients.bun.price}
          thumbnail={selectedIngredients.bun.image_mobile}
        />
      </div>
    ) : null;
  }, [selectedIngredients.bun]);

  const totalBun = selectedIngredients.bun
    ? selectedIngredients.bun.price * 2
    : 0;
  const totalOther =
    selectedIngredients.other.length > 0
      ? selectedIngredients.other.reduce((acc: number, current) => {
          return acc + current.price;
        }, 0)
      : 0;

  return (
    <div className={s.root}>
      {isEmptyConstructor ? (
        <div className={s.constrictor}>
          {bunElement}
          <div className={s.list}>
            {selectedIngredients.other &&
              selectedIngredients.other.map((item, index) => (
                <div
                  key={index}
                  className={s.lineElement}
                  onClick={() =>
                    setSelectedIngredients({
                      type: "delete",
                      payload: {
                        ingredient: item,
                        index,
                      },
                    })
                  }
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

          {bunElement}
          <div className={s.orderContainer}>
            <div className={clsx(s.count, "mr-3")}>
              <p className={clsx(s.text, "mr-1 text_type_digits-default")}>
                {totalBun + totalOther}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleClickButton}>
              Оформить заказ
            </Button>
          </div>
        </div>
      ) : (
        <p className={clsx(s.text, "m-2 text_type_main-large")}>
          Выберите ингредиенты
        </p>
      )}

      {open && <OrderDetails order={order} onClose={handleClickClose} />}
    </div>
  );
};
export default BurgerConstructor;
