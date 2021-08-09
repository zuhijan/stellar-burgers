import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./FeedOrderCard.module.scss";
import { orderType } from "../../../services/utils/data";
import clsx from "clsx";
interface IFeedOrderCard {
  order: orderType;
}

const FeedOrderCard: FC<IFeedOrderCard> = ({ order }) => {
  const hiddenCount = order.data.length - 5;
  return (
    <div className={clsx(s.root, "p-6 m-2")}>
      <div className={s.line}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {order.time}
        </p>
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">{order.name}</p>
      <div className={s.line}>
        <div className={clsx(s.ingredients, "pl-5")}>
          {order.data.map((item, index) => {
            if (index > 5) return;
            if (index === 5) {
              return (
                <div className={s.img}>
                  <img key={item._id} src={item.image_mobile} alt={item.name} />
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
              <div className={s.img}>
                <img key={item._id} src={item.image_mobile} alt={item.name} />
              </div>
            );
          })}
        </div>
        <div className={s.total}>
          <p className="text text_type_digits-default mr-1">{order.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default FeedOrderCard;
