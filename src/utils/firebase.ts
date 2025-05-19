import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBgQba0e13-S8q4ejI2QAK0erTAQOmSk8g",
    authDomain: "quran-6f6bf.firebaseapp.com",
    projectId: "quran-6f6bf",
    storageBucket: "quran-6f6bf.firebasestorage.app",
    messagingSenderId: "453656470624",
    appId: "1:453656470624:web:28fa14adcc31a9d6808f05",
    measurementId: "G-Z9HN6ST991"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth,db };
