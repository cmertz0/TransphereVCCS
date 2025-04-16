import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAF_31zqsCw3NPKRpd3IZ0lcMmjlEGzwjQ",
  authDomain: "transphere-vccs.firebaseapp.com",
  projectId: "transphere-vccs",
  storageBucket: "transphere-vccs.appspot.com",
  messagingSenderId: "398517899011",
  appId: "1:398517899011:web:08cc35102dd91ea37d6336",
  measurementId: "G-W49WN456H6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

// ✅ Firestore
const db = getFirestore(app);

const saveUserList = async (userId, list) => {
  await setDoc(doc(db, "userLists", userId), { list });
};

const loadUserList = async (userId) => {
  const docSnap = await getDoc(doc(db, "userLists", userId));
  return docSnap.exists() ? docSnap.data().list : [];
};

export {
  auth,
  provider,
  signIn,
  logOut,
  db,
  saveUserList,
  loadUserList
};
