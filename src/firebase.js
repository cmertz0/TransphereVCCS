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

const firebaseConfig = {
  apiKey: "AIzaSyAF_31zqsCw3NPKRpd3IZ0lcMmjlEGzwjQ",
  authDomain: "transphere-vccs.firebaseapp.com",
  projectId: "transphere-vccs",
  storageBucket: "transphere-vccs.appspot.com",
  messagingSenderId: "398517899011",
  appId: "1:398517899011:web:08cc35102dd91ea37d6336",
  measurementId: "G-W49WN456H6"
};

const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => signInWithPopup(auth, provider);
const logOut = () => signOut(auth);

// firestore
const db = getFirestore(app);

// user college List
const saveUserList = async (userId, list) => {
  await setDoc(doc(db, "userLists", userId), { list });
};

const loadUserList = async (userId) => {
  const docSnap = await getDoc(doc(db, "userLists", userId));
  return docSnap.exists() ? docSnap.data().list : [];
};

// stats from user (new)
const saveUserStats = async (userId, stats) => {
  await setDoc(doc(db, "userStats", userId), { stats });
};

const loadUserStats = async (userId) => {
  const docSnap = await getDoc(doc(db, "userStats", userId));
  return docSnap.exists() ? docSnap.data().stats : null;
};

export {
  auth,
  provider,
  signIn,
  logOut,
  db,
  saveUserList,
  loadUserList,
  saveUserStats,
  loadUserStats
};
