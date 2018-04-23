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

const screen = Dimensions.get('screen')

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }

  carregaIcone(likeada) {
    if (likeada)
      return require('../../resources/img/s2-checked.png')
    return require('../../resources/img/s2.png')
  }

  like = () => {
    const { foto } = this.state

    let novaLista = []
    if (!foto.likeada)
      novaLista = [...foto.likers, { login: 'meuUsuario' }]
    else
      novaLista = foto.likers.filter(liker => liker.login !== 'meuUsuario')

    const fotAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    this.setState({ foto: fotAtualizada })
  }

  adicionaComentario = () => {
    if (this.state.valorComentario === '')
      return false

    const novaLista = [...this.state.foto.comentarios, {
      id: Math.random(),
      login: 'meuUsuario',
      texto: this.state.valorComentario
    }]
    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }
    this.setState({ foto: fotoAtualizada, valorComentario: '' })
    this.inputComentario.clear()
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

  exibeLegenda(foto) {
    if (foto.comentario === '')
      return

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>{foto.loginUsuario}</Text>
        <Text>{foto.comentario}</Text>
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
          <TouchableOpacity onPress={this.like}>
            <Image style={styles.botaoDeLike} source={this.carregaIcone(foto.likeada)} />
          </TouchableOpacity>
        </View>
        {this.exibeLikes(foto.likers)}
        {this.exibeLegenda(foto)}
        {foto.comentarios.map(comentario =>
          <Text key={comentario.id}>
            <Text style={styles.tituloComentario}>{comentario.login}: </Text>
            <Text>{comentario.texto}</Text>
          </Text>
        )}
        <View style={styles.novoComentario}>
          <TextInput
            style={styles.input}
            placeholder="Adicione um comentario..."
            underlineColorAndroid="transparent"
            ref={input => this.inputComentario = input}
            onChangeText={texto => this.setState({ valorComentario: texto })} />

          <TouchableOpacity onPress={this.adicionaComentario}>
            <Image style={styles.botaoDeComentario} source={require('../../resources/img/send.png')} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  botaoDeLike: {
    height: 40,
    width: 40,
    marginBottom: 10
  },
  likes: {
    fontWeight: 'bold'
  },
  comentarios: {
    flexDirection: 'row',
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    height: 40,
    flex: 1
  },
  botaoDeComentario: {
    height: 30,
    width: 30
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
