import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default function Main() {
  return (
    <View />
  );
}

// Using createStackNavigator we can set the header of the current page
Main.navigationOptions = {
  title: 'Users',
}
