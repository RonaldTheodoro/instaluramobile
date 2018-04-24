import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'

const screen = Dimensions.get('screen')

export default class Post extends Component {

  exibeLegenda(foto) {
    if (foto.comentario === '')
      return

    const comentario = { login: foto.loginUsuario, texto: foto.comentario }
    return this.mostrarComentario(comentario)
  }

  mostrarComentario = (comentario) => {
    return (
      <View style={styles.comentario} key={comentario.id}>
        <Text style={styles.tituloComentario}>{comentario.login}: </Text>
        <Text>{comentario.texto}</Text>
      </View>
    )
  }

  render() {
    const { foto, likeCallBack, comentarioCallBack } = this.props
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image
            source={{ uri: foto.urlPerfil }}
            style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />
        <View style={styles.rodape}>
          <Likes foto={foto} likeCallBack={likeCallBack} />
          {this.exibeLegenda(foto)}
          {foto.comentarios.map(
            comentario => this.mostrarComentario(comentario)
          )}
          <InputComentario
            idFoto={foto.id}
            comentarioCallBack={comentarioCallBack} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  foto: {
    width: screen.width,
    height: screen.width
  },
  rodape: {
    margin: 10,
  },
  botaoDeLike: {
    height: 40,
    width: 40,
    marginBottom: 10
  },
  comentario: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  }
});
