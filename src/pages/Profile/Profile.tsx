import React from "react";
import s from "./Profile.module.scss";
import clsx from "clsx";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, TUserData } from "../../services/store/authSlice";
import { authAPI } from "../../services/api/auth";
import { deleteCookie } from "../../services/utils/cookie";
import ProfileForm from "./ProfileForm/ProfileForm";
import ProfileLink from "./ProfileLink/ProfileLink";
import ProfileHistory from "./ProfileHistory/ProfileHistory";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { path } = useRouteMatch();

  const refreshToken = localStorage.getItem("refreshToken");

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
      <div className={clsx(s.content, "mt-30")}>
        <div style={{ minWidth: 320 }} className={"mr-15"}>
          <ProfileLink text="Профиль" to="/profile" />
          <ProfileLink text="История заказов" to="/profile/orders" />

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
        <Switch>
          <Route exact path={path}>
            <ProfileForm />
          </Route>
          <Route exact path={`${path}/orders`}>
            <ProfileHistory />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default Profile;
