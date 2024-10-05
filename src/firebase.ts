// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app"
import { Auth, getAuth } from 'firebase/auth'
import { Firestore, getFirestore } from "firebase/firestore"
import { IFirebaseConfig } from './interfaces/interfaces'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: IFirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER || '',
  appId: process.env.REACT_APP_APP_ID || '',
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);