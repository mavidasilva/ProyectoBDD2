import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase.js";

// **Registrar usuario con correo y contraseña**
export async function registerWithCredentials(name, email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Crear los datos básicos del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      name: name,
      email: email,
      userRole: "1", // Rol por defecto, se puede cambiar en el futuro si se necesita
    });

    return user;
  } catch (error) {
    console.error("Error en registro:", error);
    return null;
  }
}

// **Iniciar sesión con correo y contraseña**
export async function loginWithCredentials(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user; // Devuelve la información básica del usuario autenticado
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return null;
  }
}

// **Cerrar sesión**
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

// **Obtener datos del usuario por ID**
export async function getUserById(id) {
  try {
    // Referencia al documento del usuario
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);

    // Verifica si el documento existe
    if (userSnapshot.exists()) {
      return userSnapshot.data(); // Devuelve los datos del usuario
    } else {
      console.warn(`No se encontró un usuario con el id: ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw new Error("No se pudo obtener el usuario. Intenta nuevamente."); // Devuelve un error manejable
  }
}

// **Obtener datos del usuario por correo**
export async function getUserByEmail(email) {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data(); // Devuelve el primer usuario encontrado
    } else {
      console.error("No se encontró un usuario con ese correo.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario por correo:", error);
    return null;
  }
}

export async function updateUserData(id, name, email) {
  const userRef = doc(db, "users", id);
  await setDoc(userRef, { name, email }, { merge: true });
}

export async function logAction(userId, productId) {
  try {
    const actionRef = collection(db, "actions"); // Cambia "actions" al nombre de tu colección deseada
    await addDoc(actionRef, {
      userId: userId,
      productId: productId,
      timestamp: Timestamp.now(), // Fecha y hora actuales
    });
    console.log("Acción registrada con éxito");
  } catch (error) {
    console.error("Error al registrar la acción:", error);
  }
}

export const saveCartAction = async (productId, quantity, userId) => {
  try {
    const cartActionsRef = collection(db, "cartActions"); // Cambia "cartActions" al nombre deseado para la colección
    await addDoc(cartActionsRef, {
      productId,
      quantityAdded: quantity,
      userId,
      timestamp: Timestamp.now(), // Fecha y hora actuales
    });
    console.log("Acción del carrito registrada con éxito.");
  } catch (error) {
    console.error("Error al guardar la acción del carrito:", error);
  }
};
