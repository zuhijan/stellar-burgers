import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import s from "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";
import { TIngredientType } from "../../services/utils/data";
import { fetchIngredients } from "../../services/store/ingredientsSlice";

import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import Ingredients from "../../pages/Ingredients/Ingredients";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { authAPI } from "../../services/api/auth";
import { deleteCookie, setCookie } from "../../services/utils/cookie";

export type IngredientsDataType = {
  bun: TIngredientType[];
  sauce: TIngredientType[];
  main: TIngredientType[];
};

export type SelectedIngredientsType = {
  bun: TIngredientType | null;
  other: TIngredientType[];
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  const refreshToken = localStorage.getItem("refreshToken");

  const checkToken = async () => {
    try {
      const res = await authAPI.updateToken({
        token: refreshToken as string,
      });
      if (res.success) {
        setCookie("token", res.accessToken, { expires: 1200 });
        localStorage.setItem("refreshToken", res.refreshToken);
      } else {
        deleteCookie("token");
        localStorage.removeItem("refreshToken");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    checkToken();
  }, [dispatch]);

  const background =
    history.action === "PUSH" && location.state && location.state.background;

  return (
    <div className={s.App}>
      <AppHeader />

      <Switch location={background || location}>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/"}>
          <Main />
        </Route>
        <Route exact path={"/register"}>
          <Register />
        </Route>
        <Route exact path={"/forgot-password"}>
          <ForgotPassword />
        </Route>
        <Route exact path={"/reset-password"}>
          <ResetPassword />
        </Route>
        <ProtectedRoute path={"/profile"}>
          <Profile />
        </ProtectedRoute>
        <Route exact path={"/ingredients/:ingredientId"}>
          <Ingredients />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredients/:ingredientId"
          children={<IngredientDetails />}
        />
      )}
    </div>
  );
}

export default App;
