import produce from 'immer';

export default function cart(state = [], action) {
  console.log(state);

  switch(action.type){
    case 'ADD_TO_CART':
      return produce(state, draft => {
        // every changes within this draft will reflext into state

        // in this case draft is the product (content of dispatch)

        // verifying if user is adding a product which was already added before
        // remembering that findIndex returns the index of found item
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if(productIndex >= 0){
          // incrementing amount
          draft[productIndex].amount += 1;
        }else{
          // adding new with 1 amount
          draft.push({
            ...action.product, // we are using spread op. because we need to add amount
            amount: 1,         // if amount did not exist a simple draft.push(action.product)
          });
        }
      })

    /* OLD MANNER BEFORE IMMER
      /// ...state will take every products which has in cart currently
      // and add action.product as new product
      return [ ...state,
        {
          ...action.product,
          amount: 1
        },
      ];
    */
    break;
    default: // returning previous state with any changes
      return state;
  }
}
