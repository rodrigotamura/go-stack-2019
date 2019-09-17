import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdDelete,
  MdRemoveCircleOutline,
  MdAddCircleOutline,
} from 'react-icons/md';
import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

import { formatPrice } from '../../utils/format';

export default function Cart() {
  // React Hooks - Redux
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (totalSum, product) => totalSum + product.price * product.amount,
        0
      )
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product, // putting all current fields
      subtotal: formatPrice(product.price * product.amount), // adding new field of suntotal
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUCT</th>
            <th>AMT</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>

        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                {/* See that we can use dispatch with inline code instead a separated method */}
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <MdDelete size={15} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finish order</button>

        <Total>
          <span>GENERAL TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
