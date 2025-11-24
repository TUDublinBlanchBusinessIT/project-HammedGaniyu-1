// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR KEY HERE",
  authDomain: "YOUR KEY HERE",
  projectId: "YOUR KEY HERE",
  storageBucket: "YOUR KEY HERE",
  messagingSenderId: "YOUR KEY HERE",
  appId: "YOUR KEY HERE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
