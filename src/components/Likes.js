import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


export default class Likes extends Component {

  carregaIcone(likeada) {
    if (likeada)
      return require('../../resources/img/s2-checked.png')
    return require('../../resources/img/s2.png')
  }

  exibeLikes(likers) {
    if (likers.length === 0)
      return

    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    )
  }

  render() {
    const { foto, likeCallBack } = this.props
    return (
      <View>
        <TouchableOpacity onPress={() => likeCallBack(foto.id)}>
          <Image
            style={styles.botaoDeLike}
            source={this.carregaIcone(foto.likeada)} />
        </TouchableOpacity>
        {this.exibeLikes(foto.likers)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  botaoDeLike: {
    height: 40,
    width: 40
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 10
  },
});
