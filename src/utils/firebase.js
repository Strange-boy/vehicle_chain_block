// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_AUTH_DOMAIN ,
//   projectId: process.env.NEXT_PROJECT_ID,
//   storageBucket: process.env.NEXT_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_APP_ID,
//   measurementId: process.env.NEXT_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyABdnDjCMHe3PDW9cwGM_cyOePc8a9wouc",
  authDomain: "vehiclechain-204dc.firebaseapp.com",
  projectId: "vehiclechain-204dc",
  storageBucket: "vehiclechain-204dc.appspot.com",
  messagingSenderId: "754606541388",
  appId: "1:754606541388:web:15f9b5524962a46e2602e9",
  measurementId: "G-B92N0R5LN6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const appAuth = getAuth(app);

export const db = getFirestore(app);
