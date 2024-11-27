import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1bx54Gp11aR6amEbzEHfyoM_nYP6TFD0",
  authDomain: "qr-project-d4948.firebaseapp.com",
  projectId: "qr-project-d4948",
  storageBucket: "qr-project-d4948.appspot.com",
  messagingSenderId: "895962410294",
  appId: "1:895962410294:web:d94da616d93975fddc1797",
  measurementId: "G-E530824EQV",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app);
