//src\main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './satoshi.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfr6Nh6JKXcybcO4CShXHa-JC3UGEHBx4",
  authDomain: "curso-react-94755.firebaseapp.com",
  projectId: "curso-react-94755",
  storageBucket: "curso-react-94755.appspot.com",
  messagingSenderId: "1017871412117",
  appId: "1:1017871412117:web:1bf9fcc1da2c90cb71249c",
  measurementId: "G-T1QZNDRMMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
