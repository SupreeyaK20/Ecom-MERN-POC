import { CLEAR_LOGIN_ERROR, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../action/action-type/loginTypes";
import { initialState } from "../state/initialState";

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload.user,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
          isAuthenticated: false,
        };

      case CLEAR_LOGIN_ERROR:
          return {
            ...state,
            error: null,
          };

        case LOGOUT_REQUEST:
          return {
            ...state,
            loading: true,
            error: null,
        };
      case LOGOUT_SUCCESS:
          return {
            user :  {},
            loading: false,
            isAuthenticated: false,
            error: action.payload.error,
            asyncStatus : "success",
        };


      case LOGOUT_FAILURE:
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            asyncStatus : "error"
        };


      default:
        return state;
    }
};

  // export const logoutReducer = (state = initialLoginState, action) => {
  //   switch (action.type) {
  //     case LOGOUT_REQUEST:
  //         return {
  //           ...state,
  //           loading: true,
  //           error: null,
  //       };
  //     case LOGOUT_SUCCESS:
  //         return {
  //           user :  {},
  //           loading: false,
  //           isAuthenticated: false,
  //           error: action.payload.error,
  //           asyncStatus : "success",
  //       };


  //     case LOGOUT_FAILURE:

  //         return {
  //           ...state,
  //           error: action.payload.error,
  //           loading: false,
  //           isAuthenticated: true,
  //           asyncStatus : "error"
  //       };

  //     default:
  //       return state;
  //   }
  // };


  