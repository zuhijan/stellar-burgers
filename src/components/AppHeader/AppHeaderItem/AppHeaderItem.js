import React from "react";
import s from "./AppHeaderItem.module.scss";
import clsx from "clsx";

const AppHeader = ({ icon, text, selected, className }) => {
  return (
    <div className={clsx(s.root, className, selected && s.selected, "p-2")}>
      {icon} <p className={clsx("ml-1", "text_type_main-default")}>{text}</p>
    </div>
  );
};
export default AppHeader;
