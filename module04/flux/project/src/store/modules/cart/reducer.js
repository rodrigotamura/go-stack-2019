export default function cart(state = [], action) {
  console.log(state);

  switch(action.type){
    case 'ADD_TO_CART':
      /// ...state will take every products which has in cart currently
      // and add action.product as new product
      return [ ...state, action.product ];
    break;
    default: // returning previous state with any changes
      return state;
  }
}
