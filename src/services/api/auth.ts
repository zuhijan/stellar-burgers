import { EnumEndpoints } from "./enumEndpoints";
import { BASE_URL } from "./index";
import { TLoginUserParams, TRegisterUserParams } from "../store/auth/authSlice";
import { getCookie } from "../utils/cookie";

export const authAPI = {
  async forgotPassword(form: { email: string }) {
    return await fetch(BASE_URL + EnumEndpoints.forgotResetPassword, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
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
          throw new Error("ERROR:" + res.message);
        }
        return res;
      });
  },
  async resetPassword(form: { password: string; token: string }) {
    return await fetch(BASE_URL + EnumEndpoints.resetPassword, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
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
          throw new Error("ERROR:" + res.message);
        }
        return res;
      });
  },
  async registerUser(form: TRegisterUserParams) {
    return await fetch(BASE_URL + EnumEndpoints.registerUser, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
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
  async loginUser(form: TLoginUserParams) {
    return await fetch(BASE_URL + EnumEndpoints.loginUser, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
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
          throw new Error("ERROR:" + res.message);
        }
        return res;
      });
  },
  // refreshToken
  async logoutUser(form: { token: string }) {
    return await fetch(BASE_URL + EnumEndpoints.logoutUser, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    });
  },
  // refreshToken
  async updateToken(form: { token: string }) {
    return await fetch(BASE_URL + EnumEndpoints.updateToken, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
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
          console.log(`### error`);
          throw new Error(res.message);
        }
        return res;
      });
  },
  async getAuthUser() {
    return await fetch(BASE_URL + EnumEndpoints.user, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token") as string,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          console.log(`### error`);
          throw new Error(res.message);
        }
        return res;
      });
  },
  async patchAuthUser(form: TLoginUserParams) {
    return await fetch(BASE_URL + EnumEndpoints.user, {
      method: "PATCH",
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
          throw new Error("ERROR:" + res.message);
        }
        return res;
      });
  },
};
