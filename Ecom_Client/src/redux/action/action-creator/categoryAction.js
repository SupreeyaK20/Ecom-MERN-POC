import axios from 'axios';
import { BASE_URL } from '../../url/url';
import { ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from '../action-type/categoryTypes';

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });

    const response = await axios.get(`${BASE_URL}/category`);
    const categories = response.data;

    dispatch({ type: GET_CATEGORY_SUCCESS, payload: categories });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_FAILURE, payload: error.message });
  }
};

export const addCategory = (data) => async (dispatch) => {
    try {
      dispatch({ type: ADD_CATEGORY_REQUEST });
  
      const response = await axios.post(`${BASE_URL}/category`, data);
      const categories = response.data;
        console.log("categories", categories);
      dispatch({ type: ADD_CATEGORY_SUCCESS, payload: categories });
    } catch (error) {
      dispatch({ type: ADD_CATEGORY_FAILURE, payload: error.message });
    }
  };
