import React, { Component } from 'react';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

export default class Repo extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func
    }).isRequired,
  }

  render() {
    const { navigation } = this.props;
    const repo = navigation.getParam('repo');

    return (<WebView
              source={{ uri: repo.html_url }}
              style={{ flex:1 }}
              startInLoadingState
              renderLoading={() => <ActivityIndicator size="large" />} />
      );
  }
}
