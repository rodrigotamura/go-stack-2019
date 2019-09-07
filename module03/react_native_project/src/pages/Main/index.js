import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Main() {
  return (
    <Container>
      <Text>Rodrigo</Text>
    </Container>
  );
}

// Using createStackNavigator we can set the header of the current page
Main.navigationOptions = {
  title: 'Users',
}
