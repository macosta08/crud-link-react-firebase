import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCioWnguMilbkQTQgQZSAT1xpf4M6EWEn0",
  authDomain: "crud-react-firebase-840f8.firebaseapp.com",
  projectId: "crud-react-firebase-840f8",
  storageBucket: "crud-react-firebase-840f8.appspot.com",
  messagingSenderId: "477238512636",
  appId: "1:477238512636:web:f267ff2607f72bb2d54079",
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
//para crear conexiones
export const db = fb.firestore();
