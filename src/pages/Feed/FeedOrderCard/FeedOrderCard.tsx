import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./FeedOrderCard.module.scss";
import clsx from "clsx";
import { TWSOrder } from "../../../services/store/order/orderSlice";

import { findIngredient } from "../../../services/utils/findIngredient";
import { formatDate } from "../../../services/utils/formatDate";
import { enumStatusOrder } from "../FeedOrder/FeedOrder";
import { useSelector } from "../../../services/hooks";

interface IFeedOrderCard {
  order: TWSOrder;
  onClick(order: TWSOrder): void;
  status?: boolean;
}

const FeedOrderCard: FC<IFeedOrderCard> = ({ order, onClick }) => {
  const hiddenCount = order.ingredients.length - 5;

  const { ingredients } = useSelector((state) => state.ingredients);

  const orderPrice = order.ingredients.reduce((acc, curValue) => {
    const ingredient = findIngredient(ingredients, curValue);
    if (ingredient) {
      return acc + ingredient.price;
    }
    return acc;
  }, 0);
  return (
    <div className={clsx(s.root, "p-6 m-2")} onClick={() => onClick(order)}>
      <div className={s.line}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p
          className={
            "text text_type_main-default text_color_inactive mt-2 mb-6"
          }
        >
          {formatDate(order.createdAt)}
        </p>
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">{order.name}</p>
      {order?.status && (
        <p
          className={clsx(
            "text text_type_main-default mb-10",
            order.status === "done" && s.text_color_bold
          )}
        >
          {enumStatusOrder[order?.status as keyof object]}
        </p>
      )}
      <div className={s.line}>
        <div className={clsx(s.ingredients, "pl-5")}>
          {order.ingredients.map((item, index) => {
            if (index > 5) return <div key={index} />;
            if (index === 5) {
              return (
                <div className={s.img} key={index}>
                  <img
                    key={index}
                    src={findIngredient(ingredients, item)?.image_mobile}
                    alt={item}
                  />
                  <p
                    className={clsx(
                      s.overflow,
                      "text text_type_digits-default"
                    )}
                  >
                    +{hiddenCount}
                  </p>
                </div>
              );
            }
            return (
              <div className={s.img} key={index}>
                <img
                  key={index}
                  src={findIngredient(ingredients, item)?.image_mobile}
                  alt={item}
                />
              </div>
            );
          })}
        </div>
        <div className={s.total}>
          <p className="text text_type_digits-default mr-1">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default FeedOrderCard;
