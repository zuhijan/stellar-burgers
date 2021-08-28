import React, { FC, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { ReactComponentElement } from "react";

import { getUser } from "../services/store/auth/authSlice";
import { useDispatch, useSelector } from "../services/hooks";

interface IProtectedRoute {
  children: ReactComponentElement<any>;
  exact?: boolean;
  path: string;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
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
