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
    const currentEl = overlayRef.current;
    const handleClickClose = (e: MouseEvent) => {
      if (e.target === currentEl) {
        onClose();
      }
    };

    if (overlayRef && currentEl) {
      currentEl.addEventListener("click", handleClickClose);
    }
    return () => {
      if (overlayRef && currentEl) {
        currentEl.removeEventListener("click", handleClickClose);
      }
    };
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

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
