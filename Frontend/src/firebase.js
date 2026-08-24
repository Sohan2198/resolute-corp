import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvN-q_RzizPAGhmMLqAhh9ogjj3nxujbg",
  authDomain: "resolutecorp-web.firebaseapp.com",
  projectId: "resolutecorp-web",
  storageBucket: "resolutecorp-web.firebasestorage.app",
  messagingSenderId: "645878397637",
  appId: "1:645878397637:web:de2faeaee9987fd24a0eac"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
