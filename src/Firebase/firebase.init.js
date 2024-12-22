// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyAKUusUjNWmUgakl677Z6W4oR37jhhfk-c",
  // authDomain: "ridesphere-303e8.firebaseapp.com",
  // projectId: "ridesphere-303e8",
  // storageBucket: "ridesphere-303e8.firebasestorage.app",
  // messagingSenderId: "111386569262",
  // appId: "1:111386569262:web:9bce32cb8f6082deebcdbf"
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);