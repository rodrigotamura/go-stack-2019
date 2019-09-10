import { createStore } from 'redux';

// we cannot create a Store without any reducer

// the fist reducer we'll create is Cart reducer
/*
function cart() {
  // the state will starts with an empty array
  return [];
}

FOR ORGANIZATION we will not create the reducers directly here,
we will separate in differents modules at /src/store/modules/*
and import them here

import reducer from './modules/cart/reducer';
*/

/**
 * BUT if we have many reducers, like cart, user and so on, we will import
 * Combine Reducers?. (see README file)
 */
import rootReducer from './modules/rootReducer';

/**
 * Integrating REactotron into with Redux
 */
const enhancer =
  process.env.NODE_ENV === "development" ? console.tron.createEnhancer() : null;


// when we pass only one reducer basically our state has only one information
// that, in this moment is cart's reducer
const store = createStore(rootReducer, enhancer);

export default store;
