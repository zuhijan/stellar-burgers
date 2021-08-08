import React, { FC } from "react";
import s from "./AppHeaderItem.module.scss";
import clsx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";

interface IAppHeaderItem {
  icon: JSX.Element;
  text: string;
  to: string;
  className?: string;
}

const AppHeaderItem: FC<IAppHeaderItem> = ({ icon, text, to, className }) => {
  const match = useRouteMatch({
    path: to,
    exact: to === "", // true только для "/"
  });

  return (
    <Link
      to={to}
      className={clsx(s.root, className, match && s.selected, "p-2")}
    >
      {icon} <p className={clsx("ml-1", "text_type_main-default")}>{text}</p>
    </Link>
  );
};
export default AppHeaderItem;
