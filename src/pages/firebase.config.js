
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "{process.env.REACT_APP_GEOCODE_API_KEY}",
  authDomain: "vehicle-marketplace-app.firebaseapp.com",
  projectId: "vehicle-marketplace-app",
  storageBucket: "vehicle-marketplace-app.appspot.com",
  messagingSenderId: "91882981696",
  appId: "1:91882981696:web:520c71bd4efb1f88ca12a5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();