import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Asegúrate de exportar correctamente `auth` desde tu configuración
import { getUserById, updateUserData, logOut } from "../controllers/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userData = await getUserById(currentUser.uid);
          setUser(userData);
          setName(userData.name || "");
          setEmail(userData.email || "");
        }
      } catch (err) {
        setError("Error al cargar los datos del perfil");
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUserData(user.id, name, email);
        alert("Perfil actualizado con éxito.");
      }
    } catch (err) {
      setError("Error al actualizar el perfil.");
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      setError("Error al cerrar sesión.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-red-600">Perfil</h2>
        {error && (
          <p className="text-sm text-center text-red-500 mt-2">{error}</p>
        )}
        <form className="mt-4" onSubmit={handleUpdate}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Guardar Cambios
          </button>
        </form>
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
