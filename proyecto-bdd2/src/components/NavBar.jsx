import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase"; // Importa la configuración de Firebase
import { getUserById } from "../controllers/auth"; // Importa la función para obtener el usuario desde Firestore
import kfcLogo from "/KFC_header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = auth.currentUser; // Obtener el usuario autenticado
        if (user) {
          const userData = await getUserById(user.uid); // Obtiene los datos del usuario desde Firestore
          setUserRole(userData.userRole); // Almacena el rol del usuario
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={kfcLogo} alt="KFC Logo" className="w-24" />
        </Link>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="hover:underline">
          Inicio
        </Link>
        <Link to="/productos" className="hover:underline">
          Productos
        </Link>

        {/* DashBoard visible solo si el rol es 2 */}
        {userRole === "2" && (
          <Link to="/dashboard" className="hover:underline">
            DashBoard
          </Link>
        )}
      </div>

      {/* Íconos */}
      <div className="flex items-center space-x-6">
        {/* Carrito */}
        <Link to="/carrito" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
        </Link>

        {/* Perfil */}
        <Link to="/perfil" className="flex items-center hover:underline">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;