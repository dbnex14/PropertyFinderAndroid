/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'; // enable strict mode to add improved editor handling

import { StackNavigator } from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';

const App = StackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});

export default App;
