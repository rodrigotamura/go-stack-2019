export function addToCartRequest(id) {
  return {
    // every action has a type
    type: '@cart/ADD_REQUEST',

    // and content
    id,
  }
};

export function addToCartSuccess(product) {
  return {
    // every action has a type
    type: '@cart/ADD_SUCCESS',

    // and content
    product,
  }
};

export function removeFromCart(id){
  return {
    type: '@cart/REMOVE',
    id
  }
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount
  }
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount
  }
}
