const LoginStart = () => ({
  type: "LOGIN_STARTexport ",
});

export const LoginSuccess = (payload) => ({
  type: "LOGIN_SUCCESS",
  payload: payload,
});

export const UpdateSuccess = (payload) => ({
  type: "UPDATE_SUCCESS",
  payload: payload,
});

export const LoginFailure = (payload) => ({
  type: "LOGIN_FAILURE",
  payload: payload,
});

export const SignUpStart = () => ({
  type: "SIGNUP_START",
});

export const SignUpSuccess = () => ({
  type: "SIGNUP_SUCCESS",
});

export const SignUpFailure = (err) => ({
  type: "SIGNUP_FAILURE",
  payload: err,
});

export const LogOut = () => ({
  type: "LOG_OUT",
});
