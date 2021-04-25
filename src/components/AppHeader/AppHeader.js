import React from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./AppHeader.module.scss";
import AppHeaderItem from "./AppHeaderItem/AppHeaderItem";

const AppHeader = (props) => {
  return (
    <header className={s.header}>
      <nav className={s.navigation}>
        <AppHeaderItem selected text={"Конструктор"} icon={<BurgerIcon />} />
        <AppHeaderItem text={"Лента заказов"} icon={<ListIcon />} />
        <AppHeaderItem
          className={s.flexEnd}
          text={"Личный кабинет"}
          icon={<ProfileIcon />}
        />
      </nav>
      <div className={s.logo}>
        <Logo />
      </div>
    </header>
  );
};
export default AppHeader;
