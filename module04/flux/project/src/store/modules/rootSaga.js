import { all } from 'redux-saga/effects'; // 'all' joins many sagas

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([
    // we include all sagas here
    cart
  ])
}
