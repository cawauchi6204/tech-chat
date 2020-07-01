import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import config from './../firebaseConfig.json'

if (!firebase.apps.length) {
  firebase.initializeApp({ ...config })
}

export default ({ app }, inject) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
  inject('fireAuth', firebase.auth())
  inject('fireStorage', firebase.storage())
}

// injectを利用すると関数を共通化することができる
// 関数はthis.$hogeで呼び出すことができる
