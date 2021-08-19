import orderReducer, {
  cleanOrderMade,
  cleanOrders,
  TOrderMade,
  TWSOrder,
  wsClosed,
  wsConnectionOpened,
  wsGotError,
  wsGotMessage,
} from "./orderSlice";
import { ORDER_FEED_EXAMPLE, ORDER_MADE_EXAMPLE } from "./dataExample";
import { initialState } from "./orderSlice";

describe("Order reducer tests", () => {
  test("should return the initial state", () =>
    expect(orderReducer(undefined, { type: {} })).toEqual(initialState));

  test("should handle order/cleanOrderMade", () => {
    const prevState = {
      ...initialState,
      orderMade: ORDER_MADE_EXAMPLE,
    };
    expect(orderReducer(prevState, cleanOrderMade())).toEqual(initialState);
  });

  test("should handle order/cleanOrders", () => {
    const prevState = {
      ...initialState,
      orders: [ORDER_FEED_EXAMPLE, ORDER_FEED_EXAMPLE],
    };
    expect(orderReducer(prevState, cleanOrders())).toEqual(initialState);
  });

  test("should handle order/wsConnectionOpened", () => {
    const expState = {
      ...initialState,
      wsConnected: true,
      wsError: null,
    };

    expect(orderReducer(initialState, wsConnectionOpened())).toEqual(expState);
  });

  test("should handle order/wsGotMessage", () => {
    const payload = {
      orders: [ORDER_FEED_EXAMPLE],
      total: 12,
      totalToday: 14,
    };
    const expState = { ...initialState, ...payload };
    expect(orderReducer(initialState, wsGotMessage(payload))).toEqual(expState);
  });

  test("should handle order/wsGotError", () => {
    const payload = "something";
    const expState = { ...initialState, wsError: payload };
    expect(orderReducer(initialState, wsGotError(payload))).toEqual(expState);
  });

  test("should handle order/wsClosed", () => {
    const prevState = {
      ...initialState,
      wsError: "something",
      wsConnected: true,
    };
    expect(orderReducer(prevState, wsClosed())).toEqual(initialState);
  });
});
