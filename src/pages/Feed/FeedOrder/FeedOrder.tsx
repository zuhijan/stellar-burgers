import React, { FC, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./FeedOrder.module.scss";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { findIngredient } from "../../../services/utils/findIngredient";
import {
  cleanOrders,
  wsConnectionClose,
  wsConnectionStart,
} from "../../../services/store/order/orderSlice";
import { ALL_ORDERS_URL } from "../Feed";
import { formatDate } from "../../../services/utils/formatDate";
import { getCookie } from "../../../services/utils/cookie";
import { USER_ORDERS_URL } from "../../Profile/ProfileHistory/ProfileHistory";
import { useDispatch, useSelector } from "../../../services/hooks";

export enum enumStatusOrder {
  created = "Создан",
  pending = "Готовится",
  done = "Выполнен",
}

const unique = (arr: string[]) => {
  return Array.from(new Set(arr));
};

interface IFeedOrder {
  profile?: boolean;
}

const FeedOrder: FC<IFeedOrder> = ({ profile }) => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useSelector((state) => state.order);
  const { ingredients } = useSelector((state) => state.ingredients);

  const order = orders.find((item) => item.number === +orderId);

  useEffect(() => {
    if (!order?.number) {
      console.log(`### checkEffect`);
      if (profile) {
        const accessToken = getCookie("token")?.split(" ")[1];
        dispatch(wsConnectionStart(USER_ORDERS_URL + `?token=${accessToken}`));
      } else {
        dispatch(wsConnectionStart(ALL_ORDERS_URL));
      }
      return () => {
        dispatch(wsConnectionClose());
        dispatch(cleanOrders());
      };
    }
  }, [dispatch]);

  if (!order?.ingredients) {
    return null;
  }

  const uniqueIngredients = unique(order?.ingredients);

  const orderPrice = order.ingredients.reduce((acc, curValue) => {
    const ingredient = findIngredient(ingredients, curValue);
    if (ingredient) {
      return acc + ingredient.price;
    }
    return acc;
  }, 0);
  return (
    <div className={s.root}>
      <div>
        <p
          style={{ textAlign: "center" }}
          className="text text_type_digits-default mb-6"
        >
          #{order?.number}
        </p>
        <p className="text text_type_main-medium mb-2">{order?.name}</p>
        <p
          className={clsx(
            "text text_type_main-default mb-10",
            order.status === "done" && s.text_color_bold
          )}
        >
          {enumStatusOrder[order?.status as keyof object]}
        </p>

        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={clsx(s.ingredients, "mb-10 pr-4")}>
          {uniqueIngredients.map((item, index) => {
            const ingredient = findIngredient(ingredients, item);
            const countIngredient = order.ingredients.filter(
              (elem) => elem === item
            ).length;
            if (!ingredient) return <div key={index} />;
            return (
              <div className={clsx(s.ingredients__item, "mb-4")} key={index}>
                <div className={clsx(s.img, "mr-4")}>
                  <img key={index} src={ingredient.image_mobile} alt={item} />
                </div>
                <p
                  style={{ flexBasis: "80%" }}
                  className="text text_type_main-default"
                >
                  {ingredient.name}&nbsp;
                </p>
                <div className={s.total}>
                  <p className="text text_type_digits-default mr-1">
                    {countIngredient}&nbsp;x&nbsp;{ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
        <div className={s.bottom}>
          {order?.createdAt && (
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order?.createdAt)}
            </p>
          )}
          <div className={s.total}>
            <p className="text text_type_digits-default mr-1">{orderPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedOrder;
