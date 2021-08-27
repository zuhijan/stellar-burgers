import {
  wsConnectionClose,
  wsConnectionStart,
  wsClosed,
  wsConnectionOpened,
  wsGotError,
  wsGotMessage,
} from "../store/order/orderSlice";
import { AnyAction, MiddlewareAPI } from "redux";

export const socketMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { type, payload } = action;
      const { dispatch } = store;

      if (type === wsConnectionStart.toString())
        socket = new WebSocket(payload);
      if (type === wsConnectionClose.toString()) socket?.close();

      if (socket) {
        socket.onopen = () => dispatch(wsConnectionOpened());
        socket.onclose = () => dispatch(wsClosed());
        socket.onerror = (event) => {
          dispatch(wsGotError(event));
        };
        socket.onmessage = (event) =>
          dispatch(wsGotMessage(JSON.parse(event.data)));
      }

      next(action);
    };
  };
};
