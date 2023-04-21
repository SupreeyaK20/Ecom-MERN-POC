import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../../action-type/loginTypes";

export const authRequest = () => ({
    type: LOGIN_REQUEST,
  });
  
  export const authSuccess = (user, token) => ({
    type: LOGIN_SUCCESS,
    payload: {
      user,
      token,
    },
  });
  
  export const authFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: {
      error,
    },
  });

  export const logOutRequest = () =>({
    type: LOGOUT_REQUEST,
  })

  export const logOutSuccess = (error) => ({
    type: LOGOUT_SUCCESS,
    payload: {
      error,
      isAuthenticated: false,
    },
  })

  export const logOutFailure = (error) =>({
    type: LOGOUT_FAILURE,
    payload: {
      error,
    },
  })

