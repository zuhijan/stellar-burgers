import React, { ChangeEvent, FC } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import s from "./Register.module.scss";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/store/auth/authSlice";
import { useDispatch } from "react-redux";

interface IRegister {}

const Register: FC<IRegister> = () => {
  const history = useHistory();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    dispatch(registerUser(form));
    history.replace({
      pathname: "/",
    });
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

  return (
    <div className={s.root}>
      <p className="text text_type_main-medium pt-6">Регистрация </p>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={"mb-6"} style={{ minWidth: 480 }}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeInput}
            value={form.name}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />{" "}
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChangeInput}
            value={form.email}
            name={"email"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={onChangeInput}
            icon={"ShowIcon"}
            value={form.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={"mt-10"}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to={"/login"} className={"text_color_link"}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
