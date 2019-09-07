import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
// using Material Icons, but you can choose another

import { Container,  SubmitButton, Input, Form } from './styles';


export default class Main extends Component {

  state = {
    newUser: '', // it will store what the user is typing in field
    users: [],
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

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
  }

  render() {
    const { users, newUser } = this.state;

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
        />
        <SubmitButton onPress={this.handleAddUser}>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
  }

}

// Using createStackNavigator we can set the header of the current page
Main.navigationOptions = {
  title: 'Users',
}
