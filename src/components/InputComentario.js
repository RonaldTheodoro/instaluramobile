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

  salvaComentario = () => {
    const { idFoto, comentarioCallBack } = this.props

    comentarioCallBack(idFoto, this.state.valorComentario)
    this.setState({ valorComentario: '' })
    this.inputComentario.clear()
  }

  setInputComentario(input) {
    this.inputComentario = input
  }

  setValorComentario(texto) {
    this.setState({ valorComentario: texto })
  }

  render() {
    return (
      <View style={styles.novoComentario}>
        <TextInput
          style={styles.input}
          placeholder="Adicione um comentario..."
          ref={input => this.setInputComentario(input)}
          onChangeText={texto => this.setValorComentario(texto)}
          underlineColorAndroid="transparent" />

        <TouchableOpacity onPress={this.salvaComentario}>
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
