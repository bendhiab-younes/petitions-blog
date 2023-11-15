
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {GoogleAuthProvider, getAuth }  from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtNdSe4v2kmmb1SftHcRIwP1lsXG_SyP0",
  authDomain: "blog-app-da140.firebaseapp.com",
  projectId: "blog-app-da140",
  storageBucket: "blog-app-da140.appspot.com",
  messagingSenderId: "553208172280",
  appId: "1:553208172280:web:53013833bdc284443ef50d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();