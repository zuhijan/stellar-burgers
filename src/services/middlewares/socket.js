import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_START,
  wsClosed,
  wsConnectionOpened,
  wsGotError,
  wsGotMessage,
} from "../store/orderSlice";

export const socketMiddleware = () => {
  return ({ dispatch }) => {
    let socket = null;

    return (next) => (action) => {
      const { type, payload } = action;

      if (type === WS_CONNECTION_START.toString())
        socket = new WebSocket(payload);
      if (type === WS_CONNECTION_CLOSE.toString()) socket.close();

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
