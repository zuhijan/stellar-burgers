import React, { FC, useMemo, useState } from "react";
import clsx from "clsx";
import s from "./burgerConstructor.module.scss";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrder } from "../../services/store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../services/store/store";
import {
  addSelectedIngredient,
  cleanBasket,
} from "../../services/store/ingredientsSlice";
import { useDrop } from "react-dnd";
import BurgerConstructorDragElement from "./BurgerConstructorDragElement";
import { useHistory, useLocation } from "react-router-dom";

interface IBurgerConstructor {}

const BurgerConstructor: FC<IBurgerConstructor> = () => {
  const dispatch = useDispatch();

  const [isShowLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const refreshToken = localStorage.getItem("refreshToken");

  const { selectedIngredients } = useSelector(
    (state: TRootState) => state.ingredients
  );

  const [{ isHover }, ref] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addSelectedIngredient(ingredient));
    },
  });

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
      arrayOtherIds.push(selectedIngredients.bun?._id);
    }

    return arrayOtherIds;
  }, [selectedIngredients]);

  const handleClickButton = async () => {
    if (selectedIngredients.bun) {
      if (refreshToken) {
        setShowLoader(true);

        try {
          await dispatch(postOrder(idArray));
          dispatch(cleanBasket());
          setShowLoader(false);
        } catch (err) {
          setShowLoader(false);
          console.log(err);
        }
      } else {
        history.replace({
          pathname: "/login",
          state: { from: location },
        });
      }
    } else {
      console.log(`Милорд, не хватает булок!`);
    }
  };

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
    <div
      ref={ref}
      className={s.root}
      style={{ outline: isHover ? "1px solid gold" : "" }}
    >
      {isEmptyConstructor ? (
        <div className={s.ingredientsContainer}>
          {selectedIngredients.bun && (
            <ConstructorElement
              isLocked={true}
              type={"top"}
              text={`${selectedIngredients.bun.name} (верх)`}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image_mobile}
            />
          )}

          <div className={s.list}>
            {selectedIngredients.other &&
              selectedIngredients.other.map((item, index) => (
                <BurgerConstructorDragElement
                  key={index}
                  ingredient={item}
                  index={index}
                />
              ))}
          </div>
          {selectedIngredients.bun && (
            <ConstructorElement
              isLocked={true}
              type={"bottom"}
              text={`${selectedIngredients.bun.name} (низ)`}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image_mobile}
            />
          )}
          <div className={s.orderContainer}>
            <div className={clsx(s.count, "mr-3")}>
              <p className={clsx(s.text, "mr-1 text_type_digits-default")}>
                {totalBun + totalOther}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleClickButton}>
              <div
                style={{ position: "relative", minWidth: 134, minHeight: 24 }}
              >
                {isShowLoader ? (
                  <span className={s.loader} />
                ) : (
                  "Оформить заказ"
                )}
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <p className={clsx(s.text, "m-2 text_type_main-large")}>
          Перетащите ингредиенты
        </p>
      )}
    </div>
  );
};
export default BurgerConstructor;
