import firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDhoC6fIwWM_gHE7Z5zHn8cADTyCo62XzQ",
  authDomain: "blockchain-news-cf255.firebaseapp.com",
  databaseURL: "https://blockchain-news-cf255.firebaseio.com",
  projectId: "blockchain-news-cf255",
  storageBucket: "blockchain-news-cf255.appspot.com",
  messagingSenderId: "154674766076",
  appId: "1:154674766076:web:783a77f9c265e59a3fb779"
};
firebase.initializeApp(firebaseConfig);
export const databaseRef = firebase.database().ref("checkout");
