import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAk4Jr39Czc2QPLyiEefRT2uqBR1xarT1U",
  authDomain: "event-manager-1329.firebaseapp.com",
  projectId: "event-manager-1329",
  storageBucket: "event-manager-1329.appspot.com",
  messagingSenderId: "655611200880",
  appId: "1:655611200880:web:523d104f27c74b4932fbb5",
  measurementId: "G-DWB6BH4SCK",
};

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const auth = firebase.auth();

const fb = {
  fireStore,
  auth,
};

export default fb;



