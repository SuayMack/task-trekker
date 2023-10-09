// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todolist-79110.firebaseapp.com",
  projectId: "todolist-79110",
  storageBucket: "todolist-79110.appspot.com",
  messagingSenderId: "289040853106",
  appId: "1:289040853106:web:3a855485aab86a4887baeb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);