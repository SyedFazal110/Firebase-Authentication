import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIZQMQluclCEq0i9dCDqveq3cE3148uUI",
  authDomain: "fir-authentication-4f5cf.firebaseapp.com",
  projectId: "fir-authentication-4f5cf",
  storageBucket: "fir-authentication-4f5cf.appspot.com",
  messagingSenderId: "716853495891",
  appId: "1:716853495891:web:f806b0bece12d6c8b11ea6",
  measurementId: "G-K3DD1LPBGM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
