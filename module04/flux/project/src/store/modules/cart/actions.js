export function addToCart(product) {
  return {
    // every action has a type
    type: '@cart/ADD_TO_CART',

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
