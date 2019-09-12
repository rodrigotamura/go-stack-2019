import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdDelete, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart ({ cart, dispatch }) {
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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
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
                  dispatch({ type: 'REMOVE_FROM_CART', id: product.id })
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

export default connect(mapStateToProps)(Cart);
