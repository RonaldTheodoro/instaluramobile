import React, { Component } from 'react';
import { StyleSheet, FlatList, Platform, AsyncStorage } from 'react-native';
import Post from './Post'
import InstaluraFetchService from '../services/InstaluraFetchService'
import Notificacao from '../api/Notificacao'


export default class Feed extends Component {
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    InstaluraFetchService.get('/fotos')
      .then(json => this.setState({ fotos: json }))
  }

  verPerfilUsuario = (idFoto) => {
    const foto = this.buscaPorId(idFoto)

    this.props.navigator.push({
      screen: 'PerfilUsuario',
      title: foto.loginUsuario,
      backButtonTitle: ''
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

  like = (idFoto) => {
    const listaOriginal = this.state.fotos
    const foto = this.buscaPorId(idFoto)

    AsyncStorage.getItem('login').then(login => {
      let novaLista = []
      if (!foto.likeada)
        novaLista = [...foto.likers, { login }]
      else
        novaLista = foto.likers.filter(liker => liker.login !== login)
      return novaLista
    }).then(likers => this.setState({
      fotos: this.atualizaFotos({ ...foto, likeada: !foto.likeada, likers })
    }))

    InstaluraFetchService.post(`/fotos/${idFoto}/like`)
      .catch(error => {
        this.setState({ fotos: listaOriginal })
        Notificacao.exibe('Ops..', 'Algo deu errado ao curtir')
      })
  }

  adicionaComentario = (idFoto, valorComentario) => {
    const listaOriginal = this.state.fotos
    if (valorComentario === '')
      return
    const url = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`
    const foto = this.buscaPorId(idFoto)
    const comentario = { texto: valorComentario }

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => this.setState({
        fotos: this.atualizaFotos({ ...foto, comentarios: novaLista })
      })).catch(error => {
        this.setState({ fotos: listaOriginal })
        Notificacao.exibe('Ops..', 'Algo deu errado ao comentar')
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
            comentarioCallBack={this.adicionaComentario}
            verPerfilCallBack={this.verPerfilUsuario} />} />
    );
  }
}
