// applyMiddleware will implements middlewares
// 'compose' will join many configurations
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

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
import rootSaga from './modules/rootSaga';

const SagaMiddleware = createSagaMiddleware();

/**
 * Integrating REactotron into with Redux
 *
 * Joining ReduxSaga:
 * We are using COMPOSE in order to merge two configurations: Reactotron and Saga in developer mode
 * But in production mode we are calling only Redux Saga
 */
const enhancer =
  process.env.NODE_ENV === "development"
   ? compose(
      console.tron.createEnhancer(),
      applyMiddleware(SagaMiddleware)
    )
   : applyMiddleware(SagaMiddleware);


// when we pass only one reducer basically our state has only one information
// that, in this moment is cart's reducer
const store = createStore(rootReducer, enhancer);
// executing ReduxSaga
SagaMiddleware.run(rootSaga);

export default store;
