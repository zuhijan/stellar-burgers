import { BASE_URL } from "./index";
import { EnumEndpoints } from "./enumEndpoints";
import { getCookie } from "../utils/cookie";

export const constructorAPI = {
  async getIngredients() {
    return await fetch(BASE_URL + EnumEndpoints.ingredients, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Статус ошибки" + res.status);
        }
        return res.json();
      })
      .then(({ data }) => data);
  },
  async postOrder(form: { ingredients: string[] }) {
    return await fetch(BASE_URL + EnumEndpoints.orders, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token") as string,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          throw new Error(res.message);
        }
        return res;
      });
  },
};
