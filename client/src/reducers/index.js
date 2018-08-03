import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import products from './products';
import cart from './cart';

const rootReducer = combineReducers({
  auth,
  categories,
  products,
  cart
})

export default rootReducer;