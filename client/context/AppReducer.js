export default AppReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: "",
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.username,
        error: false,
        token: action.payload.token,
      };
    case "UPDATE_SUCCESS":
      console.log(action.payload);
      console.log("update success");
      return {
        user: action.payload.user,
        error: false,
      };
    case "LOGIN_FAILURE":
      console.log("fail " + action.payload);
      return {
        user: "",
        error: true,
      };
    case "SIGNUP_START":
      return {
        user: "",
        error: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        user: "",
        error: false,
      };
    case "SIGNUP_FAILURE":
      return {
        user: "",
        error: true,
      };
    case "LOG_OUT":
      return {
        user: "",
        error: false,
      };
    default:
      return state;
  }
};
