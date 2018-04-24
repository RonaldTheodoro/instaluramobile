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

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto)

    let novaLista = []
    if (!foto.likeada)
      novaLista = [...foto.likers, { login: 'ronaldthe' }]
    else
      novaLista = foto.likers.filter(liker => liker.login !== 'ronaldthe')

    const fotos = this.atualizaFotos({
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    })
    this.setState({ fotos })
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if (valorComentario === '')
      return

    const foto = this.buscaPorId(idFoto)

    const novaLista = [
      ...foto.comentarios,
      { id: Math.random(), login: 'ronaldthe', texto: valorComentario }
    ]

    this.setState({
      fotos: this.atualizaFotos({ ...foto, comentarios: novaLista })
    })
  }

  buscaPorId = (idFoto) => {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    return this.state.fotos.map(
      foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.fotos}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <Post
            foto={item}
            likeCallBack={this.like}
            comentarioCallBack={this.adicionaComentario} />} />
    );
  }
}

AppRegistry.registerComponent('InstaluraMobile', () => InstaluraMobile);
