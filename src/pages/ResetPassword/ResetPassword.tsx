import React, { FC, useState } from "react";
import s from "./ResetPassword.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { authAPI } from "../../services/api/auth";
import { ILocationState } from "../Login/Login";
import { useSelector } from "react-redux";
import { TRootState } from "../../services/store/store";

interface IResetPassword {}

const ResetPassword: FC<IResetPassword> = (props) => {
  const history = useHistory();
  const { state } = useLocation<ILocationState>();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { userData } = useSelector((state: TRootState) => state.auth);

  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    alert("Icon Click Callback");
  };

  const resetPassword = async () => {
    try {
      await authAPI.resetPassword({ password, token: code });
      history.replace({
        pathname: "/login",
      });
    } catch (err) {
      console.log(`### err`, err);
    }
  };
  console.log(`### state`, state);

  if (userData.email && userData.name) {
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
      <Button onClick={resetPassword} type="primary" size="medium">
        Сохранить
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
export default ResetPassword;
