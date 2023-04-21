import axios from "axios";
import { BASE_URL } from "../../url/url";
import { REGISTER_USER, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "../action-type/registrationTypes";

export const registerUser = (userData) => async(dispatch) => {
    try {
        dispatch({ type : REGISTER_USER})

        const data = await axios.post(`${BASE_URL}/users/register`, userData)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
      const { response } = error
        dispatch({
          type: REGISTER_USER_FAILURE,
          payload: response.data.error,
        });
      }
}