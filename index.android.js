/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Platform } from 'react-native';
import Post from './src/components/Post'

export default class InstaluraMobile extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }
  componentDidMount() {
    //const url = 'http://instalura-api.herokuapp.com/api/public/fotos/rafael'
    const url = 'http://192.168.0.137:8080/api/public/fotos/rafael'
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))
  }
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Post foto={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
});

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
