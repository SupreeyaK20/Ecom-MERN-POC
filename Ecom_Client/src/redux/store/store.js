import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducer/authReducer';
import { loginReducer } from '../reducer/loginReducer';
import userReducer from '../reducer/userReducer';
import categoryReducer from '../reducer/categoryReducer';
import productReducer from '../reducer/productReducer';

const rootReducer = combineReducers({
  register: authReducer,
  login : loginReducer,
  user : userReducer,
  category : categoryReducer,
  product : productReducer

  // add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
