import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'


export default class InputComentario extends Component {
  constructor() {
    super()
    this.state = {
      valorComentario: ''
    }
  }

  render() {
    const { comentarioCallBack } = this.props
    return (
      <View style={styles.novoComentario}>
        <TextInput
          style={styles.input}
          placeholder="Adicione um comentario..."
          ref={input => this.inputComentario = input}
          onChangeText={texto => this.setState({ valorComentario: texto })}
          underlineColorAndroid="transparent" />

        <TouchableOpacity onPress={() => {
          comentarioCallBack(this.state.valorComentario)
          this.inputComentario.clear()
        }}>
          <Image
            style={styles.botaoDeComentario}
            source={require('../../resources/img/send.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  input: {
    height: 40,
    flex: 1
  },
  botaoDeComentario: {
    height: 30,
    width: 30
  },
});
