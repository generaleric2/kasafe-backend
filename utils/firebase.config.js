// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxEmalj4miqsiyF1X4-SFUpE_mfJ8GE8Y",
  authDomain: "kasafe-ad311.firebaseapp.com",
  projectId: "kasafe-ad311",
  storageBucket: "kasafe-ad311.appspot.com",
  messagingSenderId: "394109992370",
  appId: "1:394109992370:web:a819bd8f07f87f5693f8ab",
  measurementId: "G-1RQ18ST3LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);