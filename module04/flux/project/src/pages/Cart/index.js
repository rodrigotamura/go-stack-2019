import React, { Component } from 'react';
import { MdDelete, MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

export default class Cart extends Component {
  render() {
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
          <tr>
            <td>
              <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
            </td>
            <td>
              <strong>Nice shoes</strong>
              <span>R$129,90</span>
            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>
                <input type="number" readOnly value={2} />
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$258,80</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={15} color="#7159c1" />
              </button>
            </td>
          </tr>
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
}
