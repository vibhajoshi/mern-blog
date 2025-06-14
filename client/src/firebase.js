// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-d5e8a.firebaseapp.com",
  projectId: "mern-blog-d5e8a",
  storageBucket: "mern-blog-d5e8a.firebasestorage.app",
  messagingSenderId: "46594327911",
  appId: "1:46594327911:web:4c99ce819645df6a9d1bc2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);