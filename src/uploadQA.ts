// src/uploadQA.ts (CommonJS-style)
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { qaData } = require("./data/qa"); // adjust the path

const firebaseConfig = {
    apiKey: "AIzaSyBgQba0e13-S8q4ejI2QAK0erTAQOmSk8g",
    authDomain: "quran-6f6bf.firebaseapp.com",
    projectId: "quran-6f6bf",
    storageBucket: "quran-6f6bf.firebasestorage.app",
    messagingSenderId: "453656470624",
    appId: "1:453656470624:web:28fa14adcc31a9d6808f05",
    measurementId: "G-Z9HN6ST991"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadQA() {
  const colRef = collection(db, "qa");

  for (const item of qaData) {
    try {
      const docRef = await addDoc(colRef, item);
      console.log(`Uploaded: ${item.id} → Firestore ID: ${docRef.id}`);
    } catch (err) {
      console.error("Upload error:", err);
    }
  }
}

uploadQA();
