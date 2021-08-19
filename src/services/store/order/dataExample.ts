export const INGREDIENT_EXAMPLE = {
  _id: "60d3b41abdacab0026a733c7",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

export const ORDER_MADE_EXAMPLE = {
  success: true,
  name: "Флюоресцентный бургер",
  order: {
    ingredients: [],
    _id: "611c9d449d952f001b8250a9",
    owner: {
      name: "zuhijan12",
      email: "zuhijan@yandex.ru",
      createdAt: "2021-07-29T08:55:31.114Z",
      updatedAt: "2021-08-08T19:35:45.923Z",
    },
    status: "done",
    name: "Флюоресцентный бургер",
    createdAt: "2021-08-18T05:40:20.702Z",
    updatedAt: "2021-08-18T05:40:20.748Z",
    number: 2009,
    price: 988,
  },
};

export const ORDER_FEED_EXAMPLE = {
  _id: "611c9d449d952f001b8250a9",
  ingredients: ["60d3b41abdacab0026a733c7"],
  status: "done",
  name: "Флюоресцентный бургер",
  createdAt: "2021-08-18T05:40:20.702Z",
  updatedAt: "2021-08-18T05:40:20.748Z",
  number: 2009,
};
