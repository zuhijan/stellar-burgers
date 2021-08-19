import { TIngredient } from "../store/ingredients/ingredientsSlice";

const formatData = (arr: TIngredient[]) => {
  let mainArr: TIngredient[] = [];
  let sauceArr: TIngredient[] = [];
  let bunArr: TIngredient[] = [];

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
