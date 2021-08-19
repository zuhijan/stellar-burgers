import React, { ChangeEvent, FormEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import s from "../Profile.module.scss";
import { patchUser } from "../../../services/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../../services/store";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { userData } = useSelector((state: TRootState) => state.auth);

  const [form, setForm] = React.useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(patchUser(form));
  };
  return (
    <form onSubmit={handleSubmit}>
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
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
export default ProfileForm;
