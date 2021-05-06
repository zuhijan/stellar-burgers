import React, { FC } from "react";
import s from "./Modal.module.scss";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";

export interface IModal {
  title?: string;
  onClose(): void;
}

const Modal: FC<IModal> = ({ title, children, onClose }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div className={clsx(s.modal, "pt-30 pb-30 pl-25 pr-25")}>
        <CloseIcon type="primary" onClick={onClose} />
        <h3 className="text text_type_main-large">{title}</h3>
        {children}
      </div>
    </ModalOverlay>
  );
};
export default Modal;
