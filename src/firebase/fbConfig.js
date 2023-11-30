import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import router from "@/router/index.js";

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
const storage = firebase.storage();

const fb = {
  fireStore,
  auth,
  storage,
};

export const customFirebaseOperation = async (collection, operation, data) => {
  try {
    const collectionRef = fb.fireStore.collection(collection);

    if (operation === "add") {
      await collectionRef.add(data);
    }
    if (operation === "get") {
      return await collectionRef.where("id", "==", data.id).get();
    }
    if (operation === "update" || operation === "delete") {
      const querySnapshot = await collectionRef
        .where("id", "==", data.id)
        .get();
      const doc = querySnapshot.docs[0];

      if (operation === "update") {
        await doc.ref.update(data);
      }
      if (operation === "delete") {
        await doc.ref.delete();
      }
    }
  } catch (error) {
    router.push({ name: "errorPage" });
    throw error;
  }
};

export default fb;
