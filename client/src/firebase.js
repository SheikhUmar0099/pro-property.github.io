// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pro-property-43510.firebaseapp.com",
  projectId: "pro-property-43510",
  storageBucket: "pro-property-43510.appspot.com",
  messagingSenderId: "418432095078",
  appId: "1:418432095078:web:2302b2f0e6f0183459eea7",
  measurementId: "G-S5HVXFS8PL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);