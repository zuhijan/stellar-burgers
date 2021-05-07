import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
const TABS = [
  {
    value: "bun",
    name: "Булки",
  },
  {
    value: "sauce",
    name: "Соусы",
  },
  {
    value: "main",
    name: "Начинки",
  },
];

export interface ITabs {
  current: string;
  setCurrent(value: string): void;
}

const Tabs: FC<ITabs> = ({ current, setCurrent }) => {
  return (
    <div style={{ display: "flex" }}>
      {TABS.map(({ value, name }) => (
        <Tab
          key={value}
          value={value}
          active={current === value}
          onClick={() => setCurrent(value)}
        >
          {name}
        </Tab>
      ))}
    </div>
  );
};
export default Tabs;
