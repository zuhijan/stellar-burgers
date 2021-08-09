import { TIngredientType } from "./data";

const formatData = (arr: TIngredientType[]) => {
  let mainArr: TIngredientType[] = [];
  let sauceArr: TIngredientType[] = [];
  let bunArr: TIngredientType[] = [];

  arr.forEach((item) => {
    if (item.type === "bun") bunArr.push(item);

    if (item.type === "main") mainArr.push(item);

    if (item.type === "sauce") sauceArr.push(item);
  });

  return {
    main: mainArr,
    bun: bunArr,
    sauce: sauceArr,
  };
};

export default formatData;
