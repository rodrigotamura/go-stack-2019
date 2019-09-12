import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import { MdDelete, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart ({ cart, removeFromCart, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
      <Container>
        <ProductTable>
        <thead>
          <tr>
            <th></th>
            <th>PRODUCT</th>
            <th>AMT</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>

        <tbody>
          { cart.map(product => (
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
                <strong>R$258,80</strong>
              </td>
              <td>
                { /* See that we can use dispatch with inline code instead a separated method */ }
                <button type="button" onClick={() =>
                  removeFromCart(product.id)
                }>
                  <MdDelete size={15} color="#7159c1" />
                </button>
              </td>
            </tr>
          )) }
        </tbody>
        </ProductTable>

        <footer>
          <button type="button">Finish order</button>

          <Total>
            <span>GENERAL TOTAL</span>
            <strong>R$1920,28</strong>
          </Total>
        </footer>
      </Container>
    );
}

// mapping states and converting them into properties (props) of Component
/**
 * It is same thing of:
  export default connect(state => ({
    cart: state.cart,
  }))(Cart);
 */
const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
