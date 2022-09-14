// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2qr-DQUWzlsWi3yU9W14yAbF3tCyzKSk",
  authDomain: "easy-shop-login-signup.firebaseapp.com",
  projectId: "easy-shop-login-signup",
  storageBucket: "easy-shop-login-signup.appspot.com",
  messagingSenderId: "179881349236",
  appId: "1:179881349236:web:6dccf11c6069b143af4121"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;