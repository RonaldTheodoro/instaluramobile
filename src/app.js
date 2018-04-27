import { Navigation } from 'react-native-navigation';

import Feed from './components/Feed'
import Login from './screens/Login'

export default () => {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'Login',
      title: 'login'
    }
  })
}