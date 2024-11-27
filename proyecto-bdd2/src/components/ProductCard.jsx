import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { auth } from "../firebase"; // Configuración de Firebase
import { logAction } from "../controllers/auth"; // Función para guardar el log
import { toast } from "react-toastify"; // Importar toast
import "react-toastify/dist/ReactToastify.css"; // Importar estilos de toast

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Inicializa el hook para redirección

  const handleAdd = async (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto del enlace

    try {
      const user = auth.currentUser; // Obtener usuario autenticado
      if (!user) {
        toast.error("Debes iniciar sesión para agregar productos.");
        return;
      }

      // Guardar log en Firestore
      await logAction(user.uid, product.id);

      // Mostrar notificación de éxito
      toast.success("Producto agregado exitosamente.");

      // Redirigir manualmente después de registrar el log
      navigate(`/productos/${product.id}`);
    } catch (error) {
      toast.error("Ocurrió un error al agregar el producto.");
      console.error("Error al registrar acción:", error);
    }
  };

  return (
    <div className="product-card flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="flex items-center mt-2">
          {/* El evento onClick registra la acción y luego redirige */}
          <button
            onClick={handleAdd} // Maneja el registro del log y redirección
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="text-lg font-semibold text-right">
        {product.price.toFixed(2)}$
      </div>
    </div>
  );
};

export default ProductCard;
