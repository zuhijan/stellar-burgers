import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./FeedOrder.module.scss";
import { orderType } from "../../../services/utils/data";
import clsx from "clsx";

interface IFeedOrder {
  order: orderType;
}

const FeedOrder: FC<IFeedOrder> = ({ order }) => {
  return (
    <div className={s.root}>
      <div>
        <p
          style={{ textAlign: "center" }}
          className="text text_type_digits-default mb-6"
        >
          #{order.number}
        </p>
        <p className="text text_type_main-medium mb-2">{order.name}</p>
        <p className="text text_type_main-default mb-10">Выполнен</p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div className={clsx(s.ingredients, "mb-10 pr-4")}>
          {order.data.map((item) => (
            <div className={clsx(s.ingredients__item, "mb-4")} key={item._id}>
              <div className={clsx(s.img, "mr-4")}>
                <img key={item._id} src={item.image_mobile} alt={item.name} />
              </div>
              <p
                style={{ flexBasis: "80%" }}
                className="text text_type_main-default"
              >
                {item.name}
              </p>
              <div className={s.total}>
                <p className="text text_type_digits-default mr-1">
                  {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div className={s.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            {order.time}
          </p>
          <div className={s.total}>
            <p className="text text_type_digits-default mr-1">{order.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedOrder;
