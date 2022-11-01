import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC_XJhdgUHHLI928Gg7KYS-K3NiHFRNEY0",
    authDomain: "fir-lola.firebaseapp.com",
    projectId: "fir-lola",
    storageBucket: "fir-lola.appspot.com",
    messagingSenderId: "1034430473406",
    appId: "1:1034430473406:web:e16aa9b00fbdcb2d61eaef"
  };

  app.initializeApp(firebaseConfig)

 
  export const auth = firebase.auth(); /*metodo para registrar y loguear al usuario, si lo quiero usar lo importo y pongo la ruta de este archivo*/
  export const storage = app.storage();
  export const db = app.firestore()