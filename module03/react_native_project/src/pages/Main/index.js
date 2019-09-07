import React, { Component } from 'react';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';
import api from '../../services/api';

// using Material Icons, but you can choose another

import { Container,
          SubmitButton,
          Input,
          Form,
          List,
          User,
          Avatar,
          Name,
          Bio,
          ProfileButton,
          ProfileButtonText } from './styles';


export default class Main extends Component {
  // Using createStackNavigator we can set the header of the current page
  static navigationOptions = {
    title: 'Users',
  }

  // PropTypes
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired,
  }


  state = {
    newUser: '', // it will store what the user is typing in field
    users: [],
    loading: false,
    error: '',
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    // wether has users
    if(users) {
      this.setState( { users: JSON.parse(users) } );
    }

  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if(prevState.users !== this.state.users){
      await AsyncStorage.setItem('users', JSON.stringify(users));
      // async/await is not necessary here because we will not have
      // anything else to run after this.
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true, error: '' });

    if(newUser !== ''){
      try {
        const response = await api.get(`/users/${newUser}`);

        const data = {
          name: response.data.name,
          login: response.data.login,
          bio: response.data.bio,
          avatar: response.data.avatar_url,
        };
        this.setState({
          users: [...users, data],
          newUser: '',
        });

        // hidening keyboard
        Keyboard.dismiss();
      }catch(err){
        this.showAlert("Error", "Sorry, but this username doesn't exist.");
        this.setState({ newUser: '' });
      }
    }else{
      this.showAlert("Notification", "Please fill the field with any GitHub's username");
    }

    // Hidden loading
    this.setState({ loading: false });
  }

  showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [{
        text: 'OK',
      }]
    );
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;

    // 1st parameter is the Page component
    // 2nd parameter we send data
    navigation.navigate('User', { user });
  }

  render() {
    const { users, newUser, loading } = this.state;

    return (
    <Container>
      <Form>
        {/* autoCorrect={false} -> Setting to not fix words automatically */}
        {/* autoCapitalize  ="none" -> Setting to not capitalize automatically */}
        {/* onChangeText -> It is like onChange from ReactJS */}
        {/* onPress -> It is like onClick from ReactJS */}
        {/* returnKeyType="send" -> <enter> key with special highlight */}
        {/* onSubmitEditing={this.handleAddUser} -> when press <enter> on keyboard will send */}
        <Input
          autocCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
          onChangeText={text => this.setState({ newUser: text })}
          returnKeyType="send"
          onSubmitEditing={this.handleAddUser}
          value={newUser}
        />
        <SubmitButton loading={loading} onPress={this.handleAddUser}>
          { loading ? (<ActivityIndicator color="#FFF" />)
          :
          (<Icon name="add" size={20} color="#FFF" />) }

        </SubmitButton>
      </Form>

      {/*
        Usage of FlatList component:
         - data={array}: Array of content
         - keyExtractor: similar to key from ReactJS, we need set the unique ID from each item from Array.
         - renderItem: it wll render our list and we are desustructuring and get 'item', that is the element of Array
      */}
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={( {item} ) => (
          <User>
            {/* source -> like src from <img>, and we need to pass an object */}
            <Avatar source={ { uri: item.avatar } } />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => this.handleNavigate(item)}>
              <ProfileButtonText>View profile</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
         />
    </Container>
  );
  }

}
