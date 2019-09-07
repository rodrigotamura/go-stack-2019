import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text } from 'react-native';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio,
        Stars, Starred, OwnerAvatar, Info, Title,
        Author, ContainerLoading, NoResults, NoResultsText,
        NoResultsIcon } from './styles.js';

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
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  }

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page }
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  }

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load);
  };


  handleLoadMore = async () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  handleOpenRepo = (repo) => {
    const { navigation } = this.props;

    // 1st parameter is the Page component
    // 2nd parameter we send data
    navigation.navigate('Repo', { repo });
  }

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={ { uri: user.avatar } } />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        { loading && (<ContainerLoading><ActivityIndicator color="#7159c1" size="large" /></ContainerLoading>) }
        { (!loading && stars && stars.length === 0) && (<NoResults><NoResultsText><NoResultsIcon name="sleep" color="#999" size={36} /> <Text>No starred repos</Text></NoResultsText></NoResults>) }
        <Stars
        data={stars}
        onRefresh={this.refreshList}
        refreshing={refreshing} // pull down the list in order to refresh it
        keyExtractor={star => String(star.id)}
        onEndReached={this.handleLoadMore} // loads when end reach
        onEndReachedThreshould={0.2} // loads when end reach
        renderItem={({item}) => (
          <Starred>
            { item.owner.avatar_url && (<OwnerAvatar source={{ uri: item.owner.avatar_url }} />) }
            <Info>
              <Title onPress={() => this.handleOpenRepo(item)}>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )} />

      </Container>
    );
  }
}


// we can implement also WebView, when user click on some repo will open a integrated browser.
