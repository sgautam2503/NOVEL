import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDRfJaxtZVMZdpCvqg_BME9R4s0nDy17TA",
    authDomain: "novel-c5f09.firebaseapp.com",
    projectId: "novel-c5f09",
    storageBucket: "novel-c5f09.appspot.com",
    messagingSenderId: "1000375923769",
    appId: "1:1000375923769:web:aac825c01f7e80bd9509e8"
  }).auth();