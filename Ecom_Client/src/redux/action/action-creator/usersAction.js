import axios from 'axios';
import { BASE_URL } from '../../url/url';
import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../action-type/userTypes';
import api from '../../api/apiAuthorization';


export const getAllUsers = () => async(dispatch) => {
    try {
        
        dispatch({ type : GET_ALL_USERS_REQUEST})

        const response = await api.get('/users')
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
      const { response } = error
        dispatch({
          type: GET_ALL_USERS_FAILURE,
          payload: response.data.error,
        });
      }
}

export const deleteUser = (id) => async(dispatch) =>{
    dispatch({type : DELETE_USER_REQUEST})
    
    try {
      console.log("inside delete user try block");
        const response = await api.delete(`/users/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        const { response } = error
          dispatch({
            type: DELETE_USER_FAILURE,
            payload: response.error,
          });
    }
    
}

export const updateUser = (id, data) => async(dispatch) =>{
    dispatch({type : UPDATE_USER_REQUEST})
    try {
       const response = await axios.put(`${BASE_URL}/users/${id}`, data)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        const { response } = error
          dispatch({
            type: UPDATE_USER_FAILURE,
            payload: response.data.error,
          });
    }
    
}


