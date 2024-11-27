import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";

// Leer los archivos JSON
const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1bx54Gp11aR6amEbzEHfyoM_nYP6TFD0",
  authDomain: "qr-project-d4948.firebaseapp.com",
  projectId: "qr-project-d4948",
  storageBucket: "qr-project-d4948.appspot.com",
  messagingSenderId: "895962410294",
  appId: "1:895962410294:web:d94da616d93975fddc1797",
  measurementId: "G-E530824EQV",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loadUsers = async () => {
  for (const user of users) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: user.name,
      });

      await addDoc(collection(db, "users"), {
        id: newUser.uid,
        name: user.name,
        email: user.email,
        number: user.number,
        role: user.role,
      });

      console.log(`Usuario ${user.name} agregado correctamente.`);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  }
};

const loadProducts = async () => {
  for (const product of products) {
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        description: product.description,
        price: product.price,
        type: product.type,
        image: product.image,
      });

      console.log(`Producto ${product.name} agregado correctamente.`);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }
};

const loadData = async () => {
  console.log("Cargando usuarios...");
  await loadUsers();
  console.log("Cargando productos...");
  await loadProducts();
  console.log("Carga completada.");
};

loadData();
