import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg'

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocket Shoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>My cart</strong>
          <span>3 items</span>
        </div>
      </Cart>
      <MdShoppingBasket size={36} color="#FFF" />
    </Container>
  );
}
