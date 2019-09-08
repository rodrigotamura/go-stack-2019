import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default class Home extends Component {
  render() {
    return (
      <ProductList>
        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>

        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>

        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>

        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>

        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>

        <li>
          <img src="https://static.netshoes.com.br/produtos/tenis-mizuno-ez-flex-n-masculino/06/D16-3549-006/D16-3549-006_detalhe2.jpg?ims=326x" alt="Shoes" />
          <strong>Nice shoes!</strong>
          <span>R$129,90</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>Add to cart</span>
          </button>
        </li>
      </ProductList>
    );
  }
}
