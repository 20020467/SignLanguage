export const enum Action {
  LOGIN_START,
  LOGIN_SUCCESS,
  UPDATE_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOG_OUT,
  DATA_CHANGED,
  DATA_NOTCHANGED,
}

// Define app actions

type Payload = {
  id?: number,
  username?: string,
  token?: string,
  error?:  string,
  // [k: string]: any,
}

export type AppAction = {
  type: Action,
  payload?: Payload
}

export const LoginStart = () : AppAction => ({
  type: Action.LOGIN_START,
});

export const LoginSuccess = (payload: Payload) : AppAction => ({
  type: Action.LOGIN_SUCCESS,
  payload: payload,
});

export const UpdateSuccess = (payload: Payload) : AppAction => ({
  type: Action.UPDATE_SUCCESS,
  payload: payload,
});

export const LoginFailure = (payload: Payload) : AppAction => ({
  type: Action.LOGIN_FAILURE,
  payload: payload,
});

export const SignUpStart = () : AppAction => ({
  type: Action.SIGNUP_START,
});

export const SignUpSuccess = () : AppAction => ({
  type: Action.SIGNUP_SUCCESS,
});

export const SignUpFailure = (error: string) : AppAction => ({
  type: Action.SIGNUP_FAILURE,
  payload: {
    error
  },
});

export const LogOut = () : AppAction => ({
  type: Action.LOG_OUT,
});

export const DataChanged = () : AppAction => ({
  type: Action.DATA_CHANGED,
});

export const DataNotchanged = () : AppAction => ({
  type: Action.DATA_NOTCHANGED,
});

