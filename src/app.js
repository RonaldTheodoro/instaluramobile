import { AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation';

import Feed from './components/Feed'
import Login from './screens/Login'

export default () => {
  Navigation.registerComponent('Login', () => Login)
  Navigation.registerComponent('Feed', () => Feed)
  Navigation.registerComponent('PerfilUsuario', () => Feed)

  const feed = { screen: 'Feed', title: 'Instalura' }
  const login = { screen: 'Login', title: 'login' }

  AsyncStorage.getItem('token')
    .then(token => (token) ? feed : login)
    .then(screen => Navigation.startSingleScreenApp({ screen }))
}