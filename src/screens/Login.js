import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  Image,
  AsyncStorage
} from 'react-native'


export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      senha: '',
      validacao: ''
    }
  }

  efetuaLogin = () => {
    const url = 'http://192.168.0.137:8080/api/public/login'
    const { login, senha } = this.state
    const body = JSON.stringify({ login, senha })
    const headers = new Headers({ 'Content-Type': 'application/json' })

    fetch(url, { method: 'POST', body, headers }).then(response => {
      if (!response.ok)
        throw new Error('Não foi possivel efetuar login')
      return response.text()
    }).then(token => {
      AsyncStorage.setItem(
        'usuario',
        JSON.stringify({ login: this.state.login, token })
      )
      AsyncStorage.getItem('usuario')
        .then(usuario => JSON.parse(usuario))
        .then(usuario => console.warn(usuario.login))
    }).catch(error => this.setState({ validacao: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../resources/img/s2.png')} />
        <Text style={styles.titulo}>Instalura</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Usuario..."
            onChangeText={login => this.setState({ login })}
            underlineColorAndroid="transparent"
            autoCapitalize="none" />
          <TextInput
            style={styles.input}
            placeholder="Senha..."
            onChangeText={senha => this.setState({ senha })}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            secureTextEntry={true} />
          <Button title="Login" onPress={this.efetuaLogin} />
        </View>
        <Text style={styles.validacao}>
          {this.state.validacao}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26
  },
  form: {
    width: Dimensions.get('screen').width * 0.8
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
  validacao: {
    color: 'red'
  }
})