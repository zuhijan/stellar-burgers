import authReducer, { setUserData } from "./authSlice";
import { initialState } from "./authSlice";

describe("Auth reducer tests", () => {
  test("should return the initial state", () =>
    expect(authReducer(undefined, { type: {} })).toEqual(initialState));

  test("should handle order/setUserData", () => {
    const payload = { email: "some-email", name: "some-name" };

    expect(authReducer(initialState, setUserData(payload))).toEqual({
      ...initialState,
      userData: payload,
    });
  });
});
