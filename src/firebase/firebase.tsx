import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyARRCGI9yeEhvP7DKAGFgIwqU0NzRKxuwk",
  authDomain: "kin-vote-app.firebaseapp.com",
  databaseURL: "https://kin-vote-app.firebaseio.com",
  projectId: "kin-vote-app",
  storageBucket: "kin-vote-app.appspot.com",
  messagingSenderId: "711684161842",
  appId: "1:711684161842:web:37db6d36cea75322ca972b",
  measurementId: "G-1PGJG4CVKY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const incrementIt = firebase.firestore.FieldValue.increment(1);
