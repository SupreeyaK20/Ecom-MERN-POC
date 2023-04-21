import { BASE_URL } from '../../url/url';
import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from '../action-type/productTypes';
import api from '../../api/apiAuthorization'

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const response = await api.get(`${BASE_URL}/products`);
    const products = response.data;

    dispatch({ type: GET_PRODUCT_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAILURE, payload: error.message });
  }
};

// export const addCategory = (data) => async (dispatch) => {
//     try {
//       dispatch({ type: ADD_CATEGORY_REQUEST });
  
//       const response = await axios.post(`${BASE_URL}/category`, data);
//       const categories = response.data;
//         console.log("categories", categories);
//       dispatch({ type: ADD_CATEGORY_SUCCESS, payload: categories });
//     } catch (error) {
//       dispatch({ type: ADD_CATEGORY_FAILURE, payload: error.message });
//     }
//   };
