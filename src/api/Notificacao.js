import { Platform, ToastAndroid, AlertIOS } from 'react-native'

export default class Notificacao {
  static exibe(titulo, mensagem) {
    if (Platform.OS === 'android')
      ToastAndroid.show(mensagem, ToastAndroid.SHORT)
    else if (Platform.OS === 'android')
      AlertIOS.alert(titulo, mensagem)
  }
}