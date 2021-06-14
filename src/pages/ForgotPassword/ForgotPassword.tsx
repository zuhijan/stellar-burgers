import React, { FC } from "react";
import s from "./ForgotPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

interface IForgotPassword {}

const ForgotPassword: FC<IForgotPassword> = (props) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    alert("Icon Click Callback");
  };
  return (
    <div className={s.root}>
      <p className="text text_type_main-medium pt-6">Восстановление пароля </p>
      <div className={"mb-6"} style={{ minWidth: 480 }}>
        <Input
          type={"email"}
          placeholder={"укажите e-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <Button type="primary" size="medium">
        Восстановить
      </Button>
      <div className={"mt-10"}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
