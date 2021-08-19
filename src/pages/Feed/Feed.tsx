import React, { useEffect } from "react";
import s from "./Feed.module.scss";
import clsx from "clsx";
import FeedOrderCard from "./FeedOrderCard/FeedOrderCard";
import { useHistory, useLocation } from "react-router-dom";
import {
  cleanOrders,
  TWSOrder,
  wsConnectionClose,
  wsConnectionStart,
} from "../../services/store/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../services/store";

export const ALL_ORDERS_URL = "wss://norma.nomoreparties.space/orders/all";

const Feed = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { orders, total, totalToday } = useSelector(
    (state: TRootState) => state.order
  );

  useEffect(() => {
    dispatch(wsConnectionStart(ALL_ORDERS_URL));
    return () => {
      dispatch(wsConnectionClose());
      dispatch(cleanOrders());
    };
  }, [dispatch]);

  const handleClick = (order: TWSOrder) => {
    history.push({
      pathname: "/feed/" + order.number,
      state: { background: location },
    });
  };

  const ordersDone = orders.filter(
    (item, index) => item.status === "done" && index < 9
  );
  const ordersPending = orders.filter(
    (item, index) => item.status === "pending" && index < 9
  );
  return (
    <div className={clsx(s.root, "content-wrapper")}>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={s.content}>
        <div className={s.content__column}>
          {orders.map((order, index) => (
            <FeedOrderCard order={order} key={index} onClick={handleClick} />
          ))}
        </div>
        <div className={clsx(s.content__column, "pl-15")}>
          <div className={clsx(s.status, "mb-15")}>
            <div className={s.status__column}>
              <p className="text text_type_main-medium mb-6">Готовы: </p>
              <div className={s.column__feed}>
                {ordersDone.map((item, index) => (
                  <p
                    key={index}
                    className={clsx(
                      s.text_color_bold,
                      "text text_type_digits-default mb-1"
                    )}
                  >
                    {item.number}
                  </p>
                ))}
              </div>
            </div>
            <div className={s.status__column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <div className={s.column__feed}>
                {ordersPending.map((item, index) => (
                  <p
                    key={index}
                    className={clsx("text text_type_digits-default mb-1")}
                  >
                    {item.number}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large mb-15">{total}</p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  );
};
export default Feed;
