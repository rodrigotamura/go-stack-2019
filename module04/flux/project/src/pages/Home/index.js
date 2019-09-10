import React, { Component } from 'react';
import { connect } from 'react-redux'; // connecting this component with states of REdux

import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))

    this.setState({products: data});
  }

  handleAddProduct = product => {
    // every componentn which we connect with Redux, that we use Connect
    // receives a property called dispatch (this.props.dispatch), which fires an action into Redux

    const { dispatch } = this.props;

    // and we implement our action:
    dispatch({
      // every action has a type
      type: 'ADD_TO_CART',

      // and content
      product,
    })

  }

  render() {
    const { products } = this.state;
    return (
      <ProductList>
        { products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProduct(product)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" /> 3
              </div>

              <span>Add to cart</span>
            </button>
          </li>
        )) }
      </ProductList>
    );
  }
}

export default connect()(Home);
