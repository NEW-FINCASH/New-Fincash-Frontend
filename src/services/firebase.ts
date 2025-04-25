// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgwnrhbN0O0B1BV1Hg-2wx6CX1ee4uatY",
  authDomain: "new-fincash.firebaseapp.com",
  projectId: "new-fincash",
  storageBucket: "new-fincash.firebasestorage.app",
  messagingSenderId: "678176215429",
  appId: "1:678176215429:web:9d571bb2218fac2f5434ec",
  measurementId: "G-B3J8B3ZWMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'pt-BR';