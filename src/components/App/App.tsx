import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import s from "./App.module.scss";
import AppHeader from "../AppHeader/AppHeader";

import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import Ingredients from "../../pages/Ingredients/Ingredients";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute";
import { authAPI } from "../../services/api/auth";
import { deleteCookie, setCookie } from "../../services/utils/cookie";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { TRootState } from "../../services/store";
import { cleanOrderMade } from "../../services/store/order/orderSlice";
import {
  fetchIngredients,
  TIngredient,
} from "../../services/store/ingredients/ingredientsSlice";
import Feed from "../../pages/Feed/Feed";
import FeedOrder from "../../pages/Feed/FeedOrder/FeedOrder";

export type IngredientsDataType = {
  bun: TIngredient[];
  sauce: TIngredient[];
  main: TIngredient[];
};

export type SelectedIngredientsType = {
  bun: TIngredient | null;
  other: TIngredient[];
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  const refreshToken = localStorage.getItem("refreshToken");
  const { orderMade } = useSelector((state: TRootState) => state.order);

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

  const handleCloseIngredient = () => {
    history.replace({ pathname: "/" });
  };
  const handleCloseOrder = () => {
    dispatch(cleanOrderMade());
  };

  const handleCloseOrderFeed = () => {
    history.replace({ pathname: "/feed" });
  };
  const handleCloseProfileOrder = () => {
    history.replace({ pathname: "/profile/orders" });
  };
  const background =
    history.action === "PUSH" && location.state && location.state.background;

  return (
    <div className={s.App}>
      <AppHeader />
      <div className="content-wrapper">
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
          <ProtectedRoute exact path={"/profile/orders/:orderId"}>
            <FeedOrder profile={true} />
          </ProtectedRoute>
          <ProtectedRoute path={"/profile"}>
            <Profile />
          </ProtectedRoute>

          <Route exact path={"/ingredients/:ingredientId"}>
            <Ingredients />
          </Route>
          <Route exact path={"/feed"}>
            <Feed />
          </Route>
          <Route exact path={"/feed/:orderId"}>
            <FeedOrder />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
        {background && (
          <>
            <Route path={"/ingredients/:ingredientId"}>
              <Modal
                title={"Детали ингредиента"}
                onClose={handleCloseIngredient}
              >
                <Ingredients />
              </Modal>
            </Route>
            <Route exact path={"/feed/:orderId"}>
              <Modal onClose={handleCloseOrderFeed}>
                <FeedOrder />
              </Modal>
            </Route>
            <Route exact path={"/profile/orders/:orderId"}>
              <Modal onClose={handleCloseProfileOrder}>
                <FeedOrder />
              </Modal>
            </Route>
          </>
        )}

        {orderMade?.order?.number && (
          <Modal onClose={handleCloseOrder}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;
