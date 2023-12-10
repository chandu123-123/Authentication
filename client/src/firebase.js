// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-6aace.firebaseapp.com",
  projectId: "mern-6aace",
  storageBucket: "mern-6aace.appspot.com",
  messagingSenderId: "228099035650",
  appId: "1:228099035650:web:eb914f84e21b5b5f2d8d1b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);