import React, { FC } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./AppHeader.module.scss";
import AppHeaderItem from "./AppHeaderItem/AppHeaderItem";
import clsx from "clsx";

interface IAppHeader {
  className?: string;
}

const AppHeader: FC<IAppHeader> = ({ className }) => {
  return (
    <header className={clsx(s.header, className)}>
      <div className={clsx(s.content, "content-wrapper")}>
        <nav className={s.navigation}>
          <AppHeaderItem
            text={"Конструктор"}
            icon={<BurgerIcon type="primary" />}
            to={""}
          />
          <AppHeaderItem
            text={"Лента заказов"}
            icon={<ListIcon type="primary" />}
            to={"/feed"}
          />
          <AppHeaderItem
            className={s.flexEnd}
            text={"Личный кабинет"}
            icon={<ProfileIcon type="primary" />}
            to={"/profile"}
          />
        </nav>
        <div className={s.logo}>
          <Logo />
        </div>
      </div>
    </header>
  );
};
export default AppHeader;
