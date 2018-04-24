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
  constructor(props) {
    super(props)
    this.state = {
      foto: this.props.foto
    }
  }

  like = () => {
    const { foto } = this.state

    let novaLista = []
    if (!foto.likeada)
      novaLista = [...foto.likers, { login: 'ronaldtheodoro' }]
    else
      novaLista = foto.likers.filter(liker => liker.login !== 'ronaldtheodoro')

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    this.setState({ foto: fotoAtualizada })
  }

  adicionaComentario = (valorComentario) => {
    if (valorComentario === '')
      return

    const novaLista = [...this.state.foto.comentarios, {
      id: Math.random(),
      login: 'ronaldtheodoro',
      texto: valorComentario
    }]

    const fotoAtualizada = { ...this.state.foto, comentarios: novaLista }
    this.setState({ foto: fotoAtualizada })
  }

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
    const { foto } = this.state
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{ uri: foto.urlPerfil }} style={styles.fotoDePerfil} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.foto} />
        <View style={styles.rodape}>
          <Likes foto={foto} likeCallBack={this.like} />
          {this.exibeLegenda(foto)}
          {foto.comentarios.map(
            comentario => this.mostrarComentario(comentario)
          )}
          <InputComentario comentarioCallBack={this.adicionaComentario} />
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
