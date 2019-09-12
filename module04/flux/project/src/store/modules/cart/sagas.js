import { call, select, put, all, takeLatest } from 'redux-saga/effects';
/**
 * select => responsible to reach some information in state
 */
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';
import { formatPrice } from '../../../utils/format';
// Let's make a generator function (*), it is like:
// async function, but generator is powerful than async/await
// In truth we are receiving an action: function* addToCart(action)
function* addToCart({ id }) {
  // yied is like await

  // verifying if product already is in cart
  const productExists = yield select(
    state => state.cart.find(p => p.id === id)
  );

  if(productExists){
    // only change amount
    const amount = productExists.amount + 1;

    yield put(updateAmount(id, amount));
  }else{
    // we cannot simply make
    // const response = yield api.get(...), we need to import
    // call method from redux-saga. And this call is responsible to
    // request methods which are assyncronous and returns promises within JS
    const response = yield call(api.get, `/products/${id}`);


    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    };

    // we need now create @cart/ADD_REQUEST and @cart/ADD_SUCCESS in actions.js
    // but why do we changed the actions names? Because now, when user add something in cart.
    // it will call @cart/ADD_REQUEST from SAGA, not @cart/ADD from REDUCER, because REDUX is a middleware
    // and before reach REUCER, SAGA will be reached firstly.

    // When @cart/ADD_REQUEST from SAGA finished, it will call @cart/ADD_SUCCESS, and finally
    // this last action will call reducer in order to complete the process adding the product in cart.

    // So we need to change @cart/ADD in cart reducer.js to @cart/ADD_SUCCESS

    // Now we will fire an action by `put` method from redux-saga
    yield put(addToCartSuccess(data));
  }



  // We need now implement this script at the button of add from home page
  // with 'all' method from redux-saga
}

export default all([
  // subscribing listeners

  // takeLatest(): this listener will consider only the latest trigger during API requesting (yield)
  // for ex.: when use hit the button many times, Redux Saga will only consider
  // the latest hit, discarding another pressings

  // takeEvery(): if User press 3 times (or more) on the button to add to cart,
  // all this 3 pressings will be considered and will be added to cart.
  takeLatest(
    '@cart/ADD_REQUEST', // which action we want to listen to
    addToCart // which function we want to fire when @cart/ADD_REQUEST is called
  )
])
