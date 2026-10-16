// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp0UQ1ugEW3f2iXkD7nkjd7fNBZd8oYDo",
  authDomain: "d-shop-bfe9c.firebaseapp.com",
  projectId: "d-shop-bfe9c",
  storageBucket: "d-shop-bfe9c.firebasestorage.app",
  messagingSenderId: "147182583890",
  appId: "1:147182583890:web:928e31e7b3cb68887cdf8b",
  measurementId: "G-1ZGY025LPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth & Firestore for the app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);