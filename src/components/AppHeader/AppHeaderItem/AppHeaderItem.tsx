import React, { FC } from "react";
import s from "./AppHeaderItem.module.scss";
import clsx from "clsx";

interface IAppHeaderItem {
  icon: JSX.Element;
  text: string;
  selected?: boolean;
  className?: string;
}

const AppHeaderItem: FC<IAppHeaderItem> = ({
  icon,
  text,
  selected,
  className,
}) => {
  return (
    <div className={clsx(s.root, className, selected && s.selected, "p-2")}>
      {icon} <p className={clsx("ml-1", "text_type_main-default")}>{text}</p>
    </div>
  );
};
export default AppHeaderItem;
