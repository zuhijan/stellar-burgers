import React, { FC } from "react";
import s from "./ProfileLink.module.scss";
import clsx from "clsx";
import { Link, useRouteMatch } from "react-router-dom";

interface IProfileLink {
  text: string;
  to: string;
}

const ProfileLink: FC<IProfileLink> = ({ text, to }) => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <Link to={to} className={s.link}>
      <p
        className={clsx(
          "text text_type_main-medium mt-6",
          !match && "text_color_inactive"
        )}
      >
        {text}
      </p>
    </Link>
  );
};

export default ProfileLink;
