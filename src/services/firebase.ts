// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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