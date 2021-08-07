import React, { ChangeEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import s from "./Profile.module.scss";
import clsx from "clsx";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { TRootState } from "../../services/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  patchUser,
  setUserData,
  TUserData,
} from "../../services/store/authSlice";
import { authAPI } from "../../services/api/auth";
import { deleteCookie } from "../../services/utils/cookie";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userData } = useSelector((state: TRootState) => state.auth);
  const [form, setForm] = React.useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });
  const match = useRouteMatch({
    path: "/profile",
    exact: true,
  });
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

  const handleCancel = () => {
    setForm({
      name: userData.name,
      email: userData.email,
      password: "",
    });
  };

  const handleSubmit = () => {
    dispatch(patchUser(form));
  };

  const handleClickExit = async () => {
    try {
      await authAPI.logoutUser({ token: refreshToken as string });

      deleteCookie("token");
      localStorage.removeItem("refreshToken");
      dispatch(setUserData({} as TUserData));
      history.replace({ pathname: "/login" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.content}>
        <div className={"mr-15"}>
          <Link to={"/profile"} className={s.link}>
            <p
              className={clsx(
                "text text_type_main-medium mt-6",
                !match && "text_color_inactive"
              )}
            >
              Профиль
            </p>
          </Link>
          <p className="text text_type_main-medium text_color_inactive mt-6">
            История заказов
          </p>
          <p
            className={clsx(
              "text text_type_main-medium text_color_inactive mt-6",
              s.exit
            )}
            onClick={handleClickExit}
          >
            Выход
          </p>
        </div>
        <div>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChangeInput}
            icon={"EditIcon"}
            value={form.name}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={onChangeInput}
            icon={"EditIcon"}
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
            icon={"EditIcon"}
            value={form.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <div className={clsx(s.buttonLine, "mt-6")}>
            <Button onClick={handleCancel} type="secondary" size="medium">
              Отмена
            </Button>
            <Button onClick={handleSubmit} type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
