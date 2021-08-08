import React, { FC, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ReactComponentElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../services/store/store";
import { getUser } from "../services/store/authSlice";

interface IProtectedRoute {
  children: ReactComponentElement<any>;
  exact?: boolean;
  path: string;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: TRootState) => state.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.name && userData.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
