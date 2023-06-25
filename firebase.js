// Import des dépendances nécessaires
import {initializeApp} from "firebase/app";
import {getAuth, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCHoyuILCwD2Wuve1sNkkZBBH32q7K_ffg",
    authDomain: "locjeux-c4f09.firebaseapp.com",
    databaseURL: "https://locjeux-c4f09-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "locjeux-c4f09",
    storageBucket: "locjeux-c4f09.appspot.com",
    messagingSenderId: "798843106420",
    appId: "1:798843106420:web:9f305876b64696794d4d21"
};

// Initialisation de l'application Firebase avec la configuration
const app = initializeApp(firebaseConfig);

// Récupération de l'objet d'authentification Firebase
const auth = getAuth(app);

// Récupération de l'objet Firestore
const firestore = getFirestore(app);

// Export des objets d'authentification et de Firestore
export {
    auth,
    createUserWithEmailAndPassword,
    signInAnonymously,
    signInWithEmailAndPassword,
    firestore
};
