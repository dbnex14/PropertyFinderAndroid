'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    //const price = item.price_formatted.split(' ')[0];
    const price = item.price_formatted;

    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.img_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.title}
                numberOfLines={1}>{item.title}
              </Text>
              <View style={styles.imageContainer}>
                <Text style={styles.title}>{item.size}</Text>
                <Text style={styles.title}>{item.size_unit}</Text>
                {/* <Image style={styles.smallImage} source={require('./Resources/house.png')} />
                <Image style={styles.smallImage} source={require('./Resources/house.png')} />
                <Image style={styles.smallImage} source={require('./Resources/house.png')} />
                <Image style={styles.smallImage} source={require('./Resources/house.png')} />
                <Image style={styles.smallImage} source={require('./Resources/house.png')} /> */}
              </View>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Results',
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (index) => {
    console.log("Pressed row: " + index);
  };

  // _renderItem = ({item, index}) => (
  //   return (
  //     <TouchableHighlight
  //       underlayColor='#dddddd'>
  //       <View>
  //         <Text>{item.title}</Text>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList style={styles.flatList}
        data={params.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fef5e7'
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48bbec'
  },
  title: {
    fontSize: 16,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  imageContainer: {
    flexDirection: 'row',
    padding: 5
  },
  smallImage: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});
