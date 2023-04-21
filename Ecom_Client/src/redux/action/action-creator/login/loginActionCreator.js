import axios from "axios";
import jwtDecode from 'jwt-decode';
import { BASE_URL } from "../../../url/url";
import { CLEAR_LOGIN_ERROR } from "../../action-type/loginTypes";

import { authFailure, authRequest, authSuccess, logOutFailure, logOutRequest, logOutSuccess } from "./loginAction";

export const loginUser = (userData) => async (dispatch) => {
    try {
      dispatch(authRequest());
  
      const { data } = await axios.post(`${BASE_URL}/users/login`, userData);
      const { accessToken } = data;
      sessionStorage.setItem('jwtToken', accessToken);
      // localStorage.setItem('loggedIn', true);
      
  
      const decodedToken = jwtDecode(accessToken);
      const { id, username, email: decodedEmail, role, phone } = decodedToken.user;
  
      dispatch(authSuccess({ id, username, email: decodedEmail, role, phone }, accessToken ));
    } catch (error) {
      dispatch(authFailure(error.response.data.error));
    }
};

export const checkToken = () => (dispatch) => {
  const token = sessionStorage.getItem('jwtToken');

  if (token) {
    const decodedToken = jwtDecode(token);
    const { id, username, email: decodedEmail, role, phone } = decodedToken.user;

    dispatch(authSuccess({ id, username, email: decodedEmail, role, phone }, token));
  }
};


export const logOut = () => async(dispatch) =>{
  const getJWT = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
  await dispatch(logOutRequest());

  if(getJWT && getJWT.length){
    await dispatch(logOutSuccess({error : 'Successfully Logout'})); 
    sessionStorage.removeItem('jwtToken');
  }
  else{
    await dispatch(logOutFailure({error : 'Something went wrong'})); 
  }
}


export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});

  