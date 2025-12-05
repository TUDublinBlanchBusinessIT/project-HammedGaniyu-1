
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBAV0ZixrUBFGvqOzIrmTrFCrJTsH-kTjk",
  authDomain: "liftlog-dd0d7.firebaseapp.com",
  projectId: "liftlog-dd0d7",
  storageBucket: "liftlog-dd0d7.firebasestorage.app",
  messagingSenderId: "1036967072404",
  appId: "1:1036967072404:web:b351c3e26ac6633da71a81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
