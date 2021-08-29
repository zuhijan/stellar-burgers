import React from "react";
import s from "./OrderDetails.module.scss";
import clsx from "clsx";
import { ReactComponent as DoneIcon } from "../../images/done.svg";

import { useSelector } from "../../services/hooks";

const OrderDetails = () => {
  const { orderMade } = useSelector((state) => state.order);
  return (
    <div className={s.order}>
      <p className="text text_type_digits-large">
        {orderMade.order && orderMade.order.number}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <DoneIcon className="m-15" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={clsx(s.textColor, "text text_type_main-default mt-2")}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
export default OrderDetails;
