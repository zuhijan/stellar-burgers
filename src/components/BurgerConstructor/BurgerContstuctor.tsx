import React, { FC, useMemo, useState } from "react";
import clsx from "clsx";
import s from "./burgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import { cleanOrder, fetchOrder } from "../../services/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import {
  addSelectedIngredient,
  deleteSelectedIngredient,
} from "../../services/ingredientsSlice";
import { useDrop } from "react-dnd";

interface IBurgerConstructor {}

const BurgerConstructor: FC<IBurgerConstructor> = () => {
  const [open, setOpen] = useState(false);

  const { selectedIngredients } = useSelector(
    (state: RootState) => state.ingredients
  );
  const dispatch = useDispatch();

  const [{ isHover }, ref] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      console.log(`### ingredient`, ingredient);
      dispatch(addSelectedIngredient(ingredient));
    },
  });

  const isEmptyConstructor =
    !!selectedIngredients.bun ||
    (selectedIngredients.other && selectedIngredients.other.length > 0);

  const idArray = useMemo(() => {
    const arrayOtherIds = selectedIngredients.other.reduce(
      (acc: string[], elem) => {
        // @ts-ignore
        return [...acc, elem._id];
      },
      []
    );
    if (selectedIngredients.bun) {
      // @ts-ignore
      arrayOtherIds.push(selectedIngredients.bun?._id);
    }

    return arrayOtherIds;
  }, [selectedIngredients]);

  const handleClickButton = async () => {
    if (selectedIngredients.bun) {
      // @ts-ignore
      await dispatch(fetchOrder(idArray));
      setOpen(true);
    } else {
      console.log(`Милорд, не хватает булок!`);
    }
  };

  const handleClickClose = () => {
    setOpen(false);
    dispatch(cleanOrder());
  };

  const bunElement = useMemo(() => {
    return selectedIngredients.bun ? (
      <div style={{ marginBottom: 8, marginTop: 8 }}>
        <ConstructorElement
          isLocked={true}
          // @ts-ignore
          text={selectedIngredients.bun?.name}
          // @ts-ignore
          price={selectedIngredients.bun?.price}
          // @ts-ignore
          thumbnail={selectedIngredients.bun?.image_mobile}
        />
      </div>
    ) : null;
  }, [selectedIngredients.bun]);

  const totalBun = selectedIngredients.bun
    ? // @ts-ignore
      selectedIngredients.bun.price * 2
    : 0;
  const totalOther =
    selectedIngredients.other.length > 0
      ? selectedIngredients.other.reduce((acc: number, current) => {
          // @ts-ignore
          return acc + current.price;
        }, 0)
      : 0;

  return (
    <div
      ref={ref}
      className={s.root}
      style={{ outline: isHover ? "1px solid gold" : "" }}
    >
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
                    dispatch(
                      deleteSelectedIngredient({
                        ingredient: item,
                        index,
                      })
                    )
                  }
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    // @ts-ignore
                    text={item.name}
                    // @ts-ignore
                    price={item.price}
                    // @ts-ignore
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
          Перетащите ингредиенты
        </p>
      )}

      {open && <OrderDetails onClose={handleClickClose} />}
    </div>
  );
};
export default BurgerConstructor;
