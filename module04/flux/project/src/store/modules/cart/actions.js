export function addToCart(product) {
  return {
    // every action has a type
    type: '@cart/ADD',

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

export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount
  }
}
