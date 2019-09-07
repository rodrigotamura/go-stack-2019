import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio,
        Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles.js';

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
    stars: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  render() {
    const { stars, loading } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={ { uri: user.avatar } } />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        { loading ? (<ActivityIndicator color="#7159c1" />)
        :
        (
          <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          // onEndReached={this.handleLoadMore} // loads when end reach
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )} />
        )}

      </Container>
    );
  }
}


// we can implement also WebView, when user click on some repo will open a integrated browser.
