import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "tupchat-1c2aa.firebaseapp.com",
  projectId: "tupchat-1c2aa",
  storageBucket: "tupchat-1c2aa.appspot.com",
  messagingSenderId: process.env.REACT_APP_MSG_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
