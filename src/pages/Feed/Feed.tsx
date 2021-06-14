import React, { FC } from "react";
import s from "./Feed.module.scss";
import clsx from "clsx";
import FeedOrderCard from "./FeedOrderCard/FeedOrderCard";
import { ORDER_FEED } from "../../utils/data";

interface IFeed {}

const Feed: FC<IFeed> = (props) => {
  return (
    <div className={clsx(s.root, "content-wrapper")}>
      <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
      <div className={s.content}>
        <div className={s.content__column}>
          {ORDER_FEED.map((order) => (
            <FeedOrderCard order={order} key={order._id} />
          ))}
        </div>
        <div className={clsx(s.content__column, "pl-15")}>
          <div className={clsx(s.status, "mb-15")}>
            <div className={s.status__column}>
              <p className="text text_type_main-medium mb-6">Готовы: </p>
              <div className={s.column__feed}>
                <p
                  className={clsx(
                    s.text_color_bold,
                    "text text_type_digits-default mb-1"
                  )}
                >
                  034533
                </p>
              </div>
            </div>
            <div className={s.status__column}>
              <p className="text text_type_main-medium mb-6">В работе:</p>
              <div className={s.column__feed}>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
                <p className="text text_type_digits-default mb-1">034533</p>
              </div>
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large mb-15">28 752</p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large"> 752</p>
        </div>
      </div>
    </div>
  );
};
export default Feed;
