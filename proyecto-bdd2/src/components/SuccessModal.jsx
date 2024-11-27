import { useNavigate } from "react-router-dom";

const SuccessModal = ({
  show,
  onClose,
  productName,
  quantity,
  setQuantity,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setQuantity(0); // Resetea el QuantitySelector a 0
    onClose(); // Cierra el modal
    navigate("/productos");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-lg font-bold mb-4">Producto Agregado con Éxito</h2>
        <p>
          <strong>{quantity}</strong>{" "}
          <strong>{productName}</strong> fueron agregadas/os con éxito al carrito.
        </p>
        <button
          onClick={handleClose}
          className="w-full mt-4 bg-red-600 text-white p-2 rounded"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
