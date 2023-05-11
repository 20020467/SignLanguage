import { Action, AppAction } from "./AppActions";

export type GlobalContextState = {
  id?: number,
  username?: string,
  // email?: string,
  // phone?: string,
  token?: string,
  error?: string | boolean,
  dataChanged?: boolean,
}

export default function AppReducer(state: GlobalContextState, action: AppAction): GlobalContextState {
  const { username, token, error, dataChanged } = state // current state
  const { type, payload } = action

  switch (type) {
    case Action.LOGIN_START: // ?
      return {
        error: false, // may not be specified
      };

    case Action.LOGIN_SUCCESS:
      return {
        id: payload.id,
        username: payload.username,
        token: payload.token,
        error: false,
      };

    case Action.LOGIN_FAILURE:
      console.log("fail " + payload);
      return {
        username,
        error: payload.error,
      };

    case Action.UPDATE_SUCCESS:
      console.log(payload);
      console.log("update success");
      return {
        username: payload.username,
        error: false,
        dataChanged: true,
      };

    case Action.SIGNUP_START:
      return {
        username: "",
        error: false,
      };

    case Action.SIGNUP_SUCCESS:
      return {
        username: "",
        error: false,
        // dataChanged: false,
      };

    case Action.SIGNUP_FAILURE:
      return {
        username: "",
        error: true,
      };

    case Action.LOG_OUT:
      return {
        username: "",
        error: false,
        dataChanged: false,
      };

    case Action.DATA_CHANGED:
      return {
        username,
        token,
        error,
        dataChanged: true,
      }
    case Action.DATA_NOTCHANGED:
      return {
        username,
        token,
        error,
        dataChanged: false,
      }

    default:
      return state;
  }
};

