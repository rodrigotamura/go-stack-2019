import React from 'react';

// using Material Icons, but you can choose another
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from 'react-native';
import { Container,  SubmitButton, Input, Form } from './styles';


export default function Main() {
  return (
    <Container>
      <Form>
        {/* autoCorrect={false} -> Setting to not fix words automatically */}
        {/* autoCapitalize  ="none" -> Setting to not capitalize automatically */}
        <Input
          autocCorrect={false}
          autoCapitalize="none"
          placeholder="Add user"
        />
        <SubmitButton>
          <Icon name="add" size={20} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

// Using createStackNavigator we can set the header of the current page
Main.navigationOptions = {
  title: 'Users',
}
