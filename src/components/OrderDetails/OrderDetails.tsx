import React, { FC } from "react";
import s from "./OrderDetails.module.scss";
import clsx from "clsx";
import Modal from "../Modal/Modal";
import { ReactComponent as DoneIcon } from "../../images/done.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

export type OrderType = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export interface IOrderDetails {
  onClose(): void;
}

const OrderDetails: FC<IOrderDetails> = ({ onClose }) => {
  const order = useSelector(
    (state: RootState) => state.order.order as OrderType
  );
  return (
    <Modal onClose={onClose}>
      <div className={s.order}>
        <p className="text text_type_digits-large">
          {order.order && order.order.number}
        </p>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <DoneIcon className="m-15" />
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className={clsx(s.textColor, "text text_type_main-default mt-2")}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
};
export default OrderDetails;
