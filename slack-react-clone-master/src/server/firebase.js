import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAMtA4koNbFjnms_81pREH2hg47sIipWk8",
  authDomain: "slack-clone-9c92d.firebaseapp.com",
  projectId: "slack-clone-9c92d",
  storageBucket: "slack-clone-9c92d.appspot.com",
  messagingSenderId: "591492341252",
  appId: "1:591492341252:web:e5fd5907c95243540f5f51",
  measurementId: "G-CRPD725SXZ",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
