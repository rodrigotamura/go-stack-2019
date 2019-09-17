import  { combineReducers } from 'redux';

import cart from './cart/reducer';
// import user from './user/reducer.js';

export default combineReducers({
  cart,
  // and another reducers
  // user,
})
