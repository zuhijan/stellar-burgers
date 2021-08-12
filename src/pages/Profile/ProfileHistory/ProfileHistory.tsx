import React, { useEffect } from "react";
import FeedOrderCard from "../../Feed/FeedOrderCard/FeedOrderCard";
import s from "./ProfileHistory.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import {
  TWSOrder,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
} from "../../../services/store/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../../services/store/store";
import { getCookie } from "../../../services/utils/cookie";

export const USER_ORDERS_URL = "wss://norma.nomoreparties.space/orders";

const ProfileHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { orders } = useSelector((state: TRootState) => state.order);

  useEffect(() => {
    const accessToken = getCookie("token")?.split(" ")[1];
    dispatch(WS_CONNECTION_START(USER_ORDERS_URL + `?token=${accessToken}`));
    return () => {
      dispatch(WS_CONNECTION_CLOSE());
    };
  }, [dispatch]);

  const handleClick = (order: TWSOrder) => {
    history.push({
      pathname: "/profile/orders/" + order.number,
      state: { background: location },
    });
  };

  return (
    <div className={s.root}>
      {orders.map((order) => (
        <FeedOrderCard
          status={true}
          order={order}
          key={order.number}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
export default ProfileHistory;
