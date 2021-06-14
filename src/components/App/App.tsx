import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import { ingredientType } from "../../utils/data";
import s from "./App.module.scss";
import { fetchIngredients } from "../../services/ingredientsSlice";

import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Feed from "../../pages/Feed/Feed";
import FeedOrder from "../../pages/Feed/FeedOrder/FeedOrder";
import Profile from "../../pages/Profile/Profile";
import ProfileHistory from "../../pages/Profile/ProfileHistory/ProfileHistory";
import ProfileHistoryOrder from "../../pages/Profile/ProfileHistoryOrder/ProfileHistoryOrder";
import Ingredients from "../../pages/Ingredients/Ingredients";

export const API_URL = "https://norma.nomoreparties.space/api";

export type IngredientDataType = {
  bun: ingredientType[];
  sauce: ingredientType[];
  main: ingredientType[];
};

export type SelectedIngredientsType = {
  bun: ingredientType | null;
  other: ingredientType[];
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={s.App}>
      <AppHeader />
      <Router>
        <Route exact path={"/"}>
          <Main />
        </Route>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/register"}>
          <Register />
        </Route>
        <Route exact path={"/forgot-password"}>
          <ForgotPassword />
        </Route>
        <Route path={"/feed"}>
          <Feed />
        </Route>
        <Route exact path={"/feed/:id"}>
          <FeedOrder />
        </Route>
        <Route path={"/profile"}>
          <Profile />
        </Route>
        <Route path={"/profile/orders"}>
          <ProfileHistory />
        </Route>
        <Route exact path={"/profile/orders/:id"}>
          <ProfileHistoryOrder />
        </Route>
        <Route exact path={"/ingredients/:id"}>
          <Ingredients />
        </Route>
      </Router>
    </div>
  );
}

export default App;
