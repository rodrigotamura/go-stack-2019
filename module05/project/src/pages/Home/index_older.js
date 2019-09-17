import React, { Component } from 'react';
import { connect } from 'react-redux'; // connecting this component with states of REdux
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

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

  handleAddProduct = id => {
    // every componentn which we connect with Redux, that we use Connect
    // receives a property called dispatch (this.props.dispatch), which fires an action into Redux

    /* OLD MANNER BEFORE SESPARATE ACTIONS IN ANOTHER FILE
       AND USING ACTIONS AS PROPS
    const { dispatch } = this.props;

    // and we implement our action:
    dispatch({
      // every action has a type
      type: 'ADD_TO_CART',

      // and content
      product,
    });
    dispatch(addToCart(product));
    */

    const { addToCartRequest } = this.props;

    addToCartRequest(id);

  }

  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <ProductList>
        { products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" /> {amount[product.id] || 0}
              </div>

              <span>Add to cart</span>
            </button>
          </li>
        )) }
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
