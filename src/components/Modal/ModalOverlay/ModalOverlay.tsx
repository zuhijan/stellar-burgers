import React, { FC } from "react";
import ReactDOM from "react-dom";
import s from "./ModalOverlay.module.scss";
const modalRoot = document.getElementById("react-modals");

const ModalOverlay: FC = ({ children }) => {
  return modalRoot
    ? ReactDOM.createPortal(
        <div className={s.overlay}>{children}</div>,
        modalRoot
      )
    : null;
};
export default ModalOverlay;
