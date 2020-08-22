import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAgao4DL0hMm8paWoXI8LYgJmSVP979qf4",
  authDomain: "instagram-clone-react-daefc.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-daefc.firebaseio.com",
  projectId: "instagram-clone-react-daefc",
  storageBucket: "instagram-clone-react-daefc.appspot.com",
  messagingSenderId: "986893155632",
  appId: "1:986893155632:web:9b426958271e8c27c8dcf5",
  measurementId: "G-GBY7DCZFK9",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export  { db, auth, storage };
