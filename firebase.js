import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLPQtq39tEcha66rw_ovWa5-I3Nl1qyos",
  authDomain: "ghostlet-98357.firebaseapp.com",
  projectId: "ghostlet-98357",
  storageBucket: "ghostlet-98357.firebasestorage.app",
  messagingSenderId: "843012219969",
  appId: "1:843012219969:web:9e3037578726debf2212c0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, serverTimestamp };
