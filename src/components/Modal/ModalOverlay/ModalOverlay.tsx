import React, { FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import s from "./ModalOverlay.module.scss";
const modalRoot = document.getElementById("react-modals");

interface IModalOverlay {
  onClose(): void;
}

const ModalOverlay: FC<IModalOverlay> = ({ children, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickClose = (e: MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    };

    if (overlayRef && overlayRef.current) {
      overlayRef.current.addEventListener("click", handleClickClose);
    }
    return () => {
      if (overlayRef && overlayRef.current) {
        overlayRef.current.removeEventListener("click", handleClickClose);
      }
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return modalRoot
    ? ReactDOM.createPortal(
        <div ref={overlayRef} className={s.overlay}>
          {children}
        </div>,
        modalRoot
      )
    : null;
};
export default ModalOverlay;
