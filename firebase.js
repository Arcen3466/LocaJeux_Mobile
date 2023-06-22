import { initializeApp } from "firebase/app";
import { getAuth,signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCHoyuILCwD2Wuve1sNkkZBBH32q7K_ffg",
  authDomain: "locjeux-c4f09.firebaseapp.com",
  databaseURL: "https://locjeux-c4f09-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "locjeux-c4f09",
  storageBucket: "locjeux-c4f09.appspot.com",
  messagingSenderId: "798843106420",
  appId: "1:798843106420:web:9f305876b64696794d4d21"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, createUserWithEmailAndPassword,signInAnonymously, signInWithEmailAndPassword,firestore };
