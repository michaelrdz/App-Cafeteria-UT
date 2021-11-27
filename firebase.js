// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlw9-tuyVi40RBkB28MBK_BH-NFW6Zlo8",

  authDomain: "lunchapp-20467.firebaseapp.com",

  databaseURL: "https://lunchapp-20467-default-rtdb.firebaseio.com",

  projectId: "lunchapp-20467",

  storageBucket: "lunchapp-20467.appspot.com",

  messagingSenderId: "329259133643",

  appId: "1:329259133643:web:7dbaebb10763974318c94e"

};


// Initialize Firebase
/*let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}*/

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
//const storage = firebase.storage();
const database = firebase.database();

export { auth, database, firebase };
