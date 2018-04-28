import { AsyncStorage } from 'react-native'


export default class InstaluraFetchService {
  static get(recurso) {
    const url = 'https://instalura-api.herokuapp.com/api' + recurso
    return AsyncStorage.getItem('token')
      .then(token => {
        return { headers: new Headers({ "X-AUTH-TOKEN": token }) }
      })
      .then(requestInfo => fetch(url, requestInfo))
      .then(response => response.json())
  }

  static post(recurso, dados) {
    const url = 'https://instalura-api.herokuapp.com/api' + recurso

    return AsyncStorage.getItem('token').then(token => {
      return {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: new Headers({
          'Content-type': 'application/json',
          'X-AUTH-TOKEN': token
        })
      }
    }).then(requestInfo => fetch(url, requestInfo))
      .then(response => {
        if(response.ok)
          response.json()
        throw new Error('Não foi possivel completar a operação')  
      })
  }
}