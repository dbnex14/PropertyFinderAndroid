'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    encoding: 'json',
    pretty: '1',
    page: pageNumber,
    action: 'search_listings',
    country: 'de',
    listing_type: 'buy',
  };

  data[key] = value;
  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.de/api?' + querystring;
}

export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    title: 'Immobilien Marktführer',
  };

  constructor(props){
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
    };
  }

  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    // console.log('Current: ' + this.state.searchString + ', Next: ' + event.nativeEvent.text);
  };

  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });

    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Etwas schlimmes passiert!  ' + error
        }));
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
      //console.log('Properties found: ' + response.listings.length);
      this.props.navigation.navigate('Results', {listings: response.listings});
    } else {
      this.setState({ message: 'Ort nicht erkennbar, versuchen Sie bitte noch einmal.' });
    }
  };

  _onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  };

  render() {
    const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
    // console.log('SearchPage.render');

    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>
          Wohnungssuche leicht gemacht!
        </Text> */}

        <Text style={styles.description}>
          Wo suchen Sie?  Ort oder PLZ.
        </Text>

        <View style={styles.flowRight}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Suche nach Ort oder PLZ'
          />

          <Button
            onPress={this._onSearchPressed}
            color='#27ae60'
            title='Suchen'
          />
        </View>

        <Image source={require('./Resources/house-icon.png')} style={styles.image} />

        {spinner}

        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  title: {
    marginTop: 40,
    marginBottom: 18,
    fontSize: 18,
    textAlign: 'center',
    color: '#6f6766'
  },
  description: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#6f6766'
  },
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#fef5e7',
    flex: 1,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#27ae60',
    borderRadius: 4,
    color: '#27ae60',
  },
  image: {
    width: 217,
    height: 220,
    marginBottom: 20,
  },
});
