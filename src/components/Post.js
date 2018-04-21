import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

const screen = Dimensions.get('screen')

export default class Post extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: this.props.foto.urlFoto }} />
          <Text>{this.props.foto.loginUsuario}</Text>
        </View>
        <Image
          style={styles.photo}
          source={{ uri: this.props.foto.urlFoto }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePhoto: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  photo: {
    width: screen.width,
    height: screen.width
  },
});
