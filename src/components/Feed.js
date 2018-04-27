import React, { Component } from 'react';
import { StyleSheet, FlatList, Platform, AsyncStorage } from 'react-native';
import Post from './Post'


export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    const url = 'https://instalura-api.herokuapp.com/api/fotos'
    AsyncStorage.getItem('token')
      .then(token => {
        return { headers: new Headers({ "X-AUTH-TOKEN": token }) }
      })
      .then(requestInfo => fetch(url, requestInfo))
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))

  }

  buscaPorId = (idFoto) => {
    return this.state.fotos.find(foto => foto.id === idFoto)
  }

  atualizaFotos(fotoAtualizada) {
    return this.state.fotos.map(
      foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    )
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto)

    AsyncStorage.getItem('login').then(login => {
      let novaLista = []
      if (!foto.likeada)
        novaLista = [...foto.likers, { login }]
      else
        novaLista = foto.likers.filter(liker => liker.login !== login)

      return novaLista
    }).then(novaLista => {
      const fotos = this.atualizaFotos({
        ...foto,
        likeada: !foto.likeada,
        likers: novaLista
      })
      this.setState({ fotos })
    })
    const url = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`

    AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: 'POST',
          headers: new Headers({ 'X-AUTH-TOKEN': token })
        }
      }).then(requestInfo => fetch(url, requestInfo))

  }

  adicionaComentario = (idFoto, valorComentario) => {
    if (valorComentario === '')
      return

    const foto = this.buscaPorId(idFoto)
    const url = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`

    AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: 'POST',
          body: JSON.stringify({ texto: valorComentario }),
          headers: new Headers({
            'Content-type': 'application/json',
            'X-AUTH-TOKEN': token
          })
        }
      }).then(requestInfo => fetch(url, requestInfo))
      .then(response => response.json())
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        this.setState({
          fotos: this.atualizaFotos({ ...foto, comentarios: novaLista })
        })
      })
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
