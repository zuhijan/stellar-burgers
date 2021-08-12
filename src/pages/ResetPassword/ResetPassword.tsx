import React, { FormEvent, useState } from "react";
import s from "./ResetPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { authAPI } from "../../services/api/auth";
import { ILocationState } from "../Login/Login";

const ResetPassword = () => {
  const history = useHistory();
  const { state } = useLocation<ILocationState>();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const refreshToken = localStorage.getItem("refreshToken");

  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    alert("Icon Click Callback");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await authAPI.resetPassword({ password, token: code });
      history.replace({
        pathname: "/login",
      });
    } catch (err) {
      console.log(`### err`, err);
    }
  };

  if (refreshToken) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  if (!(state?.from.pathname === "/forgot-password")) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  return (
    <div className={s.root}>
      <p className="text text_type_main-medium pt-6">Восстановление пароля </p>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={"mb-6"} style={{ minWidth: 480 }}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            icon={"ShowIcon"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
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
export default ResetPassword;
