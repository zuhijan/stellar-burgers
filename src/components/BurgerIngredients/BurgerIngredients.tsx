import React, { FC, useCallback, useRef } from "react";
import s from "./burgerIngredients.module.scss";
import BurgerIngredientsContainer from "./BurgerIngredientsContainer/BurgerIngredientsContainer";
import Tabs from "../Tabs/Tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

interface IBurgerIngredients {}

const BurgerIngredients: FC<IBurgerIngredients> = () => {
  const [current, setCurrent] = React.useState("bun");

  const containerRef = useRef<any>();
  const bunRef = useRef<any>();
  const mainRef = useRef<any>();
  const sauceRef = useRef<any>();

  const { ingredients } = useSelector((state: RootState) => state.ingredients);

  const handleClickTab = useCallback((item) => {
    setCurrent(item);
  }, []);

  const handleScroll = () => {
    const containerPos = Math.trunc(
      containerRef.current.getBoundingClientRect().top
    );

    const bunPos = Math.trunc(bunRef.current.getBoundingClientRect().top);

    const mainPos = Math.trunc(mainRef.current.getBoundingClientRect().top);

    const saucePos = Math.trunc(sauceRef.current.getBoundingClientRect().top);

    let initValue = [
      {
        value: "bun",
        pos: bunPos,
      },
      { value: "sauce", pos: saucePos },
      {
        value: "main",
        pos: mainPos,
      },
    ];
    const checkPos = (
      initValue: { value: string; pos: number }[],
      containerPos: number
    ) => {
      let minCount: {
        value: string;
        min: number;
      } = {
        value: "",
        min: 999999,
      };

      initValue.forEach((item) => {
        if (minCount.min) {
          const minRes = Math.abs(containerPos - item.pos);

          if (minRes < minCount.min) {
            minCount = {
              value: item.value,
              min: minRes,
            };
          }
        }
      });

      return minCount.value;
    };
    setCurrent(checkPos(initValue, containerPos));
  };

  return (
    <div className={s.root}>
      <Tabs current={current} setCurrent={handleClickTab} />
      <div
        onScroll={handleScroll}
        ref={containerRef}
        className={s.ingredientsList}
      >
        <BurgerIngredientsContainer
          customRef={bunRef}
          title="Булки"
          data={ingredients.bun}
        />
        <BurgerIngredientsContainer
          customRef={sauceRef}
          title="Соусы"
          data={ingredients.sauce}
        />
        <BurgerIngredientsContainer
          customRef={mainRef}
          title="Начинки"
          data={ingredients.main}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
