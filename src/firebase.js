// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "imagegeneration-f340e.firebaseapp.com",
  projectId: "imagegeneration-f340e",
  storageBucket: "imagegeneration-f340e.appspot.com",
  messagingSenderId: "1063253436442",
  appId: "1:1063253436442:web:f0169ece5421309ca9c9a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);