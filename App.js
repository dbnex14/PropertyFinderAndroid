/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'; // enable strict mode to add improved editor handling

import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class SearchPage extends Component<{}> {
  static navigationOptions = { title: 'Property Finder'};

  render() {
    return <Text style={styles.description}>Search for houses to buy!</Text>;
  }
}

const App = StackNavigator({
  Home: { screen: SearchPage },
});

export default App;

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  }
});
