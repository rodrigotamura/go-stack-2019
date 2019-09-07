import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';

// export default function User(props) {
export default class User extends Component {
  // here we also have props.navigation and a set of methods
  // but now we need to use props.navigation.getParam()
  // in order to get the given parameters
  // in this case, our user infos

  // or we can catch by props.navigation.state.user

  /*
  Let's set the title of this page with the name of user.
  However we can not do as follow:

  static navigationOptions = {
    title: this.props.navigation.getParam('user')
  };

  Because we can not use this.

  So we need convert into arrow function...
  */
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    }).isRequired,
  }

  state = {
    stars: []
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;

    return (
      <View />
    );
  }
}
