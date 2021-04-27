import { ingredientType } from "./data";

const formatData = (arr: ingredientType[]) => {
  let mainArr: ingredientType[] = [];
  let sauceArr: ingredientType[] = [];
  let bunArr: ingredientType[] = [];

  arr.forEach((item) => {
    if (item.type === "bun") {
      bunArr.push(item);
    }
    if (item.type === "main") {
      mainArr.push(item);
    }
    if (item.type === "sauce") sauceArr.push(item);
  });

  return {
    main: mainArr,
    bun: bunArr,
    sauce: sauceArr,
  };
};

export default formatData;
