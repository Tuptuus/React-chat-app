import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "tupchat-1c2aa.firebaseapp.com",
  projectId: "tupchat-1c2aa",
  storageBucket: "tupchat-1c2aa.appspot.com",
  messagingSenderId: "963635092082",
  appId: "1:963635092082:web:cc0ed25acea2e2cacc00eb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
