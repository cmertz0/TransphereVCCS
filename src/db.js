import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from './firebase';

const db = getFirestore();

export async function saveUserList(list) {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, 'userLists', user.uid);
  await setDoc(ref, { list });
}

export async function loadUserList() {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = doc(db, 'userLists', user.uid);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return snapshot.data().list || [];
  } else {
    return [];
  }
}
